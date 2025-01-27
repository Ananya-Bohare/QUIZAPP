import { useEffect, useState } from "react";
import { PiRanking } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import he from "he";
import sucessAnimation from "../assets/lotties/triviasuccess.json";
import failureAnimation from "../assets/lotties/triviafailure.json";
import Lottie from "lottie-react";
import { Rank } from "../components/rank";
import ProgressBar from "../components/ProgressBar";
import Timer from "../components/Timer";
import Result from "../components/Result";
import ErrorBoundary from '../components/ErrorBoundary';



export function GamePage() {
  const location = useLocation();
  const { questions, settings } = location.state || {};
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const [rankModalInfo, setRankModalInfo] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answerResult, setAnswerResult] = useState<"success" | "failure" | null>(null);

  const [timeLeft, setTimeLeft] = useState(15); // Timer starts with 30 seconds per question
  const [isTimerRunning, setIsTimerRunning] = useState(true); // Flag to manage the timer state

  // Calculate progress percentage

  const progressPercentage = isQuizCompleted ? 100 : ((currentQuestionIndex) / questions.length) * 100;


  const handleRankModal = () => {
    setRankModalInfo(true);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
  
    if (isTimerRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleConfirmAnswer(); // Automatically confirm the answer when time runs out
    }
  
    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [isTimerRunning, timeLeft]);
  


  useEffect(() => {
    if (questions && questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      const decodedQuestion = decodeAndShuffleAnswers(currentQuestion);
      setAnswers(decodedQuestion);
    }
  }, [currentQuestionIndex, questions]);

  const decodeAndShuffleAnswers = (question: {
    correct_answer: string;
    incorrect_answers: string[];
    type: string;
  }) => {
    const correctAnswer = he.decode(question.correct_answer);
    const incorrectAnswer = question.incorrect_answers.map((answer) =>
      he.decode(answer)
    );

    const answersArray =
      question.type === "boolean"
        ? ["True", "False"]
        : [correctAnswer, ...incorrectAnswer];

    return shuffleArray(answersArray);
  };

  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleSelectedAnswer = (answer: string) => {
    console.log("Selected answer:", answer);
    setSelectedAnswer(answer);
  };

  const handleConfirmAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = he.decode(currentQuestion.correct_answer);

    if (selectedAnswer === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
      setAnswerResult("success");
    } else {
      setAnswerResult("failure");
    }

    setTimeout(() => {
      setAnswerResult(null);
      handleNextQuestion();
    }, 1000);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer("");
    setTimeLeft(15); // Reset timer for next question
    setIsTimerRunning(true); // Start the timer for the next question

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // Check if the quiz is completed and results have not been saved
      if (!isQuizCompleted) {
        setIsQuizCompleted(true);
        setIsTimerRunning(false);
        saveQuizHistory(score);  // Pass the updated score
    }
      setTimeLeft(0); 
  }
  };

  const saveQuizHistory = (finalScore: number) => {
    const existingHistory = JSON.parse(
        localStorage.getItem("quizHistory") || "[]"
    );

    const currentPlay = {
        timestamp: new Date().toISOString(),
        score: finalScore,  // Use finalScore instead of state
        totalQuestions: questions.length,
        category: settings.category,
        difficulty: settings.difficulty,
        questionType: settings.questionType,
    };

    const updatedHistory = [...existingHistory, currentPlay];

    localStorage.setItem("quizHistory", JSON.stringify(updatedHistory));
};

  const handleRestart = () => {
    navigate("/home");
  };

  const currentQuestion = questions[currentQuestionIndex];
  const questionText = he.decode(currentQuestion.question);
  const correctAnswer = he.decode(currentQuestion.correct_answer);
  const correctCategory = he.decode(currentQuestion.category);

  return (
    <div className="min-h-screen flex w-full flex-col items-center justify-center text-center bg-gradient-to-r from-blue-600 to-blue-300 relative">
      <div className="absolute w-full top-4 flex flex-row items-center justify-between px-6 text-white">
        <div
          className="flex flex-col justify-center items-center gap-1 cursor-pointer"
          onClick={handleRankModal}
        >
          <PiRanking size={30} />
          <div>Rank</div>
        </div>
        <div className="flex flex-col justify-center items-center gap-1 cursor-pointer">
          <div className="text-xl flex flex-row gap-1 font-bold">
            <div>Score:</div>
            <div>{score}</div>
          </div>
          <button
            onClick={handleRestart}
            className="bg-red-500 text-white px-4 py-2 rounded-md mt-1"
          >
            Restart
          </button>
        </div>
      </div>
      <ErrorBoundary>
<div className="flex justify-between items-center w-full mt-4"
    style={{ width: '100%', maxWidth: '900px' }}>
  <div className="text-white text-xl font-bold">
    Question {currentQuestionIndex + 1} of {questions.length}
  </div>
  
  <Timer timeLeft={timeLeft} isQuizCompleted={isQuizCompleted} />

</div>

      {/* Progress Bar */}
      <ProgressBar progress={progressPercentage} />


      <div className="mt-4 text-2xl text-white">{correctCategory}</div>

      <div className="bg-white px-4 py-4 rounded-lg mt-6 text-lg">
        {questionText}
      </div>

      <div className="w-full flex flex-col max-w-2xl mt-4 gap-3">
      
        {answers.map((answer, index) => {
          let buttonClass = "bg-white text-gray-800";

          if (selectedAnswer == answer) {
            buttonClass = "bg-blue-400 text-white";
          }

          if (answerResult && answer === correctAnswer) {
            buttonClass = "bg-green-600 text-white";
          } else if (
            answerResult &&
            answer === selectedAnswer &&
            selectedAnswer !== correctAnswer
          ) {
            buttonClass = "bg-red-600 text-white";
          }

          return (
            <button
              key={index}
              onClick={() => handleSelectedAnswer(answer)}
              className={`rounded-lg py-3 ${buttonClass}`}
            >
              {answer}
            </button>
          );
        })}
      </div>

      <button
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md"
        onClick={handleConfirmAnswer}
      >
        Confirm
      </button>

      {answerResult === "success" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <Lottie
            animationData={sucessAnimation}
            loop={true}
            className="w-72"
          />
        </div>
      )}

      {answerResult === "failure" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <Lottie
            animationData={failureAnimation}
            loop={true}
            className="w-72"
          />
        </div>
      )}

      {isQuizCompleted && (
       <Result 
        finalScore={score} 
        totalQuestions={questions.length} 
        incorrectAnswers={questions.length - score} 
        percentageScore={(score / questions.length) * 100} 
      />
      )}
      <Rank modalInfo={rankModalInfo} setModalInfo={setRankModalInfo} />
      </ErrorBoundary>
    </div>
  );
}
