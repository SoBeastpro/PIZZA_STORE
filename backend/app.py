from flask import Flask
from routes.health import health_bp
from config import Config
from extensions import init_extensions


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    init_extensions(app)
    app.register_blueprint(
        health_bp
    )

    return app


if __name__ == "__main__":
    app = create_app()

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )