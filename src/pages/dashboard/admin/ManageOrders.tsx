
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useGetAllOrdersQuery } from "../../../redux/features/admin/adminApi";
import {
  useChangeOrderStatusMutation,
  useDeleteOrderMutation,
} from "../../../redux/features/orders/ordersApi";
import { TOrder } from "./types/order.types";
import Loader from "../../../components/Loader";

const ManageOrders = () => {
  const [deleteOrder] = useDeleteOrderMutation();
  const { data, error, isLoading, refetch } = useGetAllOrdersQuery(undefined);
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [changeOrderStatus, { isLoading: isChangingStatus }] =
    useChangeOrderStatusMutation();

  const statusTypes = ["Pending", "Paid", "Shipped", "Completed", "Cancelled"];
  const modalRef = useRef<HTMLDialogElement>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const orders = data?.data || [];
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center content-center h-screen">
        <Loader />
      </div>
    );

  if (error)
    return <p className="text-center text-red-500">Error fetching orders</p>;

  const handleChangeStatus = async (orderId: string, newStatus: string) => {
    try {
      await changeOrderStatus({
        orderId,
        status: { status: newStatus },
      }).unwrap();
      toast.success(`Order status updated to ${newStatus}`);
      refetch();
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status.");
    }
  };

  const openDeleteModal = (orderId: string) => {
    setSelectedOrderId(orderId);
    modalRef.current?.showModal();
  };

  const handleDeleteOrder = async () => {
    if (!selectedOrderId) return;
    setLoadingOrderId(selectedOrderId);
    try {
      await deleteOrder(selectedOrderId).unwrap();
      toast.success("Order deleted successfully");
      refetch();
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete order");
    } finally {
      setLoadingOrderId(null);
      setSelectedOrderId(null);
      modalRef.current?.close();
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Manage Orders</h1>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3">#</th>
              <th className="p-3">Address</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Total Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order: TOrder, index: number) => (
              <tr key={order._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="p-3">{order.address}</td>
                <td className="p-3">{order.phone}</td>
                <td className="p-3">${order.totalPrice}</td>
                <td className="p-3">
                  <select
                    onChange={(e) =>
                      handleChangeStatus(order._id, e.target.value)
                    }
                    value={order.status}
                    className="select select-bordered"
                    disabled={isChangingStatus}
                  >
                    {statusTypes.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => openDeleteModal(order._id)}
                    className="btn btn-sm btn-error"
                    disabled={loadingOrderId === order._id}
                  >
                    {loadingOrderId === order._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          className="btn bg-yellow-400 text-white border-none btn-sm "
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`btn bg-yellow-400 text-white border-none btn-sm ${currentPage === i + 1 ? "btn-active bg-yellow-600" : ""}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="btn text-white border-none bg-yellow-400 btn-sm"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Delete</h3>
          <p className="py-4">Are you sure you want to delete this order?</p>
          <div className="modal-action">
            <button onClick={handleDeleteOrder} className="btn btn-error">
              Confirm
            </button>
            <button onClick={() => modalRef.current?.close()} className="btn">
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageOrders;
