import Steps from "@/components/Steps";
import LandingPage from "../components/LandingPage";
import Link from "next/link";
import {
  FaEye,
  FaPenFancy,
  FaParagraph,
  FaTools,
} from "react-icons/fa";
import WhyCard from "@/components/WhyCard";

export default function Home() {
  return (
    <div className="bg-gray-900 text-white">
      <LandingPage />

      <div className="text-center my-10">
        <h1 className="text-3xl font-bold">Writing Tools</h1>
        <p className="text-gray-400">Enhance your writing with our smart tools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 mb-12">
        <Link href={"/dashboard/grammer-checker"}>
          <FeatureCard
            icon={<FaPenFancy size={32} className="text-green-400 mx-auto" />}
            title="Grammar Checker"
            desc="Identify and correct grammar, punctuation, and spelling mistakes in real-time."
          />
        </Link>
        <Link href={"/dashboard/paraphraser"}>
          <FeatureCard
            icon={<FaParagraph size={32} className="text-purple-400 mx-auto" />}
            title="Paraphraser"
            desc="Rewrite sentences while preserving their original meaning for improved clarity."
          />
        </Link>
         {/* <Link href={"/dashboard/grammer-checker"}>
          <FeatureCard
            icon={<FaRobot size={32} className="text-red-600 mx-auto" />}
            title="AI Checker"
            desc="Detect AI-generated content to ensure authenticity and human-like writing."
          />
        </Link> */}
        <Link href={"/dashboard/summarization"}>
          <FeatureCard
            icon={<FaEye size={32} className="text-blue-400 mx-auto" />}
            title="Summarization"
            desc="Quickly generate concise summaries of long texts to capture the main ideas."
          />
        </Link>

        <FeatureCard
          icon={
            <FaTools
              size={32}
              className="text-gray-400 mx-auto animate-pulse"
            />
          }
          title="More Tools Coming Soon"
          desc="We're working on new features. Stay tuned!"
        />
      </div>

      {/* About Us Section */}
      <section className="bg-gray-800 py-12 px-6 text-center">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          We are a team of developers, linguists, and educators passionate about
          improving written communication. Our platform provides cutting-edge
          tools powered by AI to help students, professionals, and content
          creators write better, faster, and smarter.
        </p>
      </section>

      <Steps />
      <WhyCard />
    </div>
  );
}

// Reusable components
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-4 border border-gray-700 bg-gray-800 rounded-lg shadow-md text-center hover:shadow-lg transition">
      {icon}
      <h2 className="text-xl font-semibold mt-2 text-white">{title}</h2>
      <p className="text-sm text-gray-300 mt-1">{desc}</p>
    </div>
  );
}
