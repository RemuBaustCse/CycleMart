import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Feel the Freedom on Two Wheels",
    description: "Discover the joy of cycling with our top-quality bicycles for all terrains.",
    image: "https://i.ibb.co.com/pSvf4Ys/cyclist-riding-bmx-bike-107420-65715.jpg",
  },
  {
    id: 2,
    title: "Eco-Friendly Transportation",
    description: "Make a positive impact on the environment—choose cycling every day.",
    image: "https://i.ibb.co.com/cXRrQg9C/cyclist-riding-bicycle-nature.jpg",
  },
  {
    id: 3,
    title: "Built for Adventure",
    description: "Explore mountains, trails, and more with our durable and stylish bikes.",
    image: "https://i.ibb.co.com/B2yN3MQ8/cyclist-sunny-day-bike-adventure-travel-photo.jpg",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleViewAll = () => {
    navigate("/products"); 
  };

  return (
    <div className="w-11/12 mx-auto h-[60vh] relative overflow-hidden rounded-lg shadow-lg">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold">{slide.title}</h2>
            <p className="mt-3 text-lg md:text-xl">{slide.description}</p>
            <button
              onClick={handleViewAll}
              className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-5 rounded-lg shadow-md border-2 border-yellow-300 hover:border-yellow-400 transition duration-300"
            >
              Explore
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
