"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import Image from "next/image";
import instagram from "../../public/instagram.png";
import facebook from "../../public/facebook.png";
import x from "../../public/twitter.png";
import shorts from "../../public/youtubeShorts.png";
import linkedin from "../../public/linkedin.png";
import youtube from "../../public/youtube.png";
import { RootState } from "@/redux/store";
import { handleForm, togglePlatform } from "@/redux/formSlice";
import { Jaro } from "next/font/google";
import { tabAction } from "@/redux/tabSlice";

const jaro = Jaro({ subsets: ["latin"] });

const HeroSection = () => {
  const dispatch = useDispatch();
  const selectedPlatforms = useSelector(
    (state: RootState) => state.form.selectedPlatforms
  );

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userInput = inputRef.current?.value || "";
    dispatch(handleForm({ userInput, selectedPlatforms }));
    dispatch(tabAction.handleTabCaption());
  };

  const handlePlatformClick = (platform: string) => {
    dispatch(togglePlatform(platform));
  };

  return (
    <div className="min-h-screen w-screen bg-black border-t-[1px] border-white">
      <form
        className="w-screen px-5 flex flex-col items-center py-7"
        onSubmit={handleSubmit}
      >
        <div className="w-full text-white flex flex-col gap-6">
          <p
            style={{
              WebkitTextStroke: "0.1px #8E2DE2",
              color: "white",
              fontWeight: "bold",
            }}
            className={` ${jaro.className} text-3xl text-center`}
          >
            AI Caption Generator
          </p>
          <textarea
            ref={inputRef}
            className="min-h-[200px] rounded-md px-3 py-3 bg-black border-[1px] border-[#8E2DE2] placeholder:text-white shadow-md focus:border-[2px] focus:border-[#8E2DE2] focus:outline-none"
            placeholder="Input Script Or A line Explaining Your Post...."
          />
        </div>
        <div className="text-white flex flex-col gap-5 py-10 w-full">
          <p
            style={{
              WebkitTextStroke: "0.1px #8E2DE2",
              color: "white",
              fontWeight: "bold",
            }}
            className={`${jaro.className} text-4xl text-center`}
          >
            Select Platform(s)
          </p>
          <div className="flex flex-wrap gap-7 justify-center w-full">
            <div
              onClick={() => handlePlatformClick("instagram")}
              className={`cursor-pointer w-[70px] h-[70px] relative ${
                selectedPlatforms.includes("instagram")
                  ? "border-2 border-[#8E2DE2] rounded-md"
                  : ""
              }`}
            >
              <Image src={instagram} alt="instagram" layout="fill" />
            </div>
            <div
              onClick={() => handlePlatformClick("facebook")}
              className={`cursor-pointer w-[70px] h-[70px] relative ${
                selectedPlatforms.includes("facebook")
                  ? "border-2 border-[#8E2DE2] rounded-md"
                  : ""
              }`}
            >
              <Image src={facebook} alt="facebook" layout="fill" />
            </div>
            <div
              onClick={() => handlePlatformClick("twitter")}
              className={`cursor-pointer w-[70px] h-[70px] relative ${
                selectedPlatforms.includes("twitter")
                  ? "border-2 border-[#8E2DE2] rounded-md"
                  : ""
              }`}
            >
              <Image src={x} alt="Twitter(x)" layout="fill" />
            </div>
            <div
              onClick={() => handlePlatformClick("youtube shorts")}
              className={`cursor-pointer w-[70px] h-[70px] relative ${
                selectedPlatforms.includes("youtube shorts")
                  ? "border-2 border-[#8E2DE2] rounded-md"
                  : ""
              }`}
            >
              <Image src={shorts} alt="youtube shorts" layout="fill" />
            </div>
            <div
              onClick={() => handlePlatformClick("linkedin")}
              className={`cursor-pointer w-[70px] h-[70px] relative ${
                selectedPlatforms.includes("linkedin")
                  ? "border-2 border-[#8E2DE2] rounded-md"
                  : ""
              }`}
            >
              <Image src={linkedin} alt="linkedin" layout="fill" />
            </div>
            <div
              onClick={() => handlePlatformClick("youtube")}
              className={`cursor-pointer w-[70px] h-[70px] relative ${
                selectedPlatforms.includes("youtube")
                  ? "border-2 border-[#8E2DE2] rounded-md"
                  : ""
              }`}
            >
              <Image src={youtube} alt="youtube" layout="fill" />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full h-[50px] bg-[#8E2DE2] text-white flex justify-center items-center rounded-md mt-5 mb-7"
        >
          <p>Generate Caption</p>
        </button>
      </form>
    </div>
  );
};

export default HeroSection;
