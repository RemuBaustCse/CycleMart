import React, { useEffect, useState } from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "What types of bicycles do you sell?",
    answer: "We offer a wide range of bicycles including mountain bikes, road bikes, hybrid bikes, kids bikes, and electric bikes.",
  },
  {
    question: "Do your bikes come with a warranty?",
    answer: "Yes, all of our bicycles come with a standard 1-year warranty covering manufacturing defects.",
  },
  {
    question: "How can I choose the right bike size?",
    answer: "You can refer to our size chart on each product page or contact our support team for personalized assistance.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept credit/debit cards, mobile banking (e.g. bKash, Nagad), and Cash on Delivery (COD) in select areas.",
  },
  {
    question: "Do you offer servicing or repairs?",
    answer: "Yes, we offer professional servicing at our partnered service centers. You can schedule a service online.",
  },
];

const Faq: React.FC = () => {
  useEffect(() => {
    document.title = "FAQ | Bi-Cycle Store";
  }, []);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-11/12 mx-auto py-10">
      {/* Banner Image */}
      <div className="mb-8 flex justify-center">
        <img 
          src="https://www.prioritybicycles.com/cdn/shop/articles/Bicyle-Locls-Hero_large.jpg?v=1743450988" 
          alt="Bicycle FAQ Banner" 
          className="rounded-2xl shadow-lg w-full  object-cover"
        />
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-8 text-black">
        Frequently Asked <span className="text-yellow-400">Questions</span>
      </h2>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-yellow-500 rounded-xl shadow-md bg-white">
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left text-black font-semibold focus:outline-none"
            >
              <span>{item.question}</span>
              <span className="text-yellow-500">{openIndex === index ? '-' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-700">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
