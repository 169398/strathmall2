import Image from "next/image";
import React from "react";

interface ShopCardProps {
  name: string;
  description: string;
  imageUrl: string;
  categories: string[];
}

const ShopCard: React.FC<ShopCardProps> = ({
  name,
  description,
  imageUrl,
  categories,
}) => {
  return (
    <div className="shop-card">
      <Image src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      <div className="categories">
        {categories.map((category) => (
          <span key={category}>{category}</span>
        ))}
      </div>
    </div>
  );
};

export default ShopCard;
