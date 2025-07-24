import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FiUserX, FiUserCheck } from "react-icons/fi";  // Import icons
import Loader from "../../components/Loader";

export default function UserManagerPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/all-users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const userList = Array.isArray(response.data)
                ? response.data
                : response.data.users || [];

            setUsers(userList);
        } catch (error) {
            console.error("❌ Error fetching users:", error);
            toast.error("Failed to load users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const toggleBlockUser = async (userId, isCurrentlyDisabled) => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("No authentication token found.");
            return;
        }

        try {
            const endpoint = isCurrentlyDisabled ? "unblock" : "block";
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/${endpoint}/${userId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            toast.success(`User ${isCurrentlyDisabled ? "unblocked" : "blocked"} successfully`);
            fetchUsers();
        } catch (error) {
            console.error(`❌ Error toggling user:`, error);
            toast.error(error?.response?.data?.message || "Action failed");
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#fef2f2] px-2 py-4 sm:px-4">
            {loading ? (
                <Loader />
            ) : (
                <div className="overflow-x-auto">
                    <h1 className="text-xl sm:text-2xl font-bold text-[#be123c] mb-4 text-center">
                        User Management Panel
                    </h1>
                    <table className="min-w-full bg-white rounded-xl shadow-lg text-sm sm:text-base">
                        <thead className="bg-[#fda4af] text-[#7f1d1d] uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-3 text-left">User ID</th>
                                <th className="px-6 py-3 text-left">Username</th>
                                <th className="px-6 py-3 text-left">Email</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-[#4a413c]">
                            {users.map((user) => (
                                <tr key={user._id} className="border-b border-[#fcd34d] hover:bg-[#fff1f2] transition">
                                    <td className="px-6 py-4">{user._id}</td>
                                    <td className="px-6 py-4">{user.username || 'N/A'}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleBlockUser(user._id, user.isDisabled)}
                                            className={`flex items-center gap-2 transition px-4 py-2 rounded text-white font-medium ${
                                                user.isDisabled
                                                    ? "bg-green-500 hover:bg-green-600"
                                                    : "bg-[#be123c] hover:bg-[#7f1d1d]"
                                            }`}
                                        >
                                            {user.isDisabled ? (
                                                <>
                                                    <FiUserCheck size={18} /> Unblock User
                                                </>
                                            ) : (
                                                <>
                                                    <FiUserX size={18} /> Block User
                                                </>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}
