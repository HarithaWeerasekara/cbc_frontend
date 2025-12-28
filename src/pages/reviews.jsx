import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function ReviewsPage() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");

  const reviews = [
    {
      name: "Kamini Devage",
      feedback:
        "I’ve been using Crystel Beauty Clear products for two months now, and my skin has never felt better.",
    },
    {
      name: "Yasidu Weerasinghe",
      feedback:
        "Excellent customer service and fast delivery. The quality is outstanding.",
    },
    {
      name: "Samudrika Nanayakkara",
      feedback:
        "Gentle on skin and smells amazing. Highly recommended local brand.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#fdfbff] via-[#f6e9f3] to-[#eef2ff] text-[#3f1d33]">
      <Header />

      <main className="flex-grow px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-16">

          {/* 🎬 CINEMATIC HEADER */}
          <section className="text-center animate-fadeIn">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Loved by Our Customers
            </h1>
            <p className="mt-4 text-gray-600 max-w-xl mx-auto">
              Real voices. Real results. Trusted by customers across Sri Lanka.
            </p>
          </section>

          {/* ⭐ REVIEWS GRID */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="
                  bg-white/90 backdrop-blur
                  border border-gray-200
                  rounded-2xl p-6
                  shadow-sm
                  transition-all duration-500
                  hover:-translate-y-1
                  hover:shadow-md
                  animate-slideUp
                "
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 text-white flex items-center justify-center font-bold">
                    {review.name.charAt(0)}
                  </div>
                </div>

                <p className="font-semibold text-lg">{review.name}</p>
                <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                  “{review.feedback}”
                </p>
              </div>
            ))}
          </section>

          {/* ✍️ WRITE REVIEW */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            
            {/* FORM */}
            <div className="bg-white/90 backdrop-blur rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">
                Write a Review
              </h2>

              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                  w-full mb-3 px-4 py-2 rounded-lg
                  border border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-pink-400
                "
              />

              <textarea
                placeholder="Share your experience..."
                rows="4"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="
                  w-full px-4 py-2 rounded-lg
                  border border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-pink-400
                "
              />

              <button
                disabled
                className="
                  mt-4 w-full py-2 rounded-lg
                  bg-gradient-to-r from-pink-600 to-purple-600
                  text-white font-semibold
                  opacity-60 cursor-not-allowed
                "
              >
                Submit (Coming Soon)
              </button>
            </div>

            {/* 👀 LIVE PREVIEW */}
            <div className="animate-fadeIn">
              <p className="text-sm text-gray-500 mb-2">Live Preview</p>

              <div className="
                bg-white/95 backdrop-blur
                border border-dashed border-gray-300
                rounded-2xl p-6
                shadow-sm
              ">
                <div className="mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                    {name ? name.charAt(0) : "?"}
                  </div>
                </div>

                <p className="font-semibold text-lg">
                  {name || "Your Name"}
                </p>

                <p className="text-sm text-gray-700 mt-2 leading-relaxed italic">
                  “{feedback || "Your review will appear here as you type..." }”
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
