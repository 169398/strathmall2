// src/components/ShopForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { trpc } from "~/utils/trpc";

interface ShopFormData {
  name: string;
  email: string;
  whatsappNumber: string;
}



const ShopForm: React.FC = () => {
 
  const { register, handleSubmit } = useForm<ShopFormData>();
  const createShop = trpc.shop.createShop.useMutation();

  const onSubmit = (data: ShopFormData) => {
    createShop.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Shop Name" required />
      <input {...register("email")} type="email" placeholder="Email" required />
      <input
        {...register("whatsappNumber")}
        placeholder="WhatsApp Number"
        required
      />
      <button type="submit">Create Shop</button>
    </form>
  );
};

export default ShopForm;
