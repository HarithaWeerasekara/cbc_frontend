import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/overview/${product.productId}`}
      className="w-[250px] m-4 h-[360px] bg-white rounded-xl shadow-xl border-1 border-gray-300 hover:shadow-lg transition duration-300"
    >
      <img
        className="w-full h-[200px] object-cover rounded-t-xl"
        src={product.images[0]}
        alt={product.name}
      />
      <div className="p-4 text-center">
        <p className="text-xs text-gray-400 mb-1">{product.productId}</p>
        <p className="text-lg font-semibold text-[#9B3C6C] truncate">{product.name}</p>
        <p className="mt-2 text-base font-bold text-gray-800">
          LKR {product.price.toFixed(2)}{" "}
          {product.price < product.labeledPrice && (
            <span className="text-sm text-gray-400 line-through ml-1">
              LKR {product.labeledPrice.toFixed(2)}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}
