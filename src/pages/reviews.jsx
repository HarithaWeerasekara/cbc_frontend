import Footer from "../components/footer";
import Header from "../components/header";

export default function ReviewsPage() {
  const reviews = [
    {
      name: "Kamini Devage",
      feedback:
        "I’ve been using Crystel Beauty Clear products for two months now, and my skin has never felt better. Highly recommended!",
    },
    {
      name: "Yasidu Weerasinghe",
      feedback:
        "Excellent customer service and fast delivery. I loved the packaging and the product quality is amazing.",
    },
    {
      name: "Danushka Prabath",
      feedback:
        "I was skeptical at first, but after trying the whitening cream, I noticed visible changes in just two weeks. Impressive results!",
    },
    {
      name: "Samudrika Nanayakkara",
      feedback:
        "The best natural cosmetic brand in Sri Lanka. Gentle on skin and smells fantastic. Keep it up!",
    },
    {
      name: "Kavindu Mendis",
      feedback:
        "I recommended Crystel Beauty Clear to all my friends. Great product range and very affordable.",
    },
    {
      name: "Ranjana Senanayaka",
      feedback:
        "High-quality ingredients and real results. I will definitely purchase again.",
    },
  ];

  return (
    <div className="relative flex flex-col min-h-screen text-[#521B41]">
      {/* Fullscreen blurred background image */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center filter blur-sm"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/1200x/63/4e/d5/634ed52c8a9c9dfcee81f451bcc8ec0c.jpg')",
        }}
      />

      <Header />

      {/* Content container with no extra background or padding */}
      <main className="flex-grow py-10 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Customers Say
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition"
            >
              <p className="text-lg font-semibold mb-2">{review.name}</p>
              <p className="text-gray-700 text-sm">{review.feedback}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
