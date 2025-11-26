import { useNavigate } from "react-router-dom";
import { TProductCard } from "./productCard.type";

const ProductsCard = ({ product }: { product: TProductCard }) => {
  const navigate = useNavigate();
  const { name, brand, price, image, type, description, _id, discount } = product;

  const handleViewDetail = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="relative w-70 bg-white border border-yellow-300 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Discount Badge */}
      {discount > 0 && (
        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
          {discount}% OFF
        </span>
      )}

      <figure className="h-44 w-full flex items-center justify-center overflow-hidden p-4">
        <img
          src={image}
          alt={name}
          className="max-h-full max-w-full rounded-md object-contain"
        />
      </figure>

      <div className="p-2 space-y-2 text-black">
        <h2 className="font-bold text-lg truncate">{name}</h2>
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>

        <div className="text-sm flex flex-wrap justify-between">
          <p className="font-medium">
            <span className="font-semibold text-gray-700">Brand:</span> {brand}
          </p>
          <p className="italic">
            <span className="font-semibold text-gray-700">Type:</span> {type}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-yellow-600 text-lg font-bold">{price}৳</p>
          <button
            onClick={() => handleViewDetail(_id)}
            className="bg-yellow-400 border-none hover:bg-yellow-500 text-white text-sm font-medium px-4 py-1 rounded-lg transition"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
