import mountain from "../assets/mountain.png";
import roadBike from "../assets/roadBike.png";
import hybridBike from "../assets/hybridBike.png";
import BMXBike from "../assets/BMXBike.png";
import electric from "../assets/electric.png";
import baby from "../assets/baby.png";
import { Link, useNavigate } from "react-router-dom";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const handleClickCategory = (title: string) => {
    navigate(`/products?category=${encodeURIComponent(title)}`);
  };

  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-screen-xl">
        {/* Heading Section */}
        <div className="max-w-screen-md text-center mx-auto mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">
            <span className="text-yellow-400">Explore</span> Our Exclusive
            Categories
          </h2>
          <p className="sm:text-lg text-gray-600 mt-4">
            Discover a variety of bicycles designed for all terrains and riders,
            ensuring quality, comfort, and performance.
          </p>
        </div>

        {/* Bike Categories Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              image: mountain,
              title: "Mountain",
              desc: "Conquer rough terrains with our durable and high-performance mountain bikes.",
            },
            {
              image: roadBike,
              title: "Road",
              desc: "Speed through city streets with lightweight and aerodynamic road bikes.",
            },
            {
              image: hybridBike,
              title: "Hybrid",
              desc: "Perfect for commuting and leisure rides with a balance of comfort and speed.",
            },
            {
              image: BMXBike,
              title: "BMX",
              desc: "Perform tricks and stunts with our sturdy and agile BMX bikes.",
            },
            {
              image: electric,
              title: "Electric",
              desc: "Effortless riding with battery-powered assistance for longer journeys.",
            },
            {
              image: baby,
              title: "Baby",
              desc: "Enhance your ride with top-quality helmets, gloves, and gear.",
            },
          ].map((item, index) => (
            <div
              onClick={() => handleClickCategory(item.title)}
              key={index}
              className="group cursor-pointer border-2 border-yellow-400 p-5 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-3xl hover:border-4"
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="mb-4 w-full h-52 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Link to="/products">
            <button className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-lg rounded-lg shadow-lg transition transform hover:scale-105">
              View All
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
