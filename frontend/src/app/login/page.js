"use client";
import Link from "next/link";
import React, { useState } from "react";
import PublicApi from "@/axios/PublicApi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUsers } from "@/redux/AuthSlice";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function submitForm(data) {
    try {
      setLoading(true);
      const response = await PublicApi.post("api/login", data);
      if (response.status === 200) {
        toast.success(response.data.message, { autoClose: 1000 });
        dispatch(
          setUsers({
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            token: response.data.token,
            isLoggedIn: true,
          })
        );
        setLoading(false);
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Something went wrong", {
        autoClose: 1000,
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="relative w-full max-w-md rounded-xl overflow-hidden glow-border-wrapper">
        <div className="relative z-10 bg-gray-800 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-cyan-400 text-center mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-5 py-3 rounded-xl bg-gray-900 border border-cyan-400 placeholder-cyan-300 text-white focus:outline-none"
                {...register("email", {
                  required: "Email is Required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-5 py-3 rounded-xl bg-gray-900 border border-cyan-400 placeholder-cyan-300 text-white focus:outline-none"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 5,
                    message: "Must be 5 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cyan-400 text-gray-900 font-semibold cursor-pointer hover:bg-cyan-300 transition"
            >
              Login
            </button>
            <div className="text-center mt-4">
              <Link
                href="/signup"
                className="text-sm text-cyan-300 hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
