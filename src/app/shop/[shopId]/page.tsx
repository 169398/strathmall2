import { type GetServerSideProps } from "next";
import { toast } from "sonner";
import ProductCard from "~/components/ProductsCard";
import ShopCard from "~/components/ShopCard";
import { trpc } from "~/utils/trpc";


interface ShopPageProps {
  shopId: string;
}

const ShopPage: React.FC<ShopPageProps> = ({ shopId }) => {
  const {
    data: shop,
    isLoading,
    error,
  } = trpc.shop.getById.useQuery({ id: shopId });

  if (isLoading) return <p>Loading...</p>;

  if (error instanceof Error) {
return <p>{error.message}</p>;
  } 
  else{
    toast.error("An error occurred");
  }

  return (
    <div>
      {shop && (
        <>
          <ShopCard {...shop} />
          <div className="products">
            {shop.products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const shopId = context.params?.shopId as string;

  return {
    props: {
      shopId,
    },
  };
};

export default ShopPage;
