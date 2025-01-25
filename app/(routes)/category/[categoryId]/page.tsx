import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import Filter from "./components/filter";
import NoResult from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";
import MobileFillers from "./components/mobile-filters";


export const revalidate = 0;
interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const {categoryId}=await params
  const {colorId,sizeId}=await searchParams
  const products = await getProducts({
    categoryId,
    colorId,
    sizeId
  });
  const sizes = await getSizes();
  const color = await getColors();
  
  const category = await getCategory( categoryId);
  return (
    <div className="bg-white">
      <Container>
        <Billboard data={category.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8 mt-4">
            <MobileFillers sizes={sizes} colors={color}/>
            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={color} />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
                {products.length===0&&<NoResult/>}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {
                        products.map((product)=>(
                            <ProductCard key={product.id} data={product}/>
                        ))
                    }
                </div>
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
};
export default CategoryPage;
