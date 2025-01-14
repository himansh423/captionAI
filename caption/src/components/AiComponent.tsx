"use client";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { Jaro } from 'next/font/google';
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FaInstagram, FaRegCopy } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { ImYoutube } from "react-icons/im";
import { MdFacebook } from "react-icons/md";
import { SiLinkedin, SiYoutubeshorts } from "react-icons/si";
import { tabAction } from "@/redux/tabSlice";

const jaro = Jaro({ subsets: ["latin"] });

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

interface PlatformCaptions {
  instagram: string;
  facebook: string;
  twitter: string;
  "youtube shorts": string;
  linkedin: string;
  youtube: string;
}

export default function AiComponent() {
  const [captions, setCaptions] = useState<PlatformCaptions>({
    instagram: "",
    facebook: "",
    twitter: "",
    "youtube shorts": "",
    linkedin: "",
    youtube: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null);
  const dispatch = useDispatch();

  const { userInput, selectedPlatforms } = useSelector(
    (state: RootState) => state.form
  );

  const constructPrompt = () => {
    return `
You are a social media expert specializing in creating engaging, platform-specific captions. 

Input Content: "${userInput}"

Platform Requirements:
1. Instagram: 
   - Aim for 500-700 characters
   - Use atleast 15 relevant hashtags
   - Engaging and creative tone
   - Use emojis appropriately

2. Facebook:
   - 250-300 characters
   - Conversational and informative
   - Use mild, friendly language
   - Include relevant hashtags

3. Twitter (X):
   - Strictly 270 characters limit
   - Concise and punchy
   - Use trending hashtags
   - Direct and impactful language

4. YouTube Shorts:
   - Strictly 70 characters Limit 
   - Catchy and descriptive
   - Use hook words
   - Include 1-2 relevant hashtags

5. LinkedIn:
   - Professional and formal
   - 250-300 characters
   - Focus on value proposition
   - Minimal hashtags
   - Business-oriented language

6. YouTube:
   - Strictly 70 characters Limit for title 
   - Descriptive and keyword-rich
   - Clear value proposition
   - Use search-friendly language

Requested Platforms: [${selectedPlatforms.join(", ")}]

Please generate captions only for the requested platforms, tailoring the tone, length, and style to each platform's unique characteristics. Focus on converting the input content into engaging, shareable captions that capture attention and encourage interaction.
`;
  };

  const generateCaptions = useCallback(async () => {
    if (!userInput || selectedPlatforms.length === 0) return;

    setIsLoading(true);

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: constructPrompt() }] }],
        generationConfig,
        safetySettings,
      });

      const text =
        result.response.candidates?.[0]?.content?.parts?.[0]?.text || "";

      const parsedCaptions = parseCaptions(text, selectedPlatforms);
     
      setCaptions(parsedCaptions);
    } catch (error) {
      console.error("Error generating captions:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userInput, selectedPlatforms]);

  const parseCaptions = (
    text: string,
    platforms: string[]
  ): PlatformCaptions => {
    const defaultCaptions: PlatformCaptions = {
      instagram: "",
      facebook: "",
      twitter: "",
      "youtube shorts": "",
      linkedin: "",
      youtube: "",
    };

    platforms.forEach((platform) => {
      const platformRegex = new RegExp(
        `\\*\\*${platform}:\\*\\*\\s*([\\s\\S]+?)(?=\\*\\*\\w+:|$)`,
        "i"
      );
      const match = text.match(platformRegex);

      if (match) {
        defaultCaptions[platform.toLowerCase() as keyof PlatformCaptions] = match[1].trim();
      }
    });

    return defaultCaptions;
  };

  useEffect(() => {
    generateCaptions();
  }, [generateCaptions]);

  const copyCaption = useCallback((platform: string, caption: string) => {
    navigator.clipboard.writeText(caption);
    setCopiedPlatform(platform);

    setTimeout(() => {
      setCopiedPlatform(null);
    }, 3000);
  }, []);

  const renderPlatformSection = (
    platform: keyof PlatformCaptions,
    Icon: React.ElementType
  ) => {
    if (!selectedPlatforms.includes(platform)) return null;

    const caption = captions[platform.toLowerCase() as keyof PlatformCaptions];
    
    return (
      <div
        key={platform}
        className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] min-h-full px-4 flex flex-col gap-6 items-center border-[1px] rounded-md border-[#8E2DE2] py-5"
      >
        <div className="text-2xl sm:text-3xl md:text-4xl flex items-center gap-2">
          <div className="mt-1">
            <Icon />
          </div>
          <p
            style={{
              WebkitTextStroke: "0.1px #8E2DE2",
              color: "white",
              fontWeight: "bold",
            }}
            className={jaro.className}
          >
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </p>
        </div>
        <p className="text-sm sm:text-base">{caption || "No caption generated"}</p>
        <button
          onClick={() => copyCaption(platform, caption)}
          className="w-full h-[40px] flex justify-center gap-2 items-center text-white bg-[#8E2DE2] rounded-md cursor-pointer hover:bg-[#7B25C3] transition-colors"
        >
          <div className="mt-1">
            <FaRegCopy />
          </div>
          <p>Copy Caption</p>
        </button>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col gap-6 items-center border-t-[1px] border-white py-8 w-full bg-black text-white px-4 sm:px-6 lg:px-8">
      {isLoading ? (
        <div className="text-xl sm:text-2xl animate-pulse">Generating captions...</div>
      ) : (
        <div className="w-full flex flex-wrap justify-center gap-6">
          {renderPlatformSection("instagram", FaInstagram)}
          {renderPlatformSection("facebook", MdFacebook)}
          {renderPlatformSection("twitter", FaSquareXTwitter)}
          {renderPlatformSection("youtube shorts", SiYoutubeshorts)}
          {renderPlatformSection("linkedin", SiLinkedin)}
          {renderPlatformSection("youtube", ImYoutube)}
        </div>
      )}

      <button
        onClick={() => dispatch(tabAction.handleTabHome())}
        className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 h-[45px] flex justify-center items-center text-white bg-[#8E2DE2] rounded-md hover:bg-[#7B25C3] transition-colors"
      >
        <p>Go to Dashboard</p>
      </button>

      {copiedPlatform && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 z-50">
          <div className="bg-white text-black p-4 rounded-md shadow-lg transform transition-transform duration-300 ease-in-out">
            <p className="text-center">Caption copied for {copiedPlatform}!</p>
            <button
              onClick={() => setCopiedPlatform(null)}
              className="mt-4 w-full px-4 py-2 bg-[#8E2DE2] text-white rounded-md hover:bg-[#7B25C3] transition-colors"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}