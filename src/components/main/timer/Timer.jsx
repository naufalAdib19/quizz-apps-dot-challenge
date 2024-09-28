import React, { useContext, useEffect, useState } from "react";
import { QuizzContext } from "../../../services/context/quizzcontext/QuizzContext";
import { useBeforeunload } from "react-beforeunload";

const Timer = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const { quiz, setQuiz, isQuestionEnd } = useContext(QuizzContext);
  const [isActive, setIsActive] = useState(true);

  useBeforeunload(() => {
    localStorage.setItem("timer", seconds);
  });

  useEffect(() => {
    const timerFromLocalStorage =
      parseInt(localStorage.getItem("timer")) || initialSeconds;
    setSeconds(timerFromLocalStorage);
  }, []);

  useEffect(() => {
    let timer = null;

    if (quiz != null) {
      setIsActive(true);
    }

    if (quiz?.isQuizAlreadyDone === true) {
      setSeconds(initialSeconds);
      setIsActive(false);
    } else if (seconds === 0) {
      setIsActive(false);
      if (!quiz?.isQuizAlreadyDone) {
        setQuiz((prev) => ({ ...prev, isQuizAlreadyDone: true }));
      }
    } else if (isActive && seconds > 0 && quiz !== null) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [seconds, isActive, quiz]);

  return (
    <div>
      <h1 className="bg-slate-400 text-white font-semibold px-3 py-1 rounded-md">
        {seconds}
      </h1>
    </div>
  );
};

export default Timer;
