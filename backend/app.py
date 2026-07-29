from flask import Flask

from config import Config
from extensions import init_extensions


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    init_extensions(app)

    return app


if __name__ == "__main__":
    app = create_app()

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )