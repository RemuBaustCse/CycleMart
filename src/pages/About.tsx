import { useEffect } from "react";

const About = () => {
  useEffect(() => {
      document.title = "About | Bi-Cycle Store";
    }, []);
  return (
    <div className="w-11/12  mx-auto min-h-screen m-12 flex justify-center items-center">
      <div className=" rounded-lg ">
        <h1 className="text-5xl font-extrabold text-black text-center mb-8 border-yellow-400 pb-2">
          About <span className="text-yellow-500">Our Bicycle Shop</span>
        </h1>

        <p className="text-lg text-black text-center mb-8">
          Welcome to <strong>Bi-CycleStore</strong>, your one-stop destination
          for high-quality bicycles and accessories. Whether you're a
          professional cyclist or a casual rider, we provide the best selection
          for all terrains and styles.
        </p>

        {/* Mission & Vision Section */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8 mt-8">
          <div className="p-6 bg-yellow-100 rounded-lg shadow-md border border-yellow-400">
            <h2 className="text-3xl font-bold text-black mb-3">
              🚀 Our Mission
            </h2>
            <p className="text-black">
              Our mission is to inspire and empower people to enjoy cycling by
              offering premium bicycles, excellent service, and a strong riding
              community.
            </p>
          </div>

          <div className="p-6 bg-yellow-100 rounded-lg shadow-md border border-yellow-400">
            <h2 className="text-3xl font-bold text-black mb-3">
              🌎 Our Vision
            </h2>
            <p className="text-black">
              We envision a world where cycling is the top choice for
              transportation, fitness, and adventure—creating healthier
              lifestyles and greener cities.
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-12">
          <h2 className="text-4xl font-bold text-black text-center mb-6 border-b-4 border-yellow-400 pb-2">
            Why Choose <span className="text-yellow-500">Us?</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300">
              <h3 className="text-2xl font-semibold mb-3 text-black">
                🏆 Top-Quality Bicycles
              </h3>
              <p className="text-black">
                We provide the best brands, ensuring top performance, comfort,
                and durability for every ride.
              </p>
            </div>

            <div className="p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300">
              <h3 className="text-2xl font-semibold mb-3 text-black">
                💡 Expert Guidance
              </h3>
              <p className="text-black">
                Our experienced team helps you find the perfect bicycle,
                tailored to your needs and preferences.
              </p>
            </div>

            <div className="p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300">
              <h3 className="text-2xl font-semibold mb-3 text-black">
                🚴 Community & Events
              </h3>
              <p className="text-black">
                Join our cycling community, participate in events, and be part
                of an exciting biking lifestyle.
              </p>
            </div>
          </div>
        </div>

        {/* Contact & Store Information */}
        <div className="mt-12 text-center">
          <h2 className="text-4xl font-bold text-black mb-4 border-b-4 border-yellow-400 pb-2">
            Visit Our Store
          </h2>
          <p className="text-xl text-black">
            <strong>
              🚲 Cycle World BD, House #12, Road #5, Sector #7, Uttara, Dhaka-1230, Bangladesh
              <br /> 📞 Phone: +880 1712-345678 ✉️ Email: support@cycleworldbd.com
            </strong>{" "}
            – Open daily from <strong>9 AM - 8 PM</strong>.
          </p>
          <p className="text-lg text-black mt-2">
            Need help? Call us at{" "}
            <span className="text-yellow-500 font-semibold">+8801700000000</span>
            or email{" "}
            <span className="text-yellow-500 font-semibold">
              hhh@gmail.com
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
