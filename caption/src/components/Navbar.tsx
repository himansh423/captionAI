import Image from "next/image";
import logo from "../../public/logo.png";

const Navbar = () => {
  return (
    <div className="w-screen h-[70px] bg-black flex justify-center items-center px-4 border-b-[1px] border-[#8E2DE2]">
      <div className="border-[1px] p-2 border-[#8E2DE2] rounded-sm">
        <div className="w-[165px] h-[27px] relative overflow-hidden rounded-sm">
          <Image
            src={logo.src}
            alt="booleanix Logo"
            objectFit="cover"
            layout="fill"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
