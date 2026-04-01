
export default function ContactUs() {
    return (<div style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '300px' }}>
        <h1>Join the newsletter</h1>
        <p>Be the first to know about new arrivals and exclusive offers.</p>
        <form>
            <input type="email" placeholder="Your email address" />
            <button type="submit">Subscribe</button>
        </form>
    </div>);
}