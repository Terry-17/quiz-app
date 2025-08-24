import React, { useState, useRef, useEffect } from "react";
import "./Quiz.css";
import { quizQuestions } from "../../assets/data";
import QuizTimer from "../timer";

const Quiz = () => {
  /* !! index sh. be variable !! */
  let [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(quizQuestions[0]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [timerStart, setTimerStart] = useState(true);

  // Start timer automatically when index changes (new question)
  useEffect(() => {
    setTimerStart(true);
    setLock(false);
    setQuestion(quizQuestions[index]);
    optionArray.forEach((option) => {
      if (option.current) {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
      }
    });
  }, [index]);

  // When time mark as missed
  const handleTimeUp = () => {
    if (!lock) {
      setLock(true); // lock so user can't answer after time up

      // Highlight the correct option for current question
      optionArray[question.a - 1].current.classList.add("correct");
    }
    setTimeout(() => {
      if (index === quizQuestions.length - 1) {
        setResult(true);
      }
    }, 3000);
  };

  // to highlight correct option  if incorrect
  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);
  const optionArray = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.a === ans) {
        e.target.classList.add("correct");
        setScore((prevScore) => prevScore + 1);
      } else {
        e.target.classList.add("wrong");
        optionArray[question.a - 1].current.classList.add("correct");
      }
      setLock(true);
      setTimeout(() => {
        if (index === quizQuestions.length - 1) {
          setResult(true);
        } else {
          setIndex(index + 1);
        }
      }, 1000); // brief pause before next question
    }
  };

  const next = () => {
    if (lock === true) {
      setIndex(++index);
      setQuestion(quizQuestions[index]);
      setLock(false);
    }
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
    setTimerStart(true);
  };

  return (
    <>
      <section className="container min-h-screen bg-gray-200 text-indigo-500 dark:bg-gray-900 flex flex-col items-center justify-center space-y-6 transition-colors">
        {/* Title */}
        <h1 className="font-extrabold text-5xl text-indigo-600 dark:text-indigo-400 text-center pb-5">
          QUIZ APP{" "}
          <span className="text-6xl text-purple-500 dark:text-purple-400">
            !
          </span>
        </h1>

        {/* Quiz Box */}
        <div className="box max-w-xl w-full  dark:bg-gray-800 shadow-lg rounded-2xl p-8">
          {!result && <QuizTimer start={timerStart} onTimeUp={handleTimeUp} />}

          {result ? (
            <>
              <div className="flex flex-col items-center justify-center p-6">
                <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                  You Scored:{" "}
                  <span className="text-blue-700 text-3xl underline">
                    {score}
                  </span>{" "}
                  out of{" "}
                  <span className="text-purple-500 text-3xl">
                    {quizQuestions.length}
                    <span className="text-4xl">!</span>
                  </span>
                </h2>
                <button
                  onClick={reset}
                  className=" my-7 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
                >
                  Reset
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Question */}
              <h2 className="text-lg font-semibold text-indigo-700  mt-100  mb-4 pt-5 pb-3">
                {index + 1}. {question.question}
              </h2>

              {/* Options */}
              <ul className="options space-y-3">
                <li
                  ref={option1}
                  onClick={(e) => {
                    checkAns(e, 1);
                  }}
                  className="p-3  border border-gray-500 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-indigo-200 text-indigo-500 hover:outline-1 dark:hover:bg-indigo-600/30 transition dark:text-gray-200"
                >
                  {question.option1}
                </li>
                <li
                  ref={option2}
                  onClick={(e) => {
                    checkAns(e, 2);
                  }}
                  className="p-3  border border-gray-500 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-indigo-200 text-indigo-500 hover:outline-1 dark:hover:bg-indigo-600/30 transition dark:text-gray-200"
                >
                  {question.option2}
                </li>
                <li
                  ref={option3}
                  onClick={(e) => {
                    checkAns(e, 3);
                  }}
                  className="p-3  border border-gray-500 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-indigo-200 text-indigo-500 hover:outline-1 dark:hover:bg-indigo-600/30 transition dark:text-gray-200"
                >
                  {question.option3}
                </li>
                <li
                  ref={option4}
                  onClick={(e) => {
                    checkAns(e, 4);
                  }}
                  className="p-3  border border-gray-500 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-indigo-200 text-indigo-500 hover:outline-1 dark:hover:bg-indigo-600/30 transition dark:text-gray-200"
                >
                  {question.option4}
                </li>
              </ul>

              {/* Next Button + Index */}
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {index + 1} of {quizQuestions.length} questions
                </div>
                <button
                  onClick={next}
                  className=" cursor-pointer bg-indigo-600 dark:bg-indigo-500 text-white px-5 py-2 rounded-xl shadow-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Quiz;
