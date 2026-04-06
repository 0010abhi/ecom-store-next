import Link from "next/link";

export default function Footer() {
    return <footer>
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>

            <div style={{ display: 'flex', flexDirection: 'row', gap: '18px', justifyContent: 'space-evenly', alignItems: 'center', padding: '40px 0' }}>
                <div>
                    <h3>Store Name</h3>
                    <p>
                        Curated fashion for the discerning modern woman.
                    </p>
                    Instagram Icon
                </div>
                <div>
                    <h3>Shop</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li><Link href="/new-arrivals">New Arrivals</Link></li>
                        <li><Link href="/clothing">Clothing</Link></li>
                        <li><Link href="/accessories">Accessories</Link></li>
                        <li><Link href="/sale">Sale</Link></li>
                    </ul>
                </div>
                <div>
                    <h3>


                        Help
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li><Link href="/customer-service">Customer Service</Link></li>
                        <li><Link href="/shipping">Shipping</Link></li>
                        <li><Link href="/returns">Returns</Link></li>
                        <li><Link href="/size-guide">Size Guide</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div>
                    <h3>Visit Us</h3>
                    <p>42 Rue du Faubourg,\nIndia 75008\n+91 11 42 65 00 00</p>
                </div>
            </div>
            <div>
                &copy; 2026 | store website name | All rights reserved.
            </div>
        </div>
    </footer>
}