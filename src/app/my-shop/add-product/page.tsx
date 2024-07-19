/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Select } from "~/components/ui/select";
import { trpc } from "~/utils/trpc";

const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  description: z.string(),
  price: z.number().positive("Price must be a positive number"),
  categories: z.array(z.string()),
  imageUrl: z.string().url({ message: "Invalid image URL" }),
});

const AddProductPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const utils = trpc.useContext();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const mutation = trpc.product.create.useMutation({
    onSuccess: async (data) => {
      toast.success("Product added successfully!");
      await utils.product.invalidate();
      window.location.href = `/product/${data.id}`;
    },

     onError: (error) => {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An error occurred");
      }
    },
  });

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    setIsLoading(true);
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
        if(error instanceof Error) {
      toast.error(`Error: ${(error ).message}`);
        } else{
        toast.error("An error occurred");
        }
    }
    setIsLoading(false);
  };

  const categories = [
    "foods",
    "games",
    "beauty",
    "clothing",
    "apple",
    "accessories",
    "shoes",
    "art & stickers",
  ];

  return (
    <div className="mx-auto max-w-lg rounded-lg bg-white p-8 shadow-md">
      <h1 className="mb-6 text-2xl font-bold">Add New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Product Name"
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          label="Description"
          {...register("description")}
          error={errors.description?.message}
        />
        <Input
          label="Price"
          type="number"
          {...register("price", { valueAsNumber: true })}
          error={errors.price?.message}
        />
        <Select 
          label="Categories"
          multiple
          {...register("categories")}
          options={categories.map((category) => ({
            value: category,
            label: category,
          }))}
          error={errors.categories?.message}
        />
        <Input
          label="Image URL"
          {...register("imageUrl")}
          error={errors.imageUrl?.message}
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? <Loader2 className="animate-spin" /> : "Add Product"}
        </Button>
      </form>
    </div>
  );
};

export default AddProductPage;
