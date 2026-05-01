import Link from "next/link";
import Carousel from "../_components/Carousel";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

function getDiscountedPrice(price: number) {
    // Simulate a 20% discount for demo
    return (price * 0.8).toFixed(2);
}



function ProductCard({ data }: { data: any }) {
    return (
        <Card className="max-w-sm">
            <CardHeader>
                <CardTitle>{data.title}</CardTitle>
                <CardDescription>
                    {
                        data.description.length > 80
                            ? data.description.slice(0, 80) + "..."
                            : data.description
                    }
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Carousel images={[data.image]} alt={data.title} />
                <div>{getDiscountedPrice(data.price)}</div>

            </CardContent>
            <CardAction>
                <Link href={`/products/${data.id}`} style={{ marginTop: 12, color: "#0070f3", textDecoration: "underline" }}>
                    View Details
                </Link>
            </CardAction>
        </Card>
    )
}

export default function ProductsCardList({ data }: { data: any }) {
    return (<div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }
    }>
        {
            data.map((product: any) => {
                const discounted = getDiscountedPrice(product.price);
                // return (
                //     <div
                //         key={product.id}
                //         style={{
                //             border: "1px solid #ccc",
                //             borderRadius: 8,
                //             padding: 16,
                //             maxWidth: 280,
                //             minWidth: 220,
                //             background: "#fff",
                //             display: "flex",
                //             flexDirection: "column",
                //             alignItems: "center",
                //             boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                //         }
                //         }
                //     >

                //         
                //         <h2 style={{ fontSize: 18, margin: "12px 0 4px 0", textAlign: "center" }} > {product.title} </h2>
                //         <p style={{
                //             background: "#f3f3f3",
                //             color: "#333",
                //             borderRadius: 12,
                //             padding: "2px 10px",
                //             fontSize: 12,
                //             marginBottom: 8,
                //             display: "inline-block"
                //         }}> {product.category} </p>
                //         <div style={{ margin: "8px 0" }}>
                //             <span style={{ fontWeight: 700, color: "#1a8917", fontSize: 18 }}> ${discounted} </span>
                //             < span style={{ textDecoration: "line-through", color: "#888", marginLeft: 8, fontSize: 14 }}> ${product.price} </span>
                //             < span style={{ color: "#e63946", marginLeft: 8, fontSize: 13 }}>
                //                 20 % OFF
                //             </span>
                //         </div>
                //         <p style={{ fontSize: 14, color: "#444", textAlign: "center", margin: 0 }}>
                //             {
                //                 product.description.length > 80
                //                     ? product.description.slice(0, 80) + "..."
                //                     : product.description
                //             }
                //         </p>
                //         <Link href={`/products/${product.id}`} style={{ marginTop: 12, color: "#0070f3", textDecoration: "underline" }}>
                //             View Details
                //         </Link>
                //     </div>
                // );
                return <ProductCard key={product.id} data={product} />;
            })}
    </div>
    )
}