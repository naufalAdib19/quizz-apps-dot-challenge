import React, { useContext, useEffect } from "react";
import { useState, useMemo } from "react";
import { QuizzContext } from "../../../services/context/quizzcontext/QuizzContext";
import { Divider, Button } from "@mui/material";

const AnswerList = ({ quiz, currentQuestion }) => {
  const { nextQuestionHandle, isQuestionEnd, onFinishHandle } =
    useContext(QuizzContext);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [selectedAnswerValue, setSelectedAnswerValue] = useState(null);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledAnswers = useMemo(() => {
    if (quiz && quiz.results[currentQuestion]) {
      const combinedArray = [
        ...quiz.results[currentQuestion].incorrect_answers,
        quiz.results[currentQuestion].correct_answer,
      ];
      return shuffleArray(combinedArray);
    }
    return [];
  }, [quiz, currentQuestion]);

  const handleAnswerClick = (event, index, value) => {
    setSelectedAnswerIndex(index);
    setSelectedAnswerValue(value);
  };

  const userAnswer = () => {
    const isAnswerCorrect =
      selectedAnswerValue === quiz?.results[currentQuestion]?.correct_answer;
    return {
      theAnswer: selectedAnswerValue,
      correctAnswer: quiz?.results[currentQuestion]?.correct_answer,
      result: isAnswerCorrect,
    };
  };

  const resetAnswerSelected = useMemo(() => {
    setSelectedAnswerIndex(null);
    setSelectedAnswerValue(null);
  }, [currentQuestion]);

  const ActionButton = () =>
    isQuestionEnd ? (
      <Button variant="contained" onClick={() => onFinishHandle(userAnswer())}>
        Finish
      </Button>
    ) : (
      <Button
        variant="contained"
        onClick={() => nextQuestionHandle(userAnswer())}
      >
        Next
      </Button>
    );

  return (
    <>
      <div className="flex flex-col gap-y-2">
        {shuffledAnswers.map((val, index) => (
          <p
            className={`py-3 px-2 bg-slate-100 rounded-md cursor-pointer ${
              selectedAnswerIndex === index && "bg-slate-300"
            }`}
            onClick={(event) => handleAnswerClick(event, index, val)}
            key={index}
          >
            {val}
          </p>
        ))}
      </div>
      <Divider />
      <div className="py-2 flex justify-between items-center">
        <div>
          <p>
            {currentQuestion + 1} of {quiz?.results?.length}
          </p>
        </div>
        <ActionButton />
      </div>
    </>
  );
};

export default AnswerList;
