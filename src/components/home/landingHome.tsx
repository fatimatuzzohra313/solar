import React from "react";
import HeroSection from "../HeroSection";
import ServicesSection from "../Service";
import SolutionCard from "../SolarSolutions";
import SolarSolutionsCard from "../SolarSolutionsCards";
import Serve from "../Serve";
import CommunitySection from "../Community";

function LandingHome() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <SolutionCard/>
      <ServicesSection /> 

      <SolarSolutionsCard/>
      <Serve />
      <CommunitySection/>
    </div>
  );
}

export default LandingHome;
