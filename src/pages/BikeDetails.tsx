/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleProductsQuery } from "../redux/features/products/products";

const BikeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetSingleProductsQuery(id);

  const handleCheckout = (id: any) => {
    navigate(`/products/checkout/${id}`);
  };

  const { name, brand, description, price, quantity, type, image } =
    data?.data || {};

  const inStock = quantity > 0;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-black font-semibold text-xl py-10">
        Failed to load bike details. Please try again.
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center mt-10">Bi-Cycle <span className="text-yellow-400">Details</span></h1>
      <div className="m-10 flex justify-center items-center bg-white">
      <div className="w-11/12 p-12 border-2 border-yellow-300 hover:border-yellow-400 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src={image}
              alt={name}
              className="w-full max-w-lg rounded-lg shadow-md"
            />
          </div>

          {/* Bike Details */}
          <div>
            <h1 className="text-2xl text-black mb-4  border-yellow-400 pb-2">
              {name}
            </h1>
            <p className="text-lg text-black mb-4">{description}</p>

            <div className="grid grid-cols-2 gap-4 text-lg text-black">
              <p className="font-semibold">
                <span className="text-black">Price:</span>{" "}
                <span className="text-black">{price} Taka</span>
              </p>
              <p className="font-semibold">
                <span className="text-black">Type:</span> {type}
              </p>
              <p className="font-semibold">
                <span className="text-black">Brand:</span> {brand}
              </p>
              <p
                className={`font-semibold ${inStock ? "text-green-500" : "text-red-500"}`}
              >
                {inStock ? "In Stock" : "Out of Stock"}
              </p>
              <p className="font-semibold">
                <span className="text-black">Available:</span> {quantity}
              </p>
            </div>

            {/* Call-to-action Button */}
            <button
              onClick={() => handleCheckout(id)}
              className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg shadow-md border-2 border-yellow-300 hover:border-yellow-400"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default BikeDetails;
