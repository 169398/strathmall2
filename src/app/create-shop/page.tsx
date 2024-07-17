/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import Select from "~/components/Select";
import Input from "~/components/Input";
import { trpc } from "~/utils/trpc"; // Ensure this path points to a file where TRPC React query hooks are correctly set up and exported.


const shopSchema = z.object({
  name: z.string().min(3, "Shop name must be at least 3 characters"),
  description: z.string(),
  phoneNumber: z.string().regex(/^\+254\d{9}$/, "Invalid Kenyan phone number"),
  categories: z.array(z.string()),
  imageUrl: z.string().url({ message: "Invalid image URL" }),
});

const CreateShopPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof shopSchema>>({
    resolver: zodResolver(shopSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const utils = trpc.useContext();

  const { mutateAsync } = trpc.useMutation<
    z.infer<typeof shopSchema>
  >("shop.create", {
    onSuccess: async (data: z.infer<typeof shopSchema> & { id: string }) => {
      toast.success("Shop created successfully!");
    await utils.invalidate(undefined);
      window.location.href = `/shop/${data.id}`;
    },
    onError: (error: unknown) => {
      if (typeof error === "string") {
        toast.error(`Error: ${error}`);
      } else if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An error occurred");
      }
    },
  });

  const onSubmit = async (data: z.infer<typeof shopSchema>) => {
    setIsLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await mutateAsync(data);
    } catch (error) {
        if (error instanceof Error) {
      toast.error(`Error: ${error .message }`);
    }
    else{
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
    <div>
      <h1>Create a Shop</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Shop Name" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}

        <Input label="Description" {...register("description")} />
        {errors.description && <p>{errors.description.message}</p>}

        <Input label="Phone Number" {...register("phoneNumber")} />
        {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}

        <Select
          label="Categories"
          multiple
          {...register("categories")}
          options={categories.map((category) => ({
            value: category,
            label: category,
          }))}
        />
        {errors.categories && <p>{errors.categories.message}</p>}

        <Input label="Image URL" {...register("imageUrl")} />
        {errors.imageUrl && <p>{errors.imageUrl.message}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : "Create Shop"}
        </button>
      </form>
    </div>
  );
};

export default CreateShopPage;
