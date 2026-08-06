from datetime import datetime

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from extensions import db


class Product(db.Model):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    category_id: Mapped[int] = mapped_column(
        ForeignKey("categories.id"),
        nullable=False
    )

    name: Mapped[str] = mapped_column(
        db.String(150),
        nullable=False
    )

    description: Mapped[str | None] = mapped_column(
        db.Text,
        nullable=True
    )

    image: Mapped[str | None] = mapped_column(
        db.String(255),
        nullable=True
    )

    is_active: Mapped[bool] = mapped_column(
        default=True
    )

    created_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow
    )


    category: Mapped["Category"] = relationship(
        "Category",
        back_populates="products"
    )

    variants: Mapped[list["ProductVariant"]] = relationship(
        "ProductVariant",
        back_populates="product",
        cascade="all, delete-orphan"
    )