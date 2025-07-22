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
    <div className="relative min-h-screen flex flex-col text-[#521B41]">
      {/* Fullscreen background with blur */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center filter blur-sm"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/1200x/63/4e/d5/634ed52c8a9c9dfcee81f451bcc8ec0c.jpg')",
        }}
      />

      <Header />

      <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-lg shadow-md transition hover:shadow-lg"
            >
              <p className="text-base sm:text-lg font-semibold mb-2">
                {review.name}
              </p>
              <p className="text-sm sm:text-base text-gray-800">
                {review.feedback}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
