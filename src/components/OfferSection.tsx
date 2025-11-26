import { Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OfferSection = () => {
  const navigate = useNavigate();
  const handleOfferClick = ()=>{
    navigate(`/products?category='discount'`)
  }
  return (
    <div className="w-11/12 mx-auto bg-yellow-50 mb-12 border-2 border-yellow-50 py-12 px-4 md:px-20 text-center shadow-md rounded-2xl mt-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Side - Text */}
        <div className="text-black md:text-left">
          <h2 className="text-3xl md:text-4xl text-yellow-400 font-bold mb-2">
            Limited Time Offer!
          </h2>
          <p className="text-lg md:text-xl font-medium text-gray-700 mb-4">
            Get <span className="text-yellow-400 font-bold">25% OFF</span> on all specific Bikes!
          </p>
          <p className="text-md text-gray-600">
            Grab yours before it’s gone!
          </p>
        </div>

        {/* Right Side - Call to Action */}
        <div>
          <button onClick={handleOfferClick} className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full flex items-center gap-2 shadow-lg transition-all duration-300">
            <Gift className="w-5 h-5" />
            Claim Offer
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferSection;
