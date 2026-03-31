import Carousel from "../_components/Carousel";
import ProductsCardList from "../_components/ProductsCardList";

async function getProducts(page = 1, limit = 20) {
    const res = await fetch(`http://localhost:3000/api/products?page=${page}&limit=${limit}`, {
        next: { revalidate: 60 } // Cache for 60 seconds
    });
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
}

export default async function ProductsPage() {
    const { products } = await getProducts();
    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '15px' }}>
            <div>
                <h1>Products</h1>
                <ProductsCardList data={products} />
            </div>
        </div>
    );
}
