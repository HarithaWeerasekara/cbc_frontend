import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const image = product.images?.[0] || "/placeholder.webp";

  const hasDiscount =
    product.labeledPrice && product.price < product.labeledPrice;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.labeledPrice - product.price) / product.labeledPrice) * 100
      )
    : 0;

  return (
    <Link
      to={`/overview/${product.productId}`}
      aria-label={`View details for ${product.name}`}
      className="
        group relative w-[260px] rounded-2xl
        bg-white/90 backdrop-blur
        border border-gray-200
        shadow-sm
        transition-all duration-500
        hover:-translate-y-1
        hover:shadow-[0_0_25px_rgba(236,72,153,0.35)]
        focus:outline-none focus:ring-2 focus:ring-pink-400
      "
    >
      {/* Neon glow layer */}
      <div
        className="
          absolute -inset-[1px] rounded-2xl
          bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500
          opacity-0 blur-md
          group-hover:opacity-70
          transition duration-500
          -z-10
        "
      />

      {/* Image */}
      <div className="relative w-full h-[210px] overflow-hidden rounded-t-2xl bg-gray-100">
        <img
          src={image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="
            w-full h-full object-cover
            transition-transform duration-700
            group-hover:scale-110
          "
          onError={(e) => (e.currentTarget.src = "/placeholder.webp")}
        />

        {/* Trending badge */}
        {product.trending && (
          <span className="
            absolute top-3 left-3
            bg-gradient-to-r from-purple-600 to-pink-600
            text-white text-[11px] font-semibold
            px-3 py-1 rounded-full
            shadow-md
          ">
            🔥 Trending
          </span>
        )}

        {/* Discount badge */}
        {hasDiscount && (
          <span className="
            absolute top-3 right-3
            bg-pink-600 text-white
            text-[11px] font-bold
            px-3 py-1 rounded-full
            shadow-md
          ">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 text-center">
        <p className="text-[11px] text-gray-400 tracking-wide mb-1">
          {product.productId}
        </p>

        <h3
          className="
            text-[15px] font-semibold text-gray-900
            truncate
            group-hover:text-pink-600
            transition-colors
          "
          title={product.name}
        >
          {product.name}
        </h3>

        <div className="mt-3 flex justify-center items-center gap-2">
          <span className="text-lg font-bold text-pink-700">
            LKR {product.price?.toFixed(2)}
          </span>

          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              LKR {product.labeledPrice?.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
