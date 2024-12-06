"use client"
import HeroSection from "./HeroSection";
import AiComponent from "./AiComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const HomePage = () => {
  const {tab} = useSelector((store:RootState) => store.tab)
  
  return <div>{tab === "home" ? <HeroSection /> : <AiComponent />}</div>;
};

export default HomePage;
