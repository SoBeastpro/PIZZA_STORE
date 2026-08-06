from datetime import datetime

from sqlalchemy.orm import Mapped, mapped_column, relationship

from extensions import db


class User(db.Model):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    phone: Mapped[str | None] = mapped_column(
        db.String(20),
        unique=True,
        nullable=True
    )

    email: Mapped[str | None] = mapped_column(
        db.String(120),
        unique=True,
        nullable=True
    )

    name: Mapped[str | None] = mapped_column(
        db.String(100),
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow
    )


    orders: Mapped[list["Order"]] = relationship(
        "Order",
        back_populates="user"
    )