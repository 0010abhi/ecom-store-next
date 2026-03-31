import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

function getBaseUrl() {
  if (typeof window !== 'undefined') return ''; // browser should use relative URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // vercel URL
  return 'http://localhost:3000'; // dev
}

async function getProduct(id: string) {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/products?id=${id}`, {
    next: { revalidate: 60 } // Cache for 60 seconds
  });
  if (!res.ok) return null;
  const product = await res.json();
  return product;
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) return notFound();
  return (
    <div style={{ maxWidth: 800, padding: 20 }}>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} style={{ maxWidth: 300, marginBottom: 20 }} />
      <p style={{ fontSize: 16, lineHeight: 1.6 }}>{product.description}</p>
      <p><strong>Category:</strong> {product.category}</p>
      {product.subcategory && <p><strong>Subcategory:</strong> {product.subcategory}</p>}
      <p style={{ fontSize: 20, fontWeight: 700, color: "#1a8917", marginTop: 20 }}>Price: ${product.price}</p>
      {product.rating && <p><strong>Rating:</strong> {product.rating}/5</p>}
      {product.reviews_count && <p><strong>Reviews:</strong> {product.reviews_count}</p>}
      <p><strong>Stock:</strong> {product.in_stock ? "In Stock" : "Out of Stock"}</p>
    </div>
  );
}
