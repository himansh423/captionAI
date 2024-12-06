import { Jaro } from "next/font/google";
import instagram from "../../public/instagram.png";
import facebook from "../../public/facebook.png";
import x from "../../public/twitter.png";
import shorts from "../../public/youtubeShorts.png";
import linkedin from "../../public/linkedin.png";
import youtube from "../../public/youtube.png";
import Image from "next/image";
const jaro = Jaro({
  subsets: ["latin"],
});
const HeroSection = () => {
  return (
    <div className="min-h-screen w-screen bg-black border-t-[1px] border-white">
      <form className="w-screen px-5 flex flex-col items-center py-7">
        <div className="w-full text-white flex flex-col gap-6">
          <p
            style={{
              WebkitTextStroke: "0.1px #8E2DE2", // Outline color
              color: "white", // Inner text fill color
              fontWeight: "bold", // For a Gothic look
            }}
            className={`${jaro.className} text-3xl text-center`}
          >
            AI Caption Generator
          </p>
          <textarea
            className="min-h-[200px] rounded-md px-3 py-3 bg-black border-[1px] border-[#8E2DE2] placeholder:text-white shadow-md focus:border-[2px] focus:border-[#8E2DE2] focus:outline-none "
            placeholder="Input Script Or A line Explaining Your Post...."
          />
        </div>
        <div className="text-white flex flex-col gap-5 py-10 w-full">
          <p
            className={`${jaro.className} text-4xl text-center`}
            style={{
              WebkitTextStroke: "0.1px #8E2DE2",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Select Platform(s)
          </p>
          <div className="flex flex-wrap gap-7 justify-center w-full">
            <div className="w-[70px] h-[70px] relative">
              <Image
                src={instagram}
                alt="instagram"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="w-[70px] h-[70px] relative">
              <Image
                src={facebook}
                alt="instagram"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="w-[70px] h-[70px] relative">
              <Image src={x} alt="instagram" layout="fill" objectFit="cover" />
            </div>
            <div className="w-[70px] flex items-center justify-center   h-[70px] relative">
              <div className="w-[30px] h-[30px] bg-white absolute left-[50%] translate-x-[-50%]"></div>
              <Image
                src={shorts}
                alt="instagram"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="w-[70px] h-[70px] relative">
              <Image
                src={linkedin}
                alt="instagram"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="w-[70px] h-[70px] relative">
              <Image
                src={youtube}
                alt="instagram"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>

        <button className="w-full h-[50px] bg-[#8E2DE2] text-white rounded-md mt-5 mb-7">
          Generate Caption
        </button>
      </form>
    </div>
  );
};

export default HeroSection;
