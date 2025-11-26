import { useGetAllUserQuery, useChangeUserStatusMutation } from "../../../redux/features/admin/adminApi";
import { useState } from "react";
import { toast } from "react-toastify";
import { TShowUser } from "./types/showUser.type";
import Loader from "../../../components/Loader";

const UserManagement = () => {
  const { data, error, isLoading, refetch } = useGetAllUserQuery(undefined);
  const [changeUserStatus, { isLoading: isUpdating }] = useChangeUserStatusMutation();
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7;

  const users = data?.data || [];
  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginatedUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  if (isLoading || isUpdating)
    return (
      <div className="flex h-full w-full justify-center items-center content-center">
        <Loader />
      </div>
    );

  if (error) return <p className="text-center text-red-500">Error fetching users</p>;

  const handleStatusToggle = async (userId: string, isBlocked: boolean) => {
    setLoadingUserId(userId);
    try {
      const response = await changeUserStatus({ userId, isBlocked: !isBlocked }).unwrap();
      if (response) {
        toast.success(`User ${!isBlocked ? "deactivated" : "activated"} successfully`);
      }
      refetch();
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("Failed to update user status");
    } finally {
      setLoadingUserId(null);
    }
  };

  return (
    <div className="container mx-auto p-6 text-black">
      <h1 className="text-3xl font-bold text-center mb-6 pb-2">User Management</h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-black">
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user: TShowUser, index: number) => (
              <tr key={user._id}>
                <td className="p-3">{(currentPage - 1) * usersPerPage + index + 1}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  {user.isBlocked ? (
                    <span className="px-2 py-1 text-sm font-semibold bg-red-500 text-white rounded">
                      Deactivated
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-sm font-semibold bg-green-500 text-white rounded">
                      Active
                    </span>
                  )}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleStatusToggle(user._id, user.isBlocked)}
                    className={`btn btn-sm ${
                      user.isBlocked
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white font-bold px-3 py-1 rounded transition duration-300 shadow-lg ${
                      loadingUserId === user._id ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loadingUserId === user._id}
                  >
                    {loadingUserId === user._id
                      ? "Processing..."
                      : user.isBlocked
                      ? "Activate"
                      : "Deactivate"}
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
          className="btn bg-yellow-400 text-white border-none btn-sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`btn bg-yellow-400 text-white border-none  btn-sm ${currentPage === i + 1 ? "btn-active bg-yellow-600" : ""}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="btn bg-yellow-400 text-white border-none btn-sm"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
