import { useState } from "react";

const ManageAddresses = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      street: "123 Main Street",
      city: "Dhaka",
      zip: "1205",
      country: "Bangladesh",
    },
    {
      id: 2,
      name: "Office",
      street: "56 Corporate Ave",
      city: "Chattogram",
      zip: "4100",
      country: "Bangladesh",
    },
  ]);

  const handleDelete = (id: number) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-yellow-400 pb-2">
        Address Book
      </h2>

      {addresses.length === 0 ? (
        <p className="text-gray-600">No addresses added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="border border-yellow-300 bg-white p-5 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold text-black mb-2">
                {address.name}
              </h3>
              <p className="text-gray-700">{address.street}</p>
              <p className="text-gray-700">
                {address.city}, {address.zip}
              </p>
              <p className="text-gray-700">{address.country}</p>

              <div className="mt-4 flex gap-3">
                <button className="px-4 py-1 rounded bg-yellow-400 text-black hover:bg-yellow-500 font-medium">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* You can add an "Add New Address" form or modal below */}
    </div>
  );
};

export default ManageAddresses;
