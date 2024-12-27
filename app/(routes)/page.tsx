import getBillboards from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/productList";
import Container from "@/components/ui/container";

export const revalidate = 0;
const HomePage = async () => {
  const billboards = await getBillboards(
    "07a4405c-6589-4aae-b9d8-aad9d34ec84e"
  );
  const products = await getProducts({ isFeatured: true });
  return (
    <Container>
      <div className=" space-y-10 pb-10">
        <Billboard data={billboards} />
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <ProductList title="Featured Products" items={products} />
      </div>
      </div>
    </Container>
  );
};

export default HomePage;
