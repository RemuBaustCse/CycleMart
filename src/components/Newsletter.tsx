import React, { useState } from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Here you'd normally send the email to your backend or an API
    console.log("Subscribed email:", email);
    setSubmitted(true);
    setEmail('');
  };

  return (
    <div className="w-11/12 mx-auto py-10 bg-yellow-50 mt-8 rounded-xl shadow-md border border-yellow-500">
      <div className="text-center px-4">
        <h2 className="text-3xl font-bold mb-2 text-black">Subscribe to our Newsletter</h2>
        <p className="text-gray-600 mb-6">Get the latest bike updates, offers, and news directly to your inbox.</p>
        {submitted ? (
          <p className="text-green-600 font-medium">Thanks for subscribing! 🎉</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-3 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none w-full sm:w-auto"
              required
            />
            <button
              type="submit"
              className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
