import telebot
import json
import os
import time
from datetime import datetime
from telebot import types
import threading
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

BOT_TOKEN = "" #сюда вставить id человека ответственного за заказы
ADMIN_CHAT_ID = "" #сюда API токен полученный в @BotFather в тг
ORDERS_FILE = 'orders.json'


def create_session():
    session = requests.Session()
    retry_strategy = Retry(
        total=5,
        backoff_factor=1,
        status_forcelist=[429, 500, 502, 503, 504],
        allowed_methods=["GET", "POST"]
    )
    adapter = HTTPAdapter(max_retries=retry_strategy)
    session.mount("https://", adapter)
    session.mount("http://", adapter)
    return session

telebot.apihelper.SESSION = create_session()


def clear_previous_connections():
    try:
        url = f"https://api.telegram.org/bot{BOT_TOKEN}/deleteWebhook?drop_pending_updates=true"
        session = create_session()
        response = session.get(url, timeout=10)
        if response.json().get('ok'):
            print("✅ Предыдущие подключения очищены")
            return True
        else:
            print("⚠️ Не удалось очистить подключения")
            return False
    except Exception as e:
        print(f"❌ Ошибка очистки: {e}")
        return False


clear_previous_connections()
time.sleep(2)

bot = telebot.TeleBot(
    BOT_TOKEN,
    threaded=False,
    skip_pending=True
)


class PizzaBot:
    def __init__(self, bot, admin_chat_id):
        self.bot = bot
        self.admin_chat_id = admin_chat_id
        self.last_order_count = 0
        self.is_running = False

    def send_admin_message(self, text, parse_mode='HTML', reply_markup=None):
        max_retries = 3
        for attempt in range(max_retries):
            try:
                self.bot.send_message(
                    chat_id=self.admin_chat_id,
                    text=text,
                    parse_mode=parse_mode,
                    reply_markup=reply_markup,
                    timeout=30
                )
                print(f"✅ Сообщение отправлено администратору")
                return True
            except Exception as e:
                print(f"⚠️ Попытка {attempt + 1}/{max_retries}: {e}")
                if attempt < max_retries - 1:
                    time.sleep(3)
                else:
                    print(f"❌ Не удалось отправить сообщение: {e}")
                    return False

    def load_orders(self):
        try:
            if os.path.exists(ORDERS_FILE):
                with open(ORDERS_FILE, 'r', encoding='utf-8') as f:
                    content = f.read().strip()
                    if content:
                        return json.loads(content)
            return []
        except Exception as e:
            print(f"❌ Ошибка загрузки заказов: {e}")
            return []

    def format_order_message(self, order):
        items_text = ""
        for item in order['items']:
            items_text += f"\n📦 <b>{item['name']}</b> x{item['quantity']} - {item['price'] * item['quantity']} ₽"

            if 'customizations' in item and item['customizations']:
                items_text += f"\n   {item['customizations']}"

        payment_methods = {
            'cash': '💰 Наличные',
            'card': '💳 Картой курьеру',
            'online': '🌐 Онлайн'
        }

        status_emojis = {
            'new': '🆕',
            'accepted': '✅',
            'cooking': '👨‍🍳',
            'delivering': '🛵',
            'delivered': '🎉',
            'cancelled': '❌'
        }

        status = order.get('status', 'new')
        status_emoji = status_emojis.get(status, '❓')

        source = order.get('source', 'website')
        source_text = {
            'website': '🌐 Сайт',
            'telegram': '📱 Telegram',
            'vk': '💬 ВКонтакте'
        }.get(source, '🌐 Сайт')

        message = f"""
{status_emoji} <b>НОВЫЙ ЗАКАЗ #{order['id']}</b>
Источник: {source_text}

━━━━━━━━━━━━━━━━━━━━

👤 <b>Клиент:</b> {order['customer']['name']}
📞 <b>Телефон:</b> {order['customer']['phone']}
📍 <b>Адрес:</b> {order['customer']['address']}
💬 <b>Комментарий:</b> {order['customer'].get('comment', 'Нет')}

━━━━━━━━━━━━━━━━━━━━

📋 <b>СОСТАВ ЗАКАЗА:</b>
{items_text}

━━━━━━━━━━━━━━━━━━━━

💰 <b>Сумма:</b> {order['total']} ₽
💳 <b>Оплата:</b> {payment_methods.get(order['payment'], 'Не указано')}
📊 <b>Статус:</b> {status}

🕐 <b>Создан:</b> {order.get('created_at', datetime.now().strftime('%d.%m.%Y %H:%M:%S'))}
"""
        return message

    def create_order_keyboard(self, order_id):
        keyboard = types.InlineKeyboardMarkup(row_width=2)

        buttons = [
            types.InlineKeyboardButton("✅ Принять", callback_data=f"accept_{order_id}"),
            types.InlineKeyboardButton("👨‍🍳 Готовить", callback_data=f"cook_{order_id}"),
            types.InlineKeyboardButton("🛵 Доставляется", callback_data=f"deliver_{order_id}"),
            types.InlineKeyboardButton("🎉 Доставлен", callback_data=f"delivered_{order_id}"),
            types.InlineKeyboardButton("❌ Отменить", callback_data=f"cancel_{order_id}"),
            types.InlineKeyboardButton("📞 Позвонить", callback_data=f"call_{order_id}")
        ]

        keyboard.add(*buttons)
        return keyboard

    def check_new_orders(self):
        while self.is_running:
            try:
                orders = self.load_orders()
                current_count = len(orders)

                if current_count > self.last_order_count:
                    new_orders = orders[self.last_order_count:]

                    for order in new_orders:
                        message = self.format_order_message(order)
                        keyboard = self.create_order_keyboard(order['id'])
                        self.send_admin_message(message, reply_markup=keyboard)

                        if order['total'] > 1000:
                            self.send_admin_message(
                                f"🎉 <b>КРУПНЫЙ ЗАКАЗ!</b>\n"
                                f"Сумма: {order['total']} ₽\n"
                                f"Клиент: {order['customer']['name']}\n"
                                f"Телефон: {order['customer']['phone']}"
                            )

                    self.last_order_count = current_count

                time.sleep(5)

            except Exception as e:
                print(f"❌ Ошибка проверки заказов: {e}")
                time.sleep(10)


@bot.message_handler(commands=['start'])
def send_welcome(message):
    if str(message.chat.id) == ADMIN_CHAT_ID:
        welcome_text = """
🍕 <b>Пиццерия Сичных - Бот управления заказами</b>

📍 г. Таганрог, ул. Москатова, 10/1
📞 +7 (989) 548-35-77

Я буду присылать уведомления о новых заказах.

<b>Доступные команды:</b>
/start - Главное меню
/orders - Все заказы
/active - Активные заказы
/stats - Статистика
/help - Помощь
        """

        keyboard = types.ReplyKeyboardMarkup(resize_keyboard=True, row_width=2)
        buttons = [
            types.KeyboardButton("📋 Все заказы"),
            types.KeyboardButton("🔄 Активные заказы"),
            types.KeyboardButton("📊 Статистика"),
            types.KeyboardButton("❓ Помощь")
        ]
        keyboard.add(*buttons)

        bot.send_message(message.chat.id, welcome_text, parse_mode='HTML', reply_markup=keyboard, timeout=30)
    else:
        bot.send_message(message.chat.id, "⛔ У вас нет доступа к этому боту.", timeout=30)


@bot.message_handler(commands=['orders'])
@bot.message_handler(func=lambda message: message.text == "📋 Все заказы")
def show_all_orders(message):
    if str(message.chat.id) != ADMIN_CHAT_ID:
        return

    pizza_bot = PizzaBot(bot, ADMIN_CHAT_ID)
    orders = pizza_bot.load_orders()

    if not orders:
        bot.send_message(message.chat.id, "📋 Заказов пока нет", timeout=30)
        return

    bot.send_message(message.chat.id, f"📋 <b>Все заказы ({len(orders)})</b>:", parse_mode='HTML', timeout=30)

    for order in orders[-10:]:
        order_text = pizza_bot.format_order_message(order)
        keyboard = pizza_bot.create_order_keyboard(order['id'])
        pizza_bot.send_admin_message(order_text, reply_markup=keyboard)


@bot.message_handler(commands=['active'])
@bot.message_handler(func=lambda message: message.text == "🔄 Активные заказы")
def show_active_orders(message):
    if str(message.chat.id) != ADMIN_CHAT_ID:
        return

    pizza_bot = PizzaBot(bot, ADMIN_CHAT_ID)
    orders = pizza_bot.load_orders()

    active_orders = [o for o in orders if o.get('status') not in ['delivered', 'cancelled']]

    if not active_orders:
        bot.send_message(message.chat.id, "🔄 Активных заказов нет", timeout=30)
        return

    bot.send_message(message.chat.id, f"🔄 <b>Активные заказы ({len(active_orders)})</b>:", parse_mode='HTML',
                     timeout=30)

    for order in active_orders:
        order_text = pizza_bot.format_order_message(order)
        keyboard = pizza_bot.create_order_keyboard(order['id'])
        pizza_bot.send_admin_message(order_text, reply_markup=keyboard)


@bot.message_handler(commands=['stats'])
@bot.message_handler(func=lambda message: message.text == "📊 Статистика")
def show_stats(message):
    if str(message.chat.id) != ADMIN_CHAT_ID:
        return

    pizza_bot = PizzaBot(bot, ADMIN_CHAT_ID)
    orders = pizza_bot.load_orders()

    if not orders:
        bot.send_message(message.chat.id, "📊 Статистика пока недоступна", timeout=30)
        return

    total_orders = len(orders)
    total_revenue = sum(order['total'] for order in orders)
    active_orders = len([o for o in orders if o.get('status') not in ['delivered', 'cancelled']])
    delivered_orders = len([o for o in orders if o.get('status') == 'delivered'])

    sources = {}
    for order in orders:
        source = order.get('source', 'website')
        sources[source] = sources.get(source, 0) + 1

    sources_text = "\n".join([f"• {s}: {c}" for s, c in sources.items()])

    stats_text = f"""
📊 <b>СТАТИСТИКА ПИЦЦЕРИИ СИЧНЫХ</b>

<b>Общая:</b>
• Всего заказов: {total_orders}
• Общая выручка: {total_revenue} ₽
• Доставлено: {delivered_orders}
• Активных: {active_orders}
• Средний чек: {total_revenue // total_orders if total_orders > 0 else 0} ₽

<b>По источникам:</b>
{sources_text}

📍 г. Таганрог, ул. Москатова, 10/1
📞 +7 (989) 548-35-77
    """

    bot.send_message(message.chat.id, stats_text, parse_mode='HTML', timeout=30)


@bot.message_handler(commands=['help'])
@bot.message_handler(func=lambda message: message.text == "❓ Помощь")
def send_help(message):
    if str(message.chat.id) != ADMIN_CHAT_ID:
        return

    help_text = """
🍕 <b>Помощь по боту Пиццерии Сичных</b>

<b>Команды:</b>
/start - Главное меню
/orders - Все заказы
/active - Активные заказы
/stats - Статистика

<b>Управление:</b>
Используйте кнопки под заказом для изменения статуса.

<b>Статусы заказов:</b>
🆕 Новый
✅ Принят
👨‍🍳 Готовится
🛵 Доставляется
🎉 Доставлен
❌ Отменен

<b>Контакты:</b>
📞 +7 (989) 548-35-77
📍 г. Таганрог, ул. Москатова, 10/1
    """

    bot.send_message(message.chat.id, help_text, parse_mode='HTML', timeout=30)


@bot.callback_query_handler(func=lambda call: True)
def handle_callback(call):
    if str(call.message.chat.id) != ADMIN_CHAT_ID:
        bot.answer_callback_query(call.id, "⛔ Доступ запрещен")
        return

    pizza_bot = PizzaBot(bot, ADMIN_CHAT_ID)

    try:
        action, order_id = call.data.split('_')
        order_id = int(order_id)
    except:
        bot.answer_callback_query(call.id, "❌ Ошибка")
        return

    status_map = {
        'accept': ('accepted', '✅ Принят'),
        'cook': ('cooking', '👨‍🍳 Готовится'),
        'deliver': ('delivering', '🛵 Доставляется'),
        'delivered': ('delivered', '🎉 Доставлен'),
        'cancel': ('cancelled', '❌ Отменен')
    }

    if action in status_map:
        new_status, status_message = status_map[action]

        orders = pizza_bot.load_orders()
        order = next((o for o in orders if o['id'] == order_id), None)

        if order:
            order['status'] = new_status
            try:
                with open(ORDERS_FILE, 'w', encoding='utf-8') as f:
                    json.dump(orders, f, ensure_ascii=False, indent=2)
            except Exception as e:
                print(f"❌ Ошибка сохранения: {e}")

            updated_text = pizza_bot.format_order_message(order)
            new_keyboard = pizza_bot.create_order_keyboard(order_id)

            try:
                bot.edit_message_text(
                    chat_id=call.message.chat.id,
                    message_id=call.message.message_id,
                    text=updated_text,
                    parse_mode='HTML',
                    reply_markup=new_keyboard,
                    timeout=30
                )
            except Exception as e:
                print(f"⚠️ Не удалось обновить сообщение: {e}")

            bot.answer_callback_query(call.id, status_message, timeout=10)

    elif action == 'call':
        order = next((o for o in pizza_bot.load_orders() if o['id'] == order_id), None)
        if order:
            bot.send_message(
                call.message.chat.id,
                f"📞 <b>Информация для звонка:</b>\n"
                f"Клиент: {order['customer']['name']}\n"
                f"Телефон: {order['customer']['phone']}\n"
                f"Заказ #{order_id}\n"
                f"Адрес: {order['customer']['address']}",
                parse_mode='HTML',
                timeout=30
            )
            bot.answer_callback_query(call.id, "📞 Звоните клиенту!", timeout=10)


@bot.message_handler(func=lambda message: True)
def handle_all_messages(message):
    if str(message.chat.id) == ADMIN_CHAT_ID:
        keyboard = types.ReplyKeyboardMarkup(resize_keyboard=True, row_width=2)
        buttons = [
            types.KeyboardButton("📋 Все заказы"),
            types.KeyboardButton("🔄 Активные заказы"),
            types.KeyboardButton("📊 Статистика"),
            types.KeyboardButton("❓ Помощь")
        ]
        keyboard.add(*buttons)

        bot.send_message(
            message.chat.id,
            "Используйте кнопки меню или команды.",
            reply_markup=keyboard,
            timeout=30
        )
    else:
        bot.send_message(message.chat.id, "⛔ Доступ запрещен", timeout=30)


def run_bot_with_retry():
    max_restarts = 10
    restart_count = 0

    while restart_count < max_restarts:
        try:
            print(f"📡 Запуск бота (попытка {restart_count + 1})...")
            bot.infinity_polling(timeout=60, long_polling_timeout=90)
        except requests.exceptions.ReadTimeout:
            restart_count += 1
            print(f"⚠️ Таймаут соединения. Перезапуск через 5 секунд... ({restart_count}/{max_restarts})")
            time.sleep(5)
        except requests.exceptions.ConnectionError:
            restart_count += 1
            print(f"⚠️ Ошибка соединения. Перезапуск через 10 секунд... ({restart_count}/{max_restarts})")
            time.sleep(10)
        except Exception as e:
            restart_count += 1
            print(f"❌ Ошибка: {e}")
            print(f"🔄 Перезапуск через 5 секунд... ({restart_count}/{max_restarts})")
            time.sleep(5)

    print("❌ Достигнуто максимальное количество перезапусков. Бот остановлен.")


def main():
    print("=" * 50)
    print("🍕 Пиццерия Сичных - Бот управления заказами")
    print("📍 г. Таганрог, ул. Москатова, 10/1")
    print("📞 +7 (989) 548-35-77")
    print("=" * 50)

    pizza_bot = PizzaBot(bot, ADMIN_CHAT_ID)
    pizza_bot.is_running = True
    check_thread = threading.Thread(target=pizza_bot.check_new_orders, daemon=True)
    check_thread.start()

    try:
        pizza_bot.send_admin_message(
            "🍕 <b>Бот Пиццерии Сичных активирован!</b>\n\n"
            "📍 г. Таганрог, ул. Москатова, 10/1\n"
            "📞 +7 (989) 548-35-77\n\n"
            "Отслеживаю новые заказы..."
        )
    except Exception as e:
        print(f"⚠️ Не удалось отправить приветствие: {e}")

    run_bot_with_retry()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n👋 Бот остановлен пользователем")
    except Exception as e:
        print(f"❌ Критическая ошибка: {e}")