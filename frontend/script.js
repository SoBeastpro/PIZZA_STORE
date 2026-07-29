// ==================== НАСТРОЙКИ ====================
const API_URL = '';  // Пустая строка = текущий домен
const PHONE_NUMBER = '+79895483577';

// ==================== ДАННЫЕ МЕНЮ ====================
const menu = {
    pizza: [
        { id: 1, name: "Маргарита", description: "Соус чесночно-сливочный, сыр, помидоры, итальянские травы", price35: 890, price40: 960, category: "pizza", image: "https://i.ibb.co/8L7HGdn6/image.png?v=2", ingredients: ["Соус чесночно-сливочный", "Сыр", "Помидоры", "Итальянские травы"] },
        { id: 2, name: "Пепперони", description: "Соус, сыр, пепперони, помидоры", price35: 890, price40: 1100, category: "pizza", image: "https://i.ibb.co/xKCYBXNN/image.png?v=2", ingredients: ["Соус", "Сыр", "Пепперони", "Помидоры"] },
        { id: 3, name: "Мясная", description: "Сыр моцарелла, курица копчёная, буженина, бекон, пепперони, зелёный лук", price35: 980, price40: 1100, category: "pizza", image: "https://i.ibb.co/PZgQz4f6/image.png?v=2", ingredients: ["Сыр моцарелла", "Курица копчёная", "Буженина", "Бекон", "Пепперони", "Зелёный лук"] },
        { id: 4, name: "4 сыра", description: "Сыр моцарелла, сыр Эмменталь, дор блю, чеддер, итальянские травы", price35: 980, price40: 1100, category: "pizza", image: "https://i.ibb.co/mpR7xmm/image.png?v=2", ingredients: ["Сыр моцарелла", "Сыр Эмменталь", "Дор блю", "Чеддер", "Итальянские травы"] },
        { id: 5, name: "Гавайская", description: "Куриное филе, ананасы консервированные, сыр моцарелла, оливки", price35: 890, price40: 960, category: "pizza", image: "https://i.ibb.co/gbZGBDGQ/image.png", ingredients: ["Куриное филе", "Ананасы консервированные", "Сыр моцарелла", "Оливки"] },
        { id: 6, name: "Цезарь", description: "Белый фирменный соус, салат айсберг, помидоры, красный лук, сыр моцарелла", price35: 890, price40: 960, category: "pizza", image: "https://i.ibb.co/8L7HGdn6/image.png?v=2", ingredients: ["Белый фирменный соус", "Салат айсберг", "Помидоры", "Красный лук", "Сыр моцарелла"] },
        { id: 7, name: "Морская", description: "Сыр творожный, сыр, морской коктейль, креветки, помидоры, маслины, зелень, сыр сулугуни", price35: 1050, price40: 1150, category: "pizza", image: "https://i.ibb.co/9F9y4wC/image.png", ingredients: ["Сыр творожный", "Сыр", "Морской коктейль", "Креветки", "Помидоры", "Маслины", "Зелень", "Сыр сулугуни"] },
        { id: 8, name: "Ветчина и грибы", description: "Ветчина, шампиньоны, сыр моцарелла, сливочный соус", price35: 890, price40: 960, category: "pizza", image: "https://i.ibb.co/xtr1KcW3/image.png", ingredients: ["Ветчина", "Шампиньоны", "Сыр моцарелла", "Сливочный соус"] },
        { id: 9, name: "Мексиканская", description: "Красный соус, сыр, мексиканская смесь, халапеньо, Чили соус", price35: 890, price40: 960, category: "pizza", image: "https://i.ibb.co/8L7HGdn6/image.png?v=2", ingredients: ["Острый соус", "Говядина", "Перец халапеньо", "Кукуруза", "Сыр моцарелла"] },
        { id: 10, name: "Колбасное ассорти", description: "Пепперони, салями, охотничьи колбаски, бекон, сыр моцарелла", price35: 980, price40: 1100, category: "pizza", image: "https://i.ibb.co/JWfPxMk2/image.png", ingredients: ["Пепперони", "Салями", "Охотничьи колбаски", "Бекон", "Сыр моцарелла"] },
        { id: 11, name: "4 мира", description: "Сыры моцарелла, чеддер, пармезан, дор блю. Пепперони, помидоры, халапеньо, курица, грибы. Белый и красный соус.", price35: 1050, price40: 1150, category: "pizza", image: "https://i.ibb.co/wh3H0JWD/image.png", ingredients: ["Сыр моцарелла", "Сыр чеддер", "Сыр пармезан", "Сыр сулугуни", "Итальянские травы"] },
        { id: 12, name: "Жульен", description: "Соус сливочно-чесночный, сыр моцарелла, помидоры, куриное филе, шампиньоны", price35: 890, price40: 960, category: "pizza", image: "https://i.ibb.co/V0pp5rYX/image.png", ingredients: ["Соус сливочно-чесночный", "Сыр моцарелла", "Помидоры", "Куриное филе", "Шампиньоны"] },
        { id: 13, name: "Вегетарианская", description: "Помидоры, оливки, маслины, лук зелёный", price35: 890, price40: 960, category: "pizza", image: "https://i.ibb.co/8L7HGdn6/image.png?v=2", ingredients: ["Помидоры", "Оливки", "Маслины", "Лук зелёный"] },
        { id: 14, name: "Курица с грибами", description: "Белый соус, сыр, курица копчённая, перец болгарский, индейка, маслины, зеленый лук.", price35: 890, price40: 960, category: "pizza", image: "https://i.ibb.co/8DSG7Vvm/image.png", ingredients: ["Курица (су-вид)", "Шампиньоны", "Сыр моцарелла"] },
        { id: 15, name: "Жульен индейка", description: "Курица копчёная, перец болгарский, шампиньоны, зелёный лук", price35: 890, price40: 960, category: "pizza", image: "https://i.ibb.co/nsbZSth2/image.png?v=2", ingredients: ["Курица копчёная", "Перец болгарский", "Шампиньоны", "Зелёный лук"] },
        { id: 16, name: "Чизбургер", description: "моцарелла, куриный фарш, Чеддер, соленные огурцы, помидоры, красный лук, зеленый лук.", price35: 890, price40: 960, category: "pizza", image: "https://i.ibb.co/8L7HGdn6/image.png?v=2", ingredients: ["Соус бургерный", "Сыр чеддер", "Говяжья котлета", "Помидоры", "Маринованные огурцы", "Лук"] },
        { id: 17, name: "Индейка с беконом", description: "Белый соус, сыр, индейка, бекон, паприка, томаты, маслины", price35: 1050, price40: 1150, category: "pizza", image: "https://i.ibb.co/gbZGBDGQ/image.png", ingredients: ["Белый соус", "Сыр", "Индейка", "Бекон", "Паприка", "Томаты", "Маслины"] }
    ],
    snacks: [
        { id: 30, name: "Картошка фри", description: "Золотистый картофель с солью и соусом на выбор", price: 150, category: "snacks", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600", ingredients: ["Картофель","Соль","Соус"] },
        { id: 31, name: "Наггетсы (3 шт.)", description: "Куриные наггетсы в хрустящей панировке", price: 180, category: "snacks", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=600", ingredients: ["Куриное филе","Панировка","Специи"] },
        { id: 32, name: "Стрипсы (3 шт.)", description: "Куриные стрипсы в острой панировке", price: 200, category: "snacks", image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=600", ingredients: ["Куриное филе","Острая панировка","Специи"] }
    ],
    cold_drinks: [
        { id: 40, name: "Коктейль молочный", description: "Освежающий молочный коктейль 0.4л", price: 150, category: "cold_drinks", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600", ingredients: ["Молоко","Мороженое","Сироп"] },
        { id: 41, name: "Смузи", description: "Фруктовый смузи из свежих ягод 0.3л", price: 150, category: "cold_drinks", image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=600", ingredients: ["Ягоды","Банан","Йогурт"] },
        { id: 42, name: "Холодный кофе", description: "Освежающий кофе со льдом 0.3л", price: 200, category: "cold_drinks", image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600", ingredients: ["Кофе эспрессо","Молоко","Лёд","Сироп"] },
        { id: 43, name: "Лимонад", description: "Домашний лимонад с мятой и лаймом 0.4л", price: 150, category: "cold_drinks", image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600", ingredients: ["Газированная вода","Лимонный сок","Мята","Лайм"] }
    ],
    hot_drinks: [
        { id: 50, name: "Кофе чёрный", description: "Натуральный чёрный кофе 0.2л", price: 100, category: "hot_drinks", image: "https://images.unsplash.com/photo-1494314671902-399b18174975?w=600", ingredients: ["Кофе арабика","Вода"] },
        { id: 51, name: "Американо", description: "Классический американо 0.2л", price: 120, category: "hot_drinks", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600", ingredients: ["Эспрессо","Вода"] },
        { id: 52, name: "Латте", description: "Нежный кофе с молоком 0.3л", price: 150, category: "hot_drinks", image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600", ingredients: ["Эспрессо","Молоко","Молочная пенка"] },
        { id: 53, name: "Капучино", description: "Классический капучино 0.2л", price: 140, category: "hot_drinks", image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600", ingredients: ["Эспрессо","Молоко","Молочная пенка"] },
        { id: 54, name: "Чай чёрный", description: "Чёрный чай с бергамотом 0.3л", price: 80, category: "hot_drinks", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600", ingredients: ["Чай чёрный","Бергамот"] },
        { id: 55, name: "Чай зелёный", description: "Зелёный чай с жасмином 0.3л", price: 80, category: "hot_drinks", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600", ingredients: ["Чай зелёный","Жасмин"] }
    ]
};

// ==================== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ====================
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let currentFilter = 'all';
let currentProduct = null;
let selectedSize = '35';
let socket = null;
let orderCheckInterval = null;
let paymentCheckInterval = null;

// ==================== ФУНКЦИИ ОПЛАТЫ (Т-БАНК) ====================
async function initTBankPayment(orderId, amount, orderData) {
    try {
        showToast('💳 Перенаправление на оплату...');
        const response = await fetch(`${API_URL}/api/payment/init`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                order_id: orderId,
                amount: Math.max(amount * 100, 10000),
                order_data: orderData  // ← ПЕРЕДАЁМ ДАННЫЕ ЗАКАЗА
            })
        });
        const data = await response.json();

        if (data.success && data.payment_url) {
            window.open(data.payment_url, '_blank');
            showToast('💳 Оплатите заказ в открывшемся окне');
            startPaymentCheck(orderId);
            return true;
        } else {
            showToast('❌ Ошибка: ' + (data.error || 'не удалось инициализировать платёж'));
            return false;
        }
    } catch (error) {
        console.error('Payment init error:', error);
        showToast('❌ Ошибка соединения с платёжным сервером');
        return false;
    }
}

function startPaymentCheck(orderId) {
    if (paymentCheckInterval) clearInterval(paymentCheckInterval);
    let attempts = 0;
    paymentCheckInterval = setInterval(async () => {
        attempts++;
        try {
            const response = await fetch(`${API_URL}/api/payment/status/${orderId}`);
            const data = await response.json();

            if (data.status === 'CONFIRMED') {
                clearInterval(paymentCheckInterval);
                paymentCheckInterval = null;
                showToast('✅ Оплата прошла успешно! Спасибо!');
                // Обновляем статус заказа локально
                updateOrderStatusLocal(orderId, 'accepted');
                // Обновляем UI статуса заказа
                updateOrderStatusUI('accepted');
            } else if (data.status === 'REJECTED' || data.status === 'DEADLINE_EXPIRED') {
                clearInterval(paymentCheckInterval);
                paymentCheckInterval = null;
                showToast('❌ Оплата не прошла. Попробуйте снова или выберите другой способ.');
            } else if (attempts > 60) { // 5 минут
                clearInterval(paymentCheckInterval);
                paymentCheckInterval = null;
                showToast('⏰ Время ожидания оплаты истекло.');
            }
        } catch (error) {
            console.error('Payment status check error:', error);
        }
    }, 5000);
}

// ==================== ОСТАЛЬНЫЕ ФУНКЦИИ ====================
function initWebSocket() {
    try {
        socket = io(API_URL);
        socket.on('order_status_update', (data) => {
            updateOrderStatusFromServer(data.order_id, data.status);
        });
    } catch(e) { console.warn('WebSocket not available'); }
}

document.addEventListener('DOMContentLoaded', () => {
    initWebSocket();
    renderMenu();
    updateCartUI();
    createParticles();
    initTheme();
    window.addEventListener('scroll', () => {
        const p = document.querySelector('.parallax-bg');
        if(p) p.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
    });
});

function initTheme() {
    const t = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', t);
    updateThemeIcon(t);
}

function toggleTheme() {
    const c = document.documentElement.getAttribute('data-theme'), n = c === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', n);
    localStorage.setItem('theme', n);
    updateThemeIcon(n);
}

function updateThemeIcon(t) {
    const i = document.querySelector('.theme-toggle i');
    if(i) i.className = t === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function toggleMobileMenu() {
    const m = document.getElementById('mobileMenu'), o = document.getElementById('mobileMenuOverlay');
    m.classList.toggle('active'); o.classList.toggle('active');
    document.body.style.overflow = m.classList.contains('active') ? 'hidden' : '';
}

function createParticles() {
    const c = document.getElementById('particles');
    if(!c) return;
    const e = ['🍕','🧀','🍅','🌿','🌶️'];
    for(let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.textContent = e[Math.floor(Math.random() * e.length)];
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = Math.random() * 10 + 10 + 's';
        c.appendChild(p);
    }
}

function filterMenu(cat) {
    currentFilter = cat;
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    renderMenu();
}

function renderMenu() {
    const g = document.getElementById('pizzaGrid');
    if(!g) return;
    let items = [];
    if(currentFilter === 'all') Object.values(menu).forEach(c => items = items.concat(c));
    else items = menu[currentFilter] || [];
    g.innerHTML = items.map(item => {
        const dp = item.category === 'pizza' ? item.price35 : item.price;
        return `<div class="pizza-card" onclick="openProductModal(${item.id})">
                    <div class="pizza-image-container">
                        <img src="${item.image}" alt="${item.name}" class="pizza-image" onerror="this.src='https://via.placeholder.com/400x250/222/ff6b35?text=${encodeURIComponent(item.name)}'">
                        <div class="pizza-overlay">
                            <button class="btn" onclick="event.stopPropagation();openProductModal(${item.id})"><i class="fas fa-eye"></i> Подробнее</button>
                        </div>
                    </div>
                    <div class="pizza-info">
                        <h3 class="pizza-name">${item.name}</h3>
                        <p class="pizza-description">${item.description}</p>
                        <div class="pizza-footer">
                            <span class="pizza-price">от ${dp} ₽</span>
                            <button class="add-to-cart-btn" onclick="event.stopPropagation();openProductModal(${item.id})"><i class="fas fa-cart-plus"></i> В заказ</button>
                        </div>
                    </div>
                </div>`;
    }).join('');
}

function findItemById(id) {
    for(const c of Object.values(menu)) {
        const i = c.find(x => x.id === id);
        if(i) return i;
    }
    return null;
}

function openProductModal(id) {
    const i = findItemById(id);
    if(!i) return;
    currentProduct = i;
    if(i.category === 'pizza') selectedSize = '35';
    document.getElementById('modalImage').src = i.image;
    document.getElementById('modalName').textContent = i.name;
    document.getElementById('modalDescription').textContent = i.description;
    updateModalPrice();
    const il = document.getElementById('modalIngredients');
    if(il) il.innerHTML = i.ingredients.map(ing => `<span class="ingredient-tag">${ing}</span>`).join('');
    const ss = document.getElementById('sizeSelector');
    if(i.category === 'pizza') { if(ss) ss.style.display = 'flex'; updateSizeButtons(); }
    else { if(ss) ss.style.display = 'none'; }
    document.getElementById('productModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function selectSize(s) {
    selectedSize = s;
    updateSizeButtons();
    updateModalPrice();
}

function updateSizeButtons() {
    const b35 = document.getElementById('size35'), b40 = document.getElementById('size40');
    if(b35 && b40) {
        b35.classList.toggle('active', selectedSize === '35');
        b40.classList.toggle('active', selectedSize === '40');
    }
}

function updateModalPrice() {
    const pe = document.getElementById('modalPrice');
    if(!currentProduct || !pe) return;
    pe.textContent = currentProduct.category === 'pizza' ? (selectedSize === '35' ? currentProduct.price35 : currentProduct.price40) : currentProduct.price;
}

function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
    document.body.style.overflow = '';
    currentProduct = null;
    selectedSize = '35';
}

function addToCartFromModal() {
    if(!currentProduct) return;
    let ci;
    if(currentProduct.category === 'pizza') {
        ci = { ...currentProduct, price: selectedSize === '35' ? currentProduct.price35 : currentProduct.price40, size: selectedSize + ' см', sizeKey: selectedSize };
    } else {
        ci = { ...currentProduct, size: null, sizeKey: null };
    }
    addToCartItem(ci);
    closeProductModal();
    showToast(`${currentProduct.name}${ci.size ? ' ' + ci.size : ''} добавлен!`);
    animateCartIcon();
}

function addToCartItem(item) {
    const ei = cart.find(i => i.id === item.id && i.sizeKey === item.sizeKey);
    if(ei) { ei.quantity++; } else { cart.push({ ...item, quantity: 1 }); }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const cnt = cart.reduce((s,i) => s + i.quantity, 0), tot = cart.reduce((s,i) => s + i.price * i.quantity, 0);
    const cc = document.getElementById('cartCount'), ct = document.getElementById('cartTotal'), ci = document.getElementById('cartItems');
    if(cc) cc.textContent = cnt;
    if(ct) ct.textContent = tot;
    if(ci) {
        ci.innerHTML = cart.length === 0 ? '<p style="color:var(--text-secondary);">Корзина пуста</p>' : cart.map((item, idx) => `
            <div style="display:flex;justify-content:space-between;align-items:start;padding:1rem 0;border-bottom:1px solid var(--border);">
                <div style="flex:1;">
                    <h4>${item.name}${item.size ? ' <span style="color:var(--accent);font-size:0.85rem;">'+item.size+'</span>' : ''}</h4>
                    <p style="color:var(--text-secondary);font-size:0.9rem;">${item.price}₽ × ${item.quantity} = ${item.price * item.quantity}₽</p>
                </div>
                <div style="display:flex;align-items:center;gap:0.5rem;">
                    <button onclick="updateQuantity(${idx},-1)" style="background:none;border:none;color:var(--text-primary);cursor:pointer;">➖</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${idx},1)" style="background:none;border:none;color:var(--text-primary);cursor:pointer;">➕</button>
                    <button onclick="removeFromCart(${idx})" style="background:none;border:none;color:#e74c3c;cursor:pointer;">🗑️</button>
                </div>
            </div>
        `).join('');
    }
}

function updateQuantity(i, c) {
    cart[i].quantity += c;
    if(cart[i].quantity <= 0) cart.splice(i,1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function removeFromCart(i) {
    cart.splice(i,1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function toggleCart() {
    const m = document.getElementById('cartModal'), o = document.getElementById('cartOverlay');
    m.classList.toggle('open'); o.classList.toggle('open');
    document.body.style.overflow = m.classList.contains('open') ? 'hidden' : '';
}

function checkout() {
    if(cart.length === 0) { showToast('Корзина пуста!'); return; }
    toggleCart();
    document.getElementById('checkoutModal').style.display = 'flex';
}

function closeCheckout() { document.getElementById('checkoutModal').style.display = 'none'; }

async function placeOrder() {
    const name = document.getElementById('customerName')?.value,
          phone = document.getElementById('customerPhone')?.value,
          address = document.getElementById('customerAddress')?.value,
          comment = document.getElementById('customerComment')?.value || '',
          payment = document.getElementById('paymentMethod')?.value || 'cash';

    if(!name || !phone || !address) { showToast('Заполните все поля!'); return; }

    const total = cart.reduce((s,i) => s + i.price * i.quantity, 0);
    const orderId = Date.now();

    // Формируем полный объект заказа
    const order = {
        id: orderId,
        customer: { name, phone, address, comment },
        items: cart.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, size: i.size || null })),
        total: total,
        payment: payment,
        payment_status: payment === 'online' ? 'pending' : 'cash',
        status: 'new',
        timestamp: new Date().toISOString(),
        source: 'website'
    };

    try {
        // Отправляем заказ на сервер (для наличных — сразу создаётся, для онлайн — сохраняется для создания после оплаты)
        const response = await fetch(`${API_URL}/api/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
        });

        const result = await response.json();

        if (payment === 'online') {
            // Для онлайн-оплаты — создаём платёж и передаём данные заказа
            const paymentSuccess = await initTBankPayment(orderId, total, order);
            if (paymentSuccess) {
                showOrderTracking(order);
            } else {
                showToast(`Заказ #${orderId} оформлен, но оплата не прошла. ${PHONE_NUMBER}`);
                showOrderTracking(order);
            }
        } else {
            // Для наличных — заказ уже создан
            showToast(`Заказ #${orderId} оформлен! ${PHONE_NUMBER}`);
            showOrderTracking(order);
        }

        // Очищаем корзину
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
        closeCheckout();

    } catch(error) {
        console.error('Order error:', error);
        showToast('❌ Ошибка при оформлении заказа. Попробуйте позже.');
    }
}

function updateOrderStatusLocal(orderId, status) {
    // Получаем заказы из localStorage
    const lo = JSON.parse(localStorage.getItem('localOrders') || '[]');
    const o = lo.find(o => o.id === orderId);
    if(o) {
        o.status = status;
        o.payment_status = 'paid';
        localStorage.setItem('localOrders', JSON.stringify(lo));
    }
    // Также обновляем через API
    fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
    }).catch(() => {});
    updateOrderStatusUI(status);
}

function showOrderTracking(order) {
    document.getElementById('orderTracking').style.display = 'flex';
    document.getElementById('orderNumber').textContent = order.id;
    updateOrderStatusUI(order.status || 'new');
    startOrderTracking(order.id);
}

function startOrderTracking(oid) {
    if(orderCheckInterval) clearInterval(orderCheckInterval);
    orderCheckInterval = setInterval(() => checkOrderStatus(oid), 5000);
    checkOrderStatus(oid);
}

async function checkOrderStatus(oid) {
    try {
        const r = await fetch(`${API_URL}/api/orders/${oid}`);
        if(r.ok) {
            const o = await r.json();
            updateOrderStatusUI(o.status);
            if(o.status === 'delivered' || o.status === 'cancelled') {
                clearInterval(orderCheckInterval);
                orderCheckInterval = null;
            }
        }
    } catch(e) { checkLocalOrderStatus(oid); }
}

function checkLocalOrderStatus(oid) {
    const lo = JSON.parse(localStorage.getItem('localOrders') || '[]');
    const o = lo.find(o => o.id === oid);
    if(o) updateOrderStatusUI(o.status || 'new');
}

function updateOrderStatusFromServer(oid, status) {
    const co = document.getElementById('orderNumber')?.textContent;
    if(co && parseInt(co) === oid) {
        updateOrderStatusUI(status);
        if(status === 'delivered' || status === 'cancelled') {
            clearInterval(orderCheckInterval);
            orderCheckInterval = null;
        }
    }
}

function updateOrderStatusUI(status) {
    const steps = { 'new':1, 'accepted':1, 'cooking':2, 'delivering':3, 'delivered':4, 'cancelled':0 };
    const cs = steps[status] || 1;
    const sf = document.getElementById('statusFill');
    if(sf) {
        sf.style.width = status === 'cancelled' ? '0%' : ((cs-1)/3)*100 + '%';
        sf.style.background = status === 'cancelled' ? '#e74c3c' : 'var(--accent)';
    }
    for(let i=1;i<=4;i++) {
        const s = document.getElementById('step'+i);
        if(s) {
            s.classList.toggle('active', status !== 'cancelled' && i <= cs);
            if(status === 'cancelled') s.querySelector('i').style.color = '#e74c3c';
        }
    }
    const msgs = {
        'new':'Заказ оформлен 📞',
        'accepted':'Заказ принят! 🔥',
        'cooking':'Готовится 👨‍🍳',
        'delivering':'Курьер в пути 🛵',
        'delivered':'Доставлен! 🎉',
        'cancelled':'Отменён ❌'
    };
    const om = document.getElementById('orderMessage');
    if(om) om.textContent = msgs[status] || msgs['new'];
}

function closeTracking() {
    document.getElementById('orderTracking').style.display = 'none';
    if(orderCheckInterval) { clearInterval(orderCheckInterval); orderCheckInterval = null; }
    if(paymentCheckInterval) { clearInterval(paymentCheckInterval); paymentCheckInterval = null; }
}

function animateCartIcon() {
    const icon = document.querySelector('.cart-icon');
    if(icon) { icon.style.animation = 'none'; icon.offsetHeight; icon.style.animation = 'bounceIn 0.5s'; }
}

function showToast(msg) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 4000);
}