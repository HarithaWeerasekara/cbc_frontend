import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const image = product.images?.[0] || "/placeholder.webp";
  const hasDiscount = product.price < product.labeledPrice;

  return (
    <Link
      to={`/overview/${product.productId}`}
      aria-label={`View details for ${product.name}`}
      className="group w-[260px] rounded-2xl bg-white border border-gray-200 shadow-sm 
                 hover:shadow-xl transition-all duration-300 focus:outline-none 
                 focus:ring-2 focus:ring-pink-400"
    >
      {/* Image */}
      <div className="relative w-full h-[210px] overflow-hidden rounded-t-2xl bg-gray-100">
        <img
          src={image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => (e.currentTarget.src = "/placeholder.webp")}
        />

        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            SALE
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 text-center">
        <p className="text-[11px] text-gray-400 tracking-wide mb-1">
          {product.productId}
        </p>

        <h3
          className="text-[15px] font-semibold text-gray-900 truncate"
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
