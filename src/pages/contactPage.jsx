import { FaFacebook, FaYoutube, FaInstagram, FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
import Header from "../components/header";



export default function ContactPage() {
  return (
    
     <div>
        <Header className=" " />
      

    <div className="min-h-screen bg-[#ECDCDF] py-8 px-4 text-[#521B41]">

     

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Crystel Beauty Clear</h2>

        <div className="space-y-6 text-lg">
          {/* Facebook */}
          <div className="flex items-start gap-4">
            <FaFacebook className="text-blue-600 text-2xl mt-1" />
            <div>
              <p className="font-semibold">Facebook</p>
              <p>We have a growing Facebook page where we share updates, promotions, and beauty tips. Follow us and stay connected!</p>
              <a href="https://facebook.com/crystelbeautyclear" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                facebook.com/crystelbeautyclear
              </a>
            </div>
          </div>

          {/* YouTube */}
          <div className="flex items-start gap-4">
            <FaYoutube className="text-red-600 text-2xl mt-1" />
            <div>
              <p className="font-semibold">YouTube</p>
              <p>Check out our YouTube channel for tutorials, reviews, and behind-the-scenes content.</p>
              <a href="https://youtube.com/@crystelbeautyclear" target="_blank" rel="noopener noreferrer" className="text-red-600 underline">
                youtube.com/@crystelbeautyclear
              </a>
            </div>
          </div>

          {/* Instagram */}
          <div className="flex items-start gap-4">
            <FaInstagram className="text-pink-500 text-2xl mt-1" />
            <div>
              <p className="font-semibold">Instagram</p>
              <p>Follow us on Instagram for daily inspiration, product features, and customer stories.</p>
              <a href="https://instagram.com/crystelbeautyclear" target="_blank" rel="noopener noreferrer" className="text-pink-500 underline">
                instagram.com/crystelbeautyclear
              </a>
            </div>
          </div>

          {/* Gmail */}
          <div className="flex items-start gap-4">
            <FaEnvelope className="text-green-600 text-2xl mt-1" />
            <div>
              <p className="font-semibold">Email</p>
              <p>You can reach us anytime via email. We usually respond within 24 hours.</p>
              <a href="mailto:crystelbeautyclear@gmail.com" className="text-green-600 underline">
                crystelbeautyclear@gmail.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <FaPhone className="text-indigo-600 text-2xl mt-1" />
            <div>
              <p className="font-semibold">Phone</p>
              <p>Call or text us for quick support or product inquiries.</p>
              <p className="text-indigo-600">+94 75 286 8126</p>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="flex items-start gap-4">
            <FaWhatsapp className="text-green-600 text-2xl mt-1" />
            <div>
              <p className="font-semibold">WhatsApp</p>
              <p>Message us directly on WhatsApp for instant support and order info.</p>
              <a
                href="https://wa.me/0752862126?text=Hi%20Crystel%20Beauty%20Clear!"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 underline"
              >
                Chat via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
