import React, { createContext, useState, useEffect } from "react";

export const QuizzContext = createContext();

export const QuizzProvider = ({ children }) => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isQuestionEnd, setIsQuestionEnd] = useState(false);
  const [quizResult, setQuizResult] = useState([]);

  const nextQuestionHandle = (userAnswer) => {
    if (currentQuestion < quiz?.results.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
    setQuizResult((prev) => [...(prev || []), userAnswer]);
  };

  const onFinishHandle = (userAnswer) => {
    setQuizResult((prev) => [...(prev || []), userAnswer]);
    const updatedQuiz = { ...quiz, isQuizAlreadyDone: true };
    setQuiz(updatedQuiz);
    localStorage.setItem("quiz", JSON.stringify(updatedQuiz));
  };

  useEffect(() => {
    if (currentQuestion === quiz?.results.length - 1) {
      setIsQuestionEnd(true);
    }
  }, [currentQuestion]);

  useEffect(() => {
    const quizFromLocalStorage =
      JSON.parse(localStorage.getItem("quiz")) || null;
    const currentQuestionFromLocalStorage =
      JSON.parse(localStorage.getItem("currentQuestion")) || null;
    const quizResultFromLocalStorage =
      JSON.parse(localStorage.getItem("quizResult")) || null;

    if (quizFromLocalStorage !== null) {
      setQuiz(quizFromLocalStorage);
    }

    if (currentQuestionFromLocalStorage !== null) {
      setCurrentQuestion(parseInt(currentQuestionFromLocalStorage));
    }

    if (quizResultFromLocalStorage !== null) {
      setQuizResult(quizResultFromLocalStorage);
    }
  }, []);

  return (
    <QuizzContext.Provider
      value={{
        quiz,
        setQuiz,
        currentQuestion,
        setCurrentQuestion,
        nextQuestionHandle,
        isQuestionEnd,
        quizResult,
        onFinishHandle,
        setIsQuestionEnd,
        setQuizResult,
      }}
    >
      {children}
    </QuizzContext.Provider>
  );
};
