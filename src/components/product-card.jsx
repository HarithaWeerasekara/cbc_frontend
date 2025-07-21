import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/overview/${product.productId}`}
      className="w-[250px] h-[360px] m-4 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition duration-300"
    >
      {/* Product Image */}
      <img
        src={product.images?.[0]}
        alt={product.name}
        className="w-full h-[200px] object-cover rounded-t-xl"
      />

      {/* Product Details */}
      <div className="p-4 text-center">
        <p className="text-xs text-gray-400 mb-1">{product.productId}</p>

        <p className="text-lg font-semibold text-[#9B3C6C] truncate">
          {product.name}
        </p>

        <p className="mt-2 text-base font-bold text-gray-800">
          LKR {product.price?.toFixed(2)}
          {product.price < product.labeledPrice && (
            <span className="text-sm text-gray-400 line-through ml-2">
              LKR {product.labeledPrice?.toFixed(2)}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}
