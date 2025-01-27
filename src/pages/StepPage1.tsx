import Lottie from "lottie-react";
import lottieOpen from "../assets/lotties/triviaopening.json";
import lottieGo from "../assets/lotties/triviaGO.json";
import { useNavigate } from "react-router-dom";
import { useEffect} from "react";

const StepPage1 = () => {
  const navigate = useNavigate();

  useEffect(() => {
      const text = document.querySelector(".typing-text");
  
      if (text) {
        const letters = text.textContent?.split("");
  
        text.textContent = "";
  
        letters?.forEach((letter, index) => {
          const span = document.createElement("span");
          span.textContent = letter === " " ? "\u00A0" : letter;
          span.style.animationDelay = `${index * 0.03}s`;
          span.classList.add("fade-in");
          text.appendChild(span);
        });
      }
    });

  const handleStep = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex w-full items-center justify-center text-center bg-gradient-to-r from-green-800 to-green-600 relative">
      <div>
      <Lottie animationData={lottieOpen} loop={true} className="w-96" />
      <div
        className="text-3xl text-center flex flex-col justify-center items-center font-bold cursor-pointer"
        onClick={handleStep}
      >
        <span className="typing-text text-white">
          Let's play a Trivia Game?!
        </span>
        <Lottie animationData={lottieGo} loop={true} className="w-28" />
      </div>
    </div>
    </div>
  );
};

export default StepPage1;
