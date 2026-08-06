from datetime import datetime

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from extensions import db


class OrderItem(db.Model):
    __tablename__ = "order_items"


    id: Mapped[int] = mapped_column(
        primary_key=True
    )


    order_id: Mapped[int] = mapped_column(
        ForeignKey("orders.id"),
        nullable=False
    )


    variant_id: Mapped[int] = mapped_column(
        ForeignKey("product_variants.id"),
        nullable=False
    )


    quantity: Mapped[int] = mapped_column(
        nullable=False,
        default=1
    )


    price: Mapped[int] = mapped_column(
        nullable=False
    )


    created_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow
    )


    order: Mapped["Order"] = relationship(
        "Order",
        back_populates="items"
    )


    variant: Mapped["ProductVariant"] = relationship(
        "ProductVariant"
    )