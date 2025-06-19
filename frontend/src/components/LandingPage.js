"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
function LandingPage() {
  return (
    <div className="relative">
      <Image
        src={"/img/Banner.png"}
        className="w-full h-[400px] md:h-[700px]"
        width={1536}
        height={1024}
        alt="landing page"
      />
      <div className="absolute bottom-5 right-4 md:right-5 md:bottom-35 lg:right-70 flex flex-col md:flex-row items-center justify-center gap-4 z-10">
        <Link href="/dashboard">
        <button className="px-12 md:py-2.5 py-1.5 text-white font-semibold rounded-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
          Try Now
        </button>
        </Link>
        <Link href="/upload-file">
        <button className="px-9 md:px-12 md:py-2.5 py-1.5 text-white font-semibold rounded-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
          Upload File
        </button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
