"use client";

import { useState } from "react";
import Image from "next/image";
import { Jaro } from 'next/font/google';
import axios from 'axios';
import instagram from "../../public/instagram.png";
import x from "../../public/twitter.png";


const jaro = Jaro({ subsets: ["latin"] });

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post('/api/contact-us', formData);
      if (response.data.success) {
        setShowSuccessModal(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const Modal = ({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black border-2 border-[#8E2DE2] p-6 rounded-lg max-w-sm w-full mx-4">
        {children}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-[#8E2DE2] text-white py-2 rounded hover:bg-[#7B25C3] transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-black px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center py-7">
        <h1 
          style={{
            WebkitTextStroke: "0.1px #8E2DE2",
            color: "white",
            fontWeight: "bold",
          }}
          className={`${jaro.className} text-3xl sm:text-4xl md:text-5xl text-center mb-8`}
        >
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
          <div className="mb-4">
            <label htmlFor="name" className="block text-white mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-md px-3 py-2 bg-black border-[1px] border-[#8E2DE2] text-white placeholder:text-gray-400 shadow-md focus:border-[2px] focus:border-[#8E2DE2] focus:outline-none"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md px-3 py-2 bg-black border-[1px] border-[#8E2DE2] text-white placeholder:text-gray-400 shadow-md focus:border-[2px] focus:border-[#8E2DE2] focus:outline-none"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-white mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-md px-3 py-2 bg-black border-[1px] border-[#8E2DE2] text-white placeholder:text-gray-400 shadow-md focus:border-[2px] focus:border-[#8E2DE2] focus:outline-none resize-y min-h-[150px]"
              placeholder="Your Message"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[50px] bg-[#8E2DE2] text-white flex justify-center items-center rounded-md mt-5 mb-7 hover:bg-[#7B25C3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <p className="text-lg">{isLoading ? "Sending..." : "Send Message"}</p>
          </button>
        </form>

        <div className="text-white text-center mt-8">
          <h2 className={`${jaro.className} text-2xl mb-4`}>Connect With Us</h2>
          <div className="flex justify-center space-x-4">
          <a
                
                href={"https://www.instagram.com/booleanix/"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[40px] h-[40px] relative"
              >
                <Image src={instagram.src} alt={"instagram"} layout="fill" />
              </a>
              <a
                
                href={"https://twitter.com/booleanix"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[40px] h-[40px] relative"
              >
                <Image src={x.src} alt={"twitter(x)"} layout="fill" />
              </a>
              
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <Modal onClose={() => setShowSuccessModal(false)}>
          <h2 className={`${jaro.className} text-2xl text-white mb-4`}>Success!</h2>
          <p className="text-white">Your message has been sent successfully. We&apos;ll get back to you soon.</p>
        </Modal>
      )}

      {showErrorModal && (
        <Modal onClose={() => setShowErrorModal(false)}>
          <h2 className={`${jaro.className} text-2xl text-white mb-4`}>Error</h2>
          <p className="text-white">There was an error sending your message. Please try again later.</p>
        </Modal>
      )}
    </div>
  );
}