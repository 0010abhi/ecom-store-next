
export default function CustomerReviews() {
    return (<div style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '300px' }}>
        <h1>Customer Reviews</h1>
        <p>See what our customers are saying about us.</p>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 20, marginTop: 20 }}>
            <div style={{ background: '#f3f3f3', padding: 20, borderRadius: 8, width: 300 }}>
                <h3>John Doe</h3>
                <p>"Great products and excellent customer service!"</p>
            </div>
            <div style={{ background: '#f3f3f3', padding: 20, borderRadius: 8, width: 300 }}>
                <h3>Jane Smith</h3>
                <p>"I love shopping here! The quality is always top-notch."</p>
            </div>
            <div style={{ background: '#f3f3f3', padding: 20, borderRadius: 8, width: 300 }}>
                <h3>Emily Johnson</h3>
                <p>"Fast shipping and amazing products. Highly recommend!"</p>
            </div>
        </div>
    </div>);
}