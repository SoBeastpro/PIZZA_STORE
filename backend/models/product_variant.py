from datetime import datetime

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from extensions import db


class ProductVariant(db.Model):
    __tablename__ = "product_variants"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    product_id: Mapped[int] = mapped_column(
        ForeignKey("products.id"),
        nullable=False
    )

    name: Mapped[str] = mapped_column(
        db.String(100),
        nullable=False
    )

    price: Mapped[int] = mapped_column(
        nullable=False
    )

    weight: Mapped[int | None] = mapped_column(
        nullable=True
    )

    is_active: Mapped[bool] = mapped_column(
        default=True
    )

    created_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow
    )


    product: Mapped["Product"] = relationship(
        "Product",
        back_populates="variants"
    )