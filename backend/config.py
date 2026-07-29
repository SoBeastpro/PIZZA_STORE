import os
from dotenv import load_dotenv


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

load_dotenv(
    os.path.join(BASE_DIR, ".env")
)


class Config:
    # Flask
    SECRET_KEY = os.getenv(
        "SECRET_KEY",
        "dev-secret-key"
    )

    # T-Bank
    TBANK_TERMINAL_KEY = os.getenv(
        "TBANK_TERMINAL_KEY"
    )

    TBANK_PASSWORD = os.getenv(
        "TBANK_PASSWORD"
    )

    TBANK_API_URL = os.getenv(
        "TBANK_API_URL"
    )

    # Telegram
    BOT_TOKEN = os.getenv(
        "BOT_TOKEN"
    )

    ADMIN_CHAT_ID = os.getenv(
        "ADMIN_CHAT_ID"
    )