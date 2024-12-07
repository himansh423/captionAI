"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import Image from "next/image";
import instagram from "../../public/instagram.png";
import facebook from "../../public/facebook.png";
import x from "../../public/twitter.png";
import shorts from "../../public/youtubeShorts.png";
import linkedin from "../../public/linkedin.png";
import youtube from "../../public/youtube.png";
import { RootState } from "@/redux/store";
import { handleForm, togglePlatform } from "@/redux/formSlice";
import { Jaro } from 'next/font/google';
import { tabAction } from "@/redux/tabSlice";

const jaro = Jaro({ subsets: ["latin"] });

const HeroSection = () => {
  const dispatch = useDispatch();
  const selectedPlatforms = useSelector(
    (state: RootState) => state.form.selectedPlatforms
  );
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlatforms.length === 0) {
      setError("Please select at least one platform");
      return;
    }
    setError("");
    const userInput = inputRef.current?.value || "";
    dispatch(handleForm({ userInput, selectedPlatforms }));
    dispatch(tabAction.handleTabCaption());
  };

  const handlePlatformClick = (platform: string) => {
    dispatch(togglePlatform(platform));
    setError("");
  };

  return (
    <div className="min-h-screen w-full bg-black px-4 sm:px-6 lg:px-8">
      <form
        className="max-w-4xl mx-auto flex flex-col items-center py-7"
        onSubmit={handleSubmit}
      >
        <div className="w-full text-white flex flex-col gap-6">
          <p
            style={{
              WebkitTextStroke: "0.1px #8E2DE2",
              color: "white",
              fontWeight: "bold",
            }}
            className={`${jaro.className} text-2xl sm:text-3xl md:text-4xl text-center`}
          >
            AI Caption Generator
          </p>
          <textarea
            ref={inputRef}
            className="min-h-[150px] sm:min-h-[200px] w-full rounded-md px-3 py-3 bg-black border-[1px] border-[#8E2DE2] text-white placeholder:text-gray-400 shadow-md focus:border-[2px] focus:border-[#8E2DE2] focus:outline-none resize-y"
            placeholder="Enter your video script or a brief description (1-2 lines) to generate the perfect AI-powered caption!"
          />
        </div>
        <div className="text-white flex flex-col gap-5 py-8 w-full">
          <p
            style={{
              WebkitTextStroke: "0.1px #8E2DE2",
              color: "white",
              fontWeight: "bold",
            }}
            className={`${jaro.className} text-2xl sm:text-3xl md:text-4xl text-center`}
          >
            Select Platform(s)
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center w-full">
            {[
              { name: "instagram", src: instagram },
              { name: "facebook", src: facebook },
              { name: "twitter", src: x },
              { name: "youtube shorts", src: shorts },
              { name: "linkedin", src: linkedin },
              { name: "youtube", src: youtube },
            ].map((platform) => (
              <div
                key={platform.name}
                onClick={() => handlePlatformClick(platform.name)}
                className={`cursor-pointer w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] relative ${
                  selectedPlatforms.includes(platform.name)
                    ? "border-2 border-[#8E2DE2] rounded-md"
                    : ""
                }`}
              >
                <Image src={platform.src} alt={platform.name} layout="fill" />
              </div>
            ))}
          </div>
        </div>
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        <button
          type="submit"
          className="w-full sm:w-2/3 md:w-1/2 h-[50px] bg-[#8E2DE2] text-white flex justify-center items-center rounded-md mt-5 mb-7 hover:bg-[#7B25C3] transition-colors"
        >
          <p className="text-lg">Generate Caption</p>
        </button>
      </form>
    </div>
  );
};

export default HeroSection;