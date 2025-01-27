import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rank } from "./rank";

interface ResultProps {
  finalScore: number;
  totalQuestions: number;
  incorrectAnswers: number;
  percentageScore: number;
}

const Result: React.FC<ResultProps> = ({
  finalScore,
  totalQuestions,
  incorrectAnswers,
  percentageScore,
}) => {
  const navigate = useNavigate();
  const [isRankModalOpen, setIsRankModalOpen] = useState(false);

  const handleRestart = () => {
    navigate("/home");
  };

  const handleViewRank = () => {
    setIsRankModalOpen(true);
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="relative z-10 flex flex-col items-center bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-105 hover:scale-100">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Your Results
        </h1>

        {/* Stats */}
        <div className="w-full space-y-2 text-center text-lg">
          <p className="font-semibold">
            <span className="text-gray-600">Final Score:</span>{" "}
            <span className="text-blue-500">{finalScore}</span>
          </p>
          <p>
            <span className="text-gray-600">Total Questions:</span>{" "}
            <span className="text-gray-800">{totalQuestions}</span>
          </p>
          <p>
            <span className="text-gray-600">Correct Answers:</span>{" "}
            <span className="text-green-500">{finalScore}</span>
          </p>
          <p>
            <span className="text-gray-600">Incorrect Answers:</span>{" "}
            <span className="text-red-500">{incorrectAnswers}</span>
          </p>
          <p>
            <span className="text-gray-600">Percentage Score:</span>{" "}
            <span
              className={`${
                percentageScore >= 75 ? "text-green-600" : "text-red-600"
              } font-semibold`}
            >
              {percentageScore}%
            </span>
          </p>
        </div>

        {/* Feedback */}
        <div className="mt-6">
          {percentageScore >= 75 ? (
            <p className="text-green-600 font-bold text-xl">🎉 Great job!</p>
          ) : (
            <p className="text-red-600 font-bold text-xl">🚀 Keep trying!</p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-8 grid grid-cols-1 gap-4 w-full">
          <button
            onClick={handleRestart}
            className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md transition-all duration-300"
          >
            New Game
          </button>
          <button
            onClick={handleViewRank}
            className="p-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl shadow-md transition-all duration-300"
          >
            View Rank
          </button>
         
         
        </div>

        {/* Rank Modal */}
        <Rank modalInfo={isRankModalOpen} setModalInfo={setIsRankModalOpen} />
      </div>
    </div>
  );
};

export default Result;
