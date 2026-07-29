import os
from dotenv import load_dotenv

load_dotenv()


TBANK_TERMINAL_KEY = os.getenv("TBANK_TERMINAL_KEY")
TBANK_PASSWORD = os.getenv("TBANK_PASSWORD")
TBANK_API_URL = os.getenv("TBANK_API_URL")

BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
ADMIN_CHAT_ID = os.getenv("TELEGRAM_ADMIN_CHAT_ID")