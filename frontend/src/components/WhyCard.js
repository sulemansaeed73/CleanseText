import { FaCheckCircle } from "react-icons/fa";

function Why({ text }) {
  return (
    <div className="flex items-center justify-center gap-3 p-4 bg-gray-800 rounded-lg shadow">
      <FaCheckCircle className="text-green-500" />
      <p className="text-gray-200 font-medium">{text}</p>
    </div>
  );
}

export default function WhyCard() {
  return (
    <section className="bg-gray-900 py-12 px-6 text-center text-white">
      <h2 className="text-2xl font-bold mb-6">Why Choose Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Why text="AI-Powered Accuracy" />
        <Why text="Free to Use" />
        <Why text="User-Friendly Interface" />
      </div>
    </section>
  );
}
