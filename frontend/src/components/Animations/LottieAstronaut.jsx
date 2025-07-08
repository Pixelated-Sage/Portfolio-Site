import React from "react";
import Lottie from "lottie-react";
import astronautAnimation from "../../assets/lottie/spaceperson.json"

const LottieAstronaut = ({ className }) => {
  return (
    <Lottie 
      animationData={astronautAnimation} 
      loop={true} 
      className={className}
    />
  );
};

export default LottieAstronaut;
