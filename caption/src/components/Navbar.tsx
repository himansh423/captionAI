import Image from "next/image"


const Navbar = () => {
  return (
    <div className="w-screen h-[70px] bg-black flex justify-between items-center px-4">
       <div className="text-white">
        <p>Logo</p>
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
