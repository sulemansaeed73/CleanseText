"use client";
import React, { useState, useEffect } from "react";
import TokenApi from "@/axios/PublicApi";
import PublicApi from "@/axios/PublicApi";
import { toast, ToastContainer } from "react-toastify";
import { FiEdit, FiSave, FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/AuthSlice";
import { useRouter } from "next/navigation";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    number: "",
  });
  const { id } = useSelector((state) => state.auth);
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await PublicApi.get(`/api/displayuser/${id}`);
        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch user", {
          autoClose: 1000,
        });
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      const response = await TokenApi.patch(`/api/update-user/${id}`, user);
      if (response.status === 200) {
        toast.success("User Updated Successfully", {
          autoClose: 1000,
          position: "top-right",
        });
        setUser(response.data);
        setEditMode(false);
      }
    } catch (error) {
      toast.error("Try Again", {
        autoClose: 1000,
      });
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12 relative text-white">
      <ToastContainer />
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 text-red-400 hover:text-red-600 flex items-center gap-1"
      >
        <FiLogOut className="text-lg" />
        Logout
      </button>

      <div className="w-full max-w-md bg-gray-800 shadow-md rounded-xl p-8 border border-gray-700 relative">
        <button
          onClick={() => (editMode ? handleSave() : setEditMode(true))}
          className="absolute top-4 right-4 text-blue-400 hover:text-blue-600"
        >
          {editMode ? <FiSave size={20} /> : <FiEdit size={20} />}
        </button>

        <h2 className="text-2xl font-semibold text-center text-blue-400 mb-6">
          User Profile
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              disabled={!editMode}
              onChange={handleInputChange}
              className={`w-full rounded-md border p-2 bg-gray-700 text-white ${
                editMode
                  ? "border-blue-400 focus:outline-blue-400"
                  : "border-gray-600"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              disabled={!editMode}
              onChange={handleInputChange}
              className={`w-full rounded-md border p-2 bg-gray-700 text-white ${
                editMode
                  ? "border-blue-400 focus:outline-blue-400"
                  : "border-gray-600"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Number
            </label>
            <input
              type="text"
              name="number"
              value={user.number}
              disabled={!editMode}
              onChange={handleInputChange}
              className={`w-full rounded-md border p-2 bg-gray-700 text-white ${
                editMode
                  ? "border-blue-400 focus:outline-blue-400"
                  : "border-gray-600"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
