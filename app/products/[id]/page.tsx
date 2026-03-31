export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    return (
        <div style={{ maxWidth: 800, padding: 20 }}>
            Product Details
            {/* <h1>{product.title}</h1>
            <img src={product.image} alt={product.title} style={{ maxWidth: 300, marginBottom: 20 }} />
            <p style={{ fontSize: 16, lineHeight: 1.6 }}>{product.description}</p>
            <p><strong>Category:</strong> {product.category}</p>
            {product.subcategory && <p><strong>Subcategory:</strong> {product.subcategory}</p>}
            <p style={{ fontSize: 20, fontWeight: 700, color: "#1a8917", marginTop: 20 }}>Price: ${product.price}</p>
            {product.rating && <p><strong>Rating:</strong> {product.rating}/5</p>}
            {product.reviews_count && <p><strong>Reviews:</strong> {product.reviews_count}</p>}
            <p><strong>Stock:</strong> {product.in_stock ? "In Stock" : "Out of Stock"}</p> */}
        </div>
    );
}
