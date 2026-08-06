from datetime import datetime

from sqlalchemy import ForeignKey, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from extensions import db

import enum


class OrderStatus(enum.Enum):
    CREATED = "created"
    ACCEPTED = "accepted"
    COOKING = "cooking"
    READY = "ready"
    DELIVERY = "delivery"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class PaymentStatus(enum.Enum):
    WAITING = "waiting"
    PAID = "paid"
    FAILED = "failed"


class Order(db.Model):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )


    user_id: Mapped[int | None] = mapped_column(
        ForeignKey("users.id"),
        nullable=True
    )


    status: Mapped[OrderStatus] = mapped_column(
        Enum(OrderStatus),
        default=OrderStatus.CREATED
    )


    payment_status: Mapped[PaymentStatus] = mapped_column(
        Enum(PaymentStatus),
        default=PaymentStatus.WAITING
    )


    customer_name: Mapped[str] = mapped_column(
        db.String(100),
        nullable=False
    )


    phone: Mapped[str] = mapped_column(
        db.String(20),
        nullable=False
    )


    address: Mapped[str | None] = mapped_column(
        db.String(255),
        nullable=True
    )


    comment: Mapped[str | None] = mapped_column(
        db.Text,
        nullable=True
    )


    total_price: Mapped[int] = mapped_column(
        nullable=False
    )


    created_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow
    )


    updated_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )


    user: Mapped["User"] = relationship(
        "User",
        back_populates="orders"
    )


    items: Mapped[list["OrderItem"]] = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan"
    )