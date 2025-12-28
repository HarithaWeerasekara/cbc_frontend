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
        group w-[260px] rounded-xl
        bg-white
        border border-gray-200
        shadow-sm
        transition-all duration-300
        hover:shadow-md
        hover:-translate-y-0.5
        focus:outline-none focus:ring-2 focus:ring-[#9D6777]
      "
    >
      {/* Image */}
      <div className="relative w-full h-[210px] overflow-hidden rounded-t-xl bg-gray-100">
        <img
          src={image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="
            w-full h-full object-cover
            transition-transform duration-500
            group-hover:scale-[1.03]
          "
          onError={(e) => (e.currentTarget.src = "/placeholder.webp")}
        />

        {/* Trending */}
        {product.trending && (
          <span className="
            absolute top-3 left-3
            bg-[#542C3C]
            text-white text-[11px] font-medium
            px-3 py-1 rounded-full
          ">
            Trending
          </span>
        )}

        {/* Discount */}
        {hasDiscount && (
          <span className="
            absolute top-3 right-3
            bg-[#9D6777]
            text-white text-[11px] font-semibold
            px-3 py-1 rounded-full
          ">
            {discountPercent}% OFF
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
            text-[15px] font-semibold text-gray-800
            truncate
            transition-colors
            group-hover:text-[#542C3C]
          "
          title={product.name}
        >
          {product.name}
        </h3>

        <div className="mt-3 flex justify-center items-center gap-2">
          <span className="text-lg font-bold text-[#542C3C]">
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
