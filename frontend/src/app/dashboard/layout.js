"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";

function DashBoardLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen relative bg-gray-900 text-white">
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64 bg-gray-800 border-r border-gray-700 p-4 shadow-md
          transform transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block md:min-h-screen 
        `}
      >
        <h2 className="text-center text-2xl font-semibold text-amber-400 mb-6">
          Writing Tools
        </h2>
        <div className="flex flex-col gap-4">
          <Link
            onClick={() => setMenuOpen(false)}
            href="/dashboard/paraphraser"
            className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-3 rounded shadow block text-left"
          >
            Paraphraser
          </Link>
          <Link
            onClick={() => setMenuOpen(false)}
            href="/dashboard/summarization"
            className="text-left bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-medium py-2 px-3 rounded shadow"
          >
            Summarization
          </Link>
          <Link
            onClick={() => setMenuOpen(false)}
            href="/dashboard/grammer-checker"
            className="text-left bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded shadow"
          >
            Grammar Checker
          </Link>
        </div>
      </aside>

      {/* Hamburger icon */}
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="md:hidden fixed top-3 left-1 z-50 bg-gray-800 text-white p-2 rounded shadow border border-gray-700"
      >
        <FaBars size={20} />
      </button>

      {/* Main content */}
      <main className="w-full bg-gray-900 text-white">{children}</main>
    </div>
  );
}

export default DashBoardLayout;
