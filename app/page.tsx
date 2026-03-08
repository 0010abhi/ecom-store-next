
import Carousel from "./_components/Carousel";

interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}

interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}



export default async function Home() {
  const data = await fetch('https://api.escuelajs.co/api/v1/products')
  const products = await data.json()
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-row flex-wrap">
        {products.map((product: Product) => (
          <div className="border m-2 p-4 max-w-xs" key={product.id}>
            {product.title}
            <Carousel product={product} />
            
            {/* {product.images.map((image, index) => (
              
            ))} */}
            {product.price}
            {product.description}
            {product.category.name}
          </div>
        ))}
      </div>

    </div>
  );
}
