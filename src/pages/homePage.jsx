import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductsPage from "./client/productsPage";
import ProductOverview from "./client/productOverview";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkout";
import Footer from "../components/footer";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#ECDCDF] text-[#521B41]">
      <Header />

      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <div className="px-4 py-10 sm:px-6 md:px-12 max-w-6xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6">
                  Welcome to Crystel Beauty Clear
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-center mb-6">
                  Since 2001, we’ve been delivering natural, effective beauty solutions. With over{" "}
                  <strong>20 branches</strong> across Sri Lanka — from{" "}
                  <span className="font-medium">
                    Galle, Anuradhapura, Bandarawela, Ampara, Badulla, Jaffna, Matara, Kurunegala
                  </span>{" "}
                  and more — we bring radiant skin to every region.
                </p>

                <p className="text-base sm:text-lg md:text-xl text-center mb-6">
                  We import the <strong>best ingredients</strong> from Japan, France, Thailand, and Korea.
                  Our premium line is also <strong>exported worldwide</strong> to earn foreign currency and support
                  Sri Lanka’s economy 💵.
                </p>

                <p className="text-base sm:text-lg italic text-center mb-8">
                  “Our mission is to make every Sri Lankan glow with confidence — naturally and beautifully.”
                </p>

                <div className="flex justify-center">
                  <a
                    href="/products"
                    className="bg-[#521B41] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#702659] transition"
                  >
                    Shop Our Products
                  </a>
                </div>
              </div>
            }
          />

          <Route path="/products" element={<ProductsPage />} />
          <Route path="/overview/:id" element={<ProductOverview />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/*"
            element={
              <div className="w-full text-center py-20">
                <h1 className="text-xl font-bold">404 - Page Not Found</h1>
              </div>
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
