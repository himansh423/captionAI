import { Jaro } from "next/font/google";

const jaro = Jaro({
  subsets: ["latin"],
});
const HeroSection = () => {
  return (
    <div className="min-h-screen w-screen bg-black border-t-[1px] border-white">
      <form className="w-screen px-5 flex flex-col items-center py-7">
        <div className="w-full text-white flex flex-col gap-6">
          <p style={{
              WebkitTextStroke: "0.1px #8E2DE2", // Outline color
              color: "white", // Inner text fill color
              fontWeight: "bold", // For a Gothic look
            }} className={`${jaro.className} text-3xl text-center`}>
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
              WebkitTextStroke: "0.1px #8E2DE2", // Outline color
              color: "white", // Inner text fill color
              fontWeight: "bold", // For a Gothic look
            }}
          >
            Select Platform(s)
          </p>
          <div className="flex flex-wrap gap-4 justify-center w-full">
            <div className="w-[70px] h-[70px] bg-white"></div>
            <div className="w-[70px] h-[70px] bg-white"></div>
            <div className="w-[70px] h-[70px] bg-white"></div>
            <div className="w-[70px] h-[70px] bg-white"></div>
            <div className="w-[70px] h-[70px] bg-white"></div>
            <div className="w-[70px] h-[70px] bg-white"></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HeroSection;
