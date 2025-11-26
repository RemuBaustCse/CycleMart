const testimonials = [
  {
    name: "Alex Johnson",
    image: "https://readymadeui.com/team-2.webp",
    rating: 5,
    review:
      "Absolutely love my new road bike! Smooth ride, lightweight, and excellent build quality. Highly recommend!",
  },
  {
    name: "Maria Lopez",
    image: "https://readymadeui.com/team-3.webp",
    rating: 4,
    review:
      "The mountain bike is sturdy and handles rough trails well. Just wish the seat was a bit more comfortable.",
  },
  {
    name: "James Smith",
    image: "https://readymadeui.com/team-4.webp",
    rating: 5,
    review:
      "Great value for the price! My hybrid bike is perfect for city commuting and weekend rides.",
  },
  {
    name: "James Smith",
    image: "https://readymadeui.com/team-4.webp",
    rating: 5,
    review:
      "Great value for the price! My hybrid bike is perfect for city commuting and weekend rides.",
  },
];

const TestimonialCard = ({
  name,
  image,
  rating,
  review,
}: {
  name: string;
  image: string;
  rating: number;
  review: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center p-6 border-2 border-yellow-400 rounded-lg shadow-lg">
      <img
        src={image}
        alt={name}
        className="w-24 h-24 rounded-full border-2 border-yellow-400"
      />
      <h4 className="mt-4 text-lg font-bold text-black">{name}</h4>
      <div className="flex mt-2">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 ${
              index < rating ? "fill-yellow-400" : "fill-gray-300"
            }`}
            viewBox="0 0 14 13"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
          </svg>
        ))}
      </div>
      <p className="mt-3 text-sm text-black">{review}</p>
    </div>
  );
};

export default function Testimonials() {
  return (
    <div className="my-10 w-11/12  mx-auto px-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-black">What Our <span className="text-yellow-400">Riders</span> Say</h2>
        <p className="text-sm mt-4 text-black">
          See what our customers have to say about their biking experience.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
}
