import {getBillboard} from "@/actions/get-billboard";
import { getProducts} from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/productList";
import Container from "@/components/ui/container";

export const revalidate = 0;
const HomePage = async () => {
  try {
    const billboards = await getBillboard("077ab203-144c-478b-9f6f-b35aea2ab8f4");
    const products = await getProducts({ isFeatured: true });

    return (
      <Container>
        <div className="space-y-10 pb-10">
          {billboards&&<Billboard data={billboards} />}
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <ProductList title="Featured Products" items={products} />
          </div>
        </div>
      </Container>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading content. Please try again later.</div>;
  }
};
export default HomePage