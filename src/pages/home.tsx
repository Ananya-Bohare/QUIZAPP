import { useState, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { PiRanking } from "react-icons/pi";
import { Settings } from "../components/settings";
import { Rank } from "../components/rank";
import { useNavigate, useLocation  } from "react-router-dom";
import Lottie from "lottie-react";
import lottieThinking from "../assets/lotties/triviathink.json";
import lottieGoing from "../assets/lotties/triviagoing.json";

const Home = () => {
  const [modalInfo, setModalInfo] = useState(false);
  const [rankModalInfo, setRankModalInfo] = useState(false);
  const location = useLocation();
  const [category, setCategory] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState("easy");
  const [type, setType] = useState("any");
  const navigate = useNavigate();
  const [firstAnimation, setFirstAnimation] = useState(1);

  const handleStartGame = async () => {
    setFirstAnimation(2);
    const params = new URLSearchParams();
    params.append("amount", numberOfQuestions.toString());

    if (category !== 0) params.append("category", category.toString());
    if (difficulty !== "any") params.append("difficulty", difficulty);
    if (type !== "any") params.append("type", type);

    const url = `https://opentdb.com/api.php?${params.toString()}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.response_code === 1) {
        alert("No questions found for this selected settings");
      } else {
        navigate("/game", {
          state: {
            questions: data.results,
            settings: {
              category,
              numberOfQuestions,
              difficulty,
              type,
            },
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalInfo = () => {
    setModalInfo(true);
  };

  const handleRankModal = () => {
    setRankModalInfo(true);
  };

  useEffect(() => {
    const { rankModalInfo } = location.state || {};
    if (rankModalInfo) {
        setRankModalInfo(true);
    }
}, [location.state]);
  

  return (
    <div className="min-h-screen flex w-full items-center justify-center text-center bg-gradient-to-r from-green-800 to-green-600 relative">
      <div className="absolute w-full top-4 flex flex-row items-center justify-between px-6 text-white">
        <div
          className="flex flex-col justify-center items-center gap-1 cursor-pointer"
          onClick={handleRankModal}
        >
          <PiRanking size={30} />
          <div>Rank</div>
        </div>
        <div
          className="flex flex-col justify-center items-center gap-1 cursor-pointer"
          onClick={handleModalInfo}
        >
          <IoSettingsOutline size={30} />
          <div>Settings</div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={handleStartGame}>
            {firstAnimation === 1 ? (
              <Lottie
                animationData={lottieThinking}
                loop={true}
                className="w-96"
              />
            ) : (
              <Lottie
                animationData={lottieGoing}
                loop={true}
                className="w-96"
              />
            )}
            <div className="text-3xl font-bold text-white">Click to Start</div>
          </div>
          <Settings
        modalInfo={modalInfo}
        setModalInfo={setModalInfo}
        category={category}
        difficulty={difficulty}
        numberOfQuestions={numberOfQuestions}
        setCategory={setCategory}
        setDifficulty={setDifficulty}
        setNumberOfQuestions={setNumberOfQuestions}
        setType={setType}
        type={type}
      />

      <Rank modalInfo={rankModalInfo} setModalInfo={setRankModalInfo} />
    </div>
  );
};

export default Home;
