from datetime import datetime

from sqlalchemy.orm import Mapped, mapped_column, relationship

from extensions import db


class Category(db.Model):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    name: Mapped[str] = mapped_column(
        db.String(100),
        nullable=False
    )

    slug: Mapped[str] = mapped_column(
        db.String(100),
        unique=True,
        nullable=False
    )

    sort_order: Mapped[int] = mapped_column(
        default=0
    )

    is_active: Mapped[bool] = mapped_column(
        default=True
    )

    created_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow
    )
    products: Mapped[list["Product"]] = relationship(
        "Product",
        back_populates="category"
    )