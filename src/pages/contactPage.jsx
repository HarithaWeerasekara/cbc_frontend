import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";
import Header from "../components/header";
import Footer from "../components/footer";

export default function ContactPage() {
  const contacts = [
    {
      icon: <FaFacebook />,
      title: "Facebook",
      description:
        "Follow our Facebook page for updates, offers, and beauty tips.",
      linkText: "facebook.com/crystelbeautyclear",
      link: "https://facebook.com/crystelbeautyclear",
      color: "text-blue-600",
    },
    {
      icon: <FaYoutube />,
      title: "YouTube",
      description:
        "Watch tutorials, reviews, and behind-the-scenes content.",
      linkText: "youtube.com/@crystelbeautyclear",
      link: "https://youtube.com/@crystelbeautyclear",
      color: "text-red-600",
    },
    {
      icon: <FaInstagram />,
      title: "Instagram",
      description:
        "Daily inspiration, product highlights, and customer stories.",
      linkText: "instagram.com/crystelbeautyclear",
      link: "https://instagram.com/crystelbeautyclear",
      color: "text-pink-600",
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      description: "Reach us anytime. We usually reply within 24 hours.",
      linkText: "crystelbeautyclear@gmail.com",
      link: "mailto:crystelbeautyclear@gmail.com",
      color: "text-emerald-600",
    },
    {
      icon: <FaPhone />,
      title: "Phone",
      description: "Call or text us for quick support.",
      linkText: "+94 75 286 8126",
      color: "text-indigo-600",
    },
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      description: "Instant support and order inquiries via WhatsApp.",
      linkText: "Chat on WhatsApp",
      link: "https://wa.me/94752868126?text=Hi%20Crystel%20Beauty%20Clear!",
      color: "text-green-600",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#fdfbff] via-[#f6e9f3] to-[#eef2ff] text-[#3f1d33]">
      <Header />

      <main className="flex-grow px-4 py-10">
        <div className="max-w-5xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Contact Crystel Beauty Clear
            </h1>
            <p className="mt-3 text-gray-600 text-sm sm:text-base">
              We’re here to help. Reach us through any of the channels below.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contacts.map((item, index) => (
              <div
                key={index}
                className="
                  bg-white/90 backdrop-blur
                  border border-gray-200
                  rounded-2xl p-5
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-md
                "
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`text-2xl ${item.color}`}
                  >
                    {item.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-600 mt-1 mb-2">
                      {item.description}
                    </p>

                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm font-medium ${item.color} hover:underline`}
                      >
                        {item.linkText}
                      </a>
                    ) : (
                      <p className={`text-sm font-medium ${item.color}`}>
                        {item.linkText}
                      </p>
                    )}
                  </div>
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
