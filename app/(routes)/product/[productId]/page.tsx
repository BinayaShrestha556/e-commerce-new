import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ProductList from "@/components/productList";
import Container from "@/components/ui/container";


interface ProductPageProps{
  params:{
    productId:string;
  }
}

const ProductPage: React.FC<ProductPageProps> =async ({params}) => {
  const {productId}=await params
  const product= await getProduct(productId)
  const suggestedProducts=await getProducts({categoryId:product?.category?.id})
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 md:px-8">
          <div className="md:grid md:grid-cols-2 lg:items-start md:gap-x-8">

            
            <Gallery images={product.images}/>
            <div className="mt-10 px-4 flex flex-col sm:mt-16 items-start sm:px-0 md:mt-0">
              <Info data={product}/>
             
            </div>
          </div>
            <hr className="my-10" />
            <ProductList title="Related items" items={suggestedProducts}/>
        </div>
      </Container>
    </div>
  )
}

export default ProductPage