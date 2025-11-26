"use client";

const features = [
  {
    icon: "🚴‍♂️",
    title: "Fast Delivery",
    description: "Get your bike delivered to your doorstep in record time across the country.",
  },
  {
    icon: "🛠️",
    title: "Free Assembly",
    description: "We provide free assembly services or detailed video instructions with tools.",
  },
  {
    icon: "👨‍🔧",
    title: "Expert Support",
    description: "Our team is available 24/7 to assist with sizing, setup, and maintenance queries.",
  },
  {
    icon: "⭐",
    title: "Premium Quality",
    description: "We offer only top-tier, durable bicycles from trusted global brands.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-8">
      <div className="w-11/12 mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10"> <span className="text-yellow-400">Why </span>Choose Us</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
