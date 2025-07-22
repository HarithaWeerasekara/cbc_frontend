import { FaFacebook, FaYoutube, FaInstagram, FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
import Header from "../components/header";
import Footer from "../components/footer";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen flex flex-col text-[#521B41] overflow-x-hidden">
      {/* Background Image with Blur */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center blur-sm"
        style={{
          backgroundImage: "url('https://i.pinimg.com/1200x/63/4e/d5/634ed52c8a9c9dfcee81f451bcc8ec0c.jpg')",
        }}
      />

      <Header />

      <main className="flex-grow px-4 py-6 sm:py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-center mb-4 bg-white/80 rounded-xl py-4 shadow-md">
            Contact Crystel Beauty Clear
          </h2>

          {/* Contact Cards */}
          <div className="space-y-6">
            {/* Contact Method Card */}
            {[
              {
                icon: <FaFacebook className="text-blue-600 text-2xl" />,
                title: "Facebook",
                description:
                  "We have a growing Facebook page where we share updates, promotions, and beauty tips.",
                linkText: "facebook.com/crystelbeautyclear",
                link: "https://facebook.com/crystelbeautyclear",
                color: "text-blue-600",
              },
              {
                icon: <FaYoutube className="text-red-600 text-2xl" />,
                title: "YouTube",
                description:
                  "Check out our YouTube channel for tutorials, reviews, and behind-the-scenes content.",
                linkText: "youtube.com/@crystelbeautyclear",
                link: "https://youtube.com/@crystelbeautyclear",
                color: "text-red-600",
              },
              {
                icon: <FaInstagram className="text-pink-500 text-2xl" />,
                title: "Instagram",
                description:
                  "Follow us on Instagram for daily inspiration, product features, and customer stories.",
                linkText: "instagram.com/crystelbeautyclear",
                link: "https://instagram.com/crystelbeautyclear",
                color: "text-pink-500",
              },
              {
                icon: <FaEnvelope className="text-green-600 text-2xl" />,
                title: "Email",
                description: "You can reach us anytime via email. We usually respond within 24 hours.",
                linkText: "crystelbeautyclear@gmail.com",
                link: "mailto:crystelbeautyclear@gmail.com",
                color: "text-green-600",
              },
              {
                icon: <FaPhone className="text-indigo-600 text-2xl" />,
                title: "Phone",
                description: "Call or text us for quick support or product inquiries.",
                linkText: "+94 75 286 8126",
                color: "text-indigo-600",
              },
              {
                icon: <FaWhatsapp className="text-green-600 text-2xl" />,
                title: "WhatsApp",
                description: "Message us directly on WhatsApp for instant support and order info.",
                linkText: "Chat via WhatsApp",
                link: "https://wa.me/94752868126?text=Hi%20Crystel%20Beauty%20Clear!",
                color: "text-green-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4 flex items-start gap-4"
              >
                <div className="min-w-[32px]">{item.icon}</div>
                <div className="flex-1">
                  <p className="font-semibold text-lg">{item.title}</p>
                  <p className="text-sm sm:text-base mb-1">{item.description}</p>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${item.color} underline text-sm sm:text-base`}
                    >
                      {item.linkText}
                    </a>
                  ) : (
                    <p className={`${item.color} font-medium text-sm sm:text-base`}>
                      {item.linkText}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
