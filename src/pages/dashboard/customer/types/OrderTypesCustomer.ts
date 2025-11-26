export type TOrderCustomer = {
  _id: string;
  name: string;
  image: string;
  products: string;
  quantity: string;
  address: string;
  phone: string;
  totalPrice: string;
  status:"Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
};
