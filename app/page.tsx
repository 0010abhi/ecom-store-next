import Carousel from "./_components/Carousel";
import CategoryCardsList from "./_components/CategoryCardsList";
import ContactUs from "./_components/Layout/ContactUs";
import CustomerReviews from "./_components/Layout/CustomerReviews";

export default async function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '15px' }}>
      <div style={{ minHeight: '600px' }}>
        {
          <Carousel
            images={["/images/showcase-1.jpg"]}
            alt={"showcase" + 1}
            width={1400}
            height={600}
          />
        }
        <CategoryCardsList />
        <CustomerReviews />
        <ContactUs />
      </div>
    </div>
  );
}
