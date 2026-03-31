import Carousel from "./_components/Carousel";

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
      </div>
    </div>
  );
}
