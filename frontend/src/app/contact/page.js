"use client";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import PublicApi from "@/axios/PublicApi";
import { toast } from "react-toastify";

function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function SubmitForm(data) {
    try {
      const response = await PublicApi.post("api/contact", data);
      if (response.status === 200) {
        toast.success("Feedback Submitted Successfully", { autoClose: 1000 });
        reset();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        autoClose: 1000,
      });
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen p-4 gap-6 bg-gray-900 text-white">
      <div className="md:w-[50%] lg:w-[60%] w-full p-6 rounded-lg bg-gray-800">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Connect
          </span>{" "}
          With Us and Share your thoughts
        </h2>

        <section className="bg-gray-700 py-10 px-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-white">Why Choose Us</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "AI-Powered Accuracy",
              "Free to Use",
              "User-Friendly Interface",
            ].map((text, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <FaCheckCircle className="text-green-400 text-xl shrink-0" />
                <p className="text-gray-300 font-medium break-words">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="md:w-[50%] lg:w-[40%] w-full">
        <form
          onSubmit={handleSubmit(SubmitForm)}
          className="bg-gray-800 h-full p-6 rounded-lg shadow-md"
        >
          <h3 className="text-white text-2xl font-semibold mb-6">
            Get in Touch
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                className="rounded p-2 border border-blue-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                {...register("name", {
                  required: "Name is Required",
                })}
              />
              {errors.name && (
                <span className="text-red-400 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-300 mb-1">Email Address</label>
              <input
                type="email"
                className="rounded p-2 border border-blue-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <span className="text-red-400 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label id="number" className="text-sm text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                id="number"
                type="text"
                className="rounded p-2 border border-blue-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                {...register("number")}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-300 mb-1">Location</label>
              <input
                type="text"
                className="rounded p-2 border border-blue-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                {...register("location")}
              />
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <label className="text-sm text-gray-300 mb-1">
              What Kind of Topic
            </label>
            <select
              defaultValue=""
              {...register("topic", {
                required: "Topic is required",
              })}
              className="rounded p-2 border border-blue-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="" disabled>
                Choose From the Following
              </option>
              <option value="Writing">Writing</option>
              <option value="API">API</option>
              <option value="Complaint">Complaint</option>
              <option value="Feedback">Feedback</option>
            </select>
            {errors.topic && (
              <span className="text-red-400 text-sm">
                {errors.topic.message}
              </span>
            )}
          </div>

          <div className="flex flex-col mt-4">
            <label className="text-sm text-gray-300 mb-1">
              Describe your problem
            </label>
            <textarea
              {...register("description")}
              className="rounded p-2 border border-blue-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              rows={6}
            ></textarea>
          </div>

          <button
            type="submit"
            className="mt-6 w-full py-2 rounded bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
