import Image from "next/image";
import React from "react";

interface ProductCardProps {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  inStock: boolean;
  discount?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  imageUrl,
  price,
  inStock,
  discount,
}) => {
  return (
    <div className="product-card">
      <Image src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      <p>{`Price: ${price}`}</p>
      <p>{`In Stock: ${inStock ? "Yes" : "No"}`}</p>
      {discount && <p>{`Discount: ${discount}`}</p>}
    </div>
  );
};

export default ProductCard;
