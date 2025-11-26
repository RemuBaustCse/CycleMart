export type TOrder = {
    _id: string;
    products: string;
    totalPrice: string;
    quantity: string;
    paymentMethod: string;
    address: string;
    phone: string;
    status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled"; // Correct type
  };
  
