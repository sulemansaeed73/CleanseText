"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

function Header() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { token, name } = useSelector((state) => state.auth);

  if (!hasMounted) return null;

  return (
    <header className="w-full bg-gray-900 shadow-md py-4 px-6">
      <nav className="max-w-7xl mx-auto flex justify-end items-center gap-6">
        <Link href="/">
          <span className="text-gray-300 hover:text-blue-400 transition font-medium cursor-pointer">
            Home
          </span>
        </Link>
        <Link href="/contact">
          <span className="text-gray-300 hover:text-blue-400 transition font-medium cursor-pointer">
            Contact
          </span>
        </Link>

        {token ? (
          <Link href="/profile">
            <span className="text-white bg-blue-600 px-4 py-1.5 rounded-md hover:bg-blue-700 transition font-medium">
              {name}
            </span>
          </Link>
        ) : (
          <>
            <Link href="/login">
              <span className="text-gray-300 hover:text-blue-400 transition font-medium cursor-pointer">
                Login
              </span>
            </Link>
            <Link href="/signup">
              <span className="text-white bg-blue-600 px-4 py-1.5 rounded-md hover:bg-blue-700 transition font-medium">
                Sign Up
              </span>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
