/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleProductsQuery } from "../redux/features/products/products";
import { useMakeOrderMutation } from "../redux/features/orders/ordersApi";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Checkout = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetSingleProductsQuery(id);
  const [makeOrder, { isLoading }] = useMakeOrderMutation();
  // Extract product details
  const name = data?.data?.name;

  // console.log(data, "proooooduct data");

  // Initialize form data state
  const [formData, setFormData] = useState({
    products: id || "",
    totalPrice: 0,
    quantity: 1,
    paymentMethod: "bKash",
    address: "",
    phone: "",
  });

  // Separate totalPrice state
  const [totalPrice, setTotalPrice] = useState(0);

  // Update totalPrice dynamically
  useEffect(() => {
    if (!data?.data) return;

    const price = data.data.price || 0;
    const discount = data.data.discount || 0;

    const finalUnitPrice =
      discount > 0 ? price - (price * discount) / 100 : price;
    const newTotalPrice = formData.quantity * finalUnitPrice;

    setTotalPrice(newTotalPrice);
  }, [data, formData.quantity]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center content-center">
        <Loader></Loader>
      </div>
    );
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await makeOrder({ ...formData, totalPrice }).unwrap();
      if (response) {
        toast.success("Order placed successfully");
        navigate("/products");
      }
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || "Failed to place order. Please try again.";
      toast.error(errorMessage);
      console.error("Error placing order:", err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-8 border border-yellow-300 hover:border-yellow-400"
      >
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8 border-b border-yellow-300 pb-4">
          Checkout
        </h2>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="label font-semibold text-gray-700">Product Name</label>
            <input
              type="text"
              defaultValue={name}
              readOnly
              className="input input-bordered w-full border-yellow-300 focus:border-yellow-400 text-black bg-gray-100"
            />
          </div>
  
          {/* Quantity */}
          <div>
            <label className="label font-semibold text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="input input-bordered w-full border-yellow-300 focus:border-yellow-400 text-black"
            />
          </div>
  
          {/* Total Price */}
          <div>
            <label className="label font-semibold text-gray-700">Total Price</label>
            <input
              type="number"
              readOnly
              value={totalPrice}
              className="input input-bordered w-full border-yellow-300 focus:border-yellow-400 text-black bg-gray-100"
            />
          </div>
  
          {/* Payment Method */}
          <div>
            <label className="label font-semibold text-gray-700">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
              className="select select-bordered w-full border-yellow-300 focus:border-yellow-400 text-black"
            >
              <option value="bKash">bKash</option>
              <option value="Nagad">Nagad</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Card">Card</option>
            </select>
          </div>
  
          {/* Address */}
          <div className="md:col-span-2">
            <label className="label font-semibold text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="input input-bordered w-full border-yellow-300 focus:border-yellow-400 text-black"
            />
          </div>
  
          {/* Phone */}
          <div className="md:col-span-2">
            <label className="label font-semibold text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="input input-bordered w-full border-yellow-300 focus:border-yellow-400 text-black"
            />
          </div>
        </div>
  
        <button
          type="submit"
          className="mt-8 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg shadow-md border-2 border-yellow-300 hover:border-yellow-400 transition duration-200"
        >
          Place Order
        </button>
      </form>
    </div>
  );
  
};

export default Checkout;
