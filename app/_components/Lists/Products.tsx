import Carousel from "../Carousel";


export default function Products({ products }: any) {
    return (
        <div className="flex flex-row flex-wrap">
            {products.map((product: any) => (
                <div className="border m-2 p-4 max-w-xs" key={product.id}>
                    {product.title}
                    <Carousel images={product.images} alt={product.title} />
                    {product.price}
                    {product.description}
                    {product.category.name}
                </div>
            ))}
        </div>
    )
}