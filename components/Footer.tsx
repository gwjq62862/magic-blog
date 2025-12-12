import { Instagram, Twitter, Youtube } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full max-w-5xl mx-auto flex flex-col items-center gap-8 py-16 mt-16 border-t border-white/10">
      {" "}
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {" "}
        <a
          className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
          href="#"
        >
          Privacy Policy
        </a>{" "}
        <a
          className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
          href="#"
        >
          Terms of Service
        </a>{" "}
        <a
          className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
          href="#"
        >
          Contact
        </a>{" "}
      </div>{" "}
      <div className="flex justify-center gap-6">
        {" "}
        <a
          className="text-gray-400 hover:text-white transition-colors"
          href="#"
        >
          {" "}
           <Twitter/>{" "}
        </a>{" "}
        <a
          className="text-gray-400 hover:text-white transition-colors"
          href="#"
        >
       <Instagram/>
        </a>{" "}
        <a
          className="text-gray-400 hover:text-white transition-colors"
          href="#"
        >
          {" "}
       <Youtube/>
        </a>{" "}
      </div>{" "}
      <p className="text-gray-500 text-sm">
        © 2024 Magic Mind Blog. All rights reserved.
      </p>{" "}
    </footer>
  );
};

export default Footer;
