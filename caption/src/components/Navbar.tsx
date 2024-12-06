import Image from "next/image"
import logo from "../../public/logo.png";

const Navbar = () => {
  return (
    <div className="w-screen h-[70px] bg-black flex justify-between items-center px-4">
       <div className="w-[165px] h-[23px] relative overflow-hidden rounded-sm">
        <Image src={logo.src} alt="booleanix Logo" objectFit="cover" layout="fill"/>
       </div>
       <div className="flex flex-col gap-[5px]">
        <div className="w-[25px] h-[1px] bg-white"></div>
        <div className="w-[25px] h-[1px] bg-white"></div>
        <div className="w-[25px] h-[1px] bg-white"></div>
       </div>
    </div>
  )
}

export default Navbar
