"use client";

import { Card, CardHeader } from "~/components/ui/card";
import { PRODUCT_CATEGORIES } from "~/config";
import { useState } from "react";
import Image from "next/image";

export function SelectCategory() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
      <input type="hidden" name="category" value={selectedCategory ?? ""} />
      {PRODUCT_CATEGORIES[0]?.featured.map((item) => (
        <div key={item.name} className="cursor-pointer">
          <Card
            className={
              selectedCategory === item.name
                ? "border-2 border-primary"
                : "border-2 border-primary/10"
            }
            onClick={() => setSelectedCategory(item.name)}
          >
            <CardHeader>
              <Image src={item.imageSrc} alt={item.name} />
              <h3 className="font-medium">{item.name}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}
