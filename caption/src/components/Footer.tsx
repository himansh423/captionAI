"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-[#8E2DE2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Link
              href="/privacy-policy"
              className="hover:text-[#8E2DE2] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="hover:text-[#8E2DE2] transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/contact-us"
              className="hover:text-[#8E2DE2] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Booleanix - AI Caption Generator.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
