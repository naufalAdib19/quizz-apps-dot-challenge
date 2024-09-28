import React, { useContext } from "react";
import { QuizzContext } from "../../../services/context/quizzcontext/QuizzContext";
import { Button, Divider } from "@mui/material";
import { useBeforeunload } from "react-beforeunload";

const Result = () => {
  const {
    quiz,
    quizResult,
    setCurrentQuestion,
    setQuiz,
    setIsQuestionEnd,
    setQuizResult,
  } = useContext(QuizzContext);

  useBeforeunload(() => {
    localStorage.setItem("quizResult", JSON.stringify(quizResult));
  });

  const scoreResult = () => {
    let totalNullAnswer = 0;
    let totalCorrectAnswer = 0;
    let score = 0;

    if (quizResult.length != quiz.results.length) {
      for (let i = quizResult.length; i < quiz?.results?.length; i++) {
        quizResult.push({
          result: false,
          correctAnswer: quiz?.results[i].correct_answer,
          theAnswer: null,
        });
      }
    }

    for (let i = 0; i < quizResult.length; i++) {
      if (quizResult[i].theAnswer == null) {
        totalNullAnswer += 1;
      }
      if (quizResult[i].result) {
        totalCorrectAnswer += 1;
      }
    }

    score = (totalCorrectAnswer / quiz?.results?.length) * 100;

    return { totalCorrectAnswer, totalNullAnswer, score };
  };

  if (quiz !== null && quiz.isQuizAlreadyDone)
    return (
      <div>
        <ul className="flex flex-col gap-y-3 py-3">
          {quizResult.map((val, index) => (
            <li className="list-none list-outside" key={index}>
              <div
                className={`${
                  val.result ? "bg-green-50" : "bg-red-50"
                } px-2 py-3 rounded`}
              >
                <p>Your Answer: {val.theAnswer}</p>
                <p>Correct Answer: {val.correctAnswer}</p>
              </div>
            </li>
          ))}
        </ul>
        <Divider />
        <div className="flex justify-between items-center">
          <div className="py-3">
            <p>Your Correct Answer is: {scoreResult().totalCorrectAnswer}</p>
            <p>
              You have Finished:{" "}
              {quiz.results.length - scoreResult().totalNullAnswer} Questions
            </p>
            <p>Your Score is: {scoreResult().score}</p>
          </div>
          <div>
            <Button
              variant="contained"
              onClick={() => {
                localStorage.clear();
                setQuiz(null);
                setCurrentQuestion(0);
                setIsQuestionEnd(false);
                setQuizResult([]);
              }}
            >
              Main Lagi!
            </Button>
          </div>
        </div>
      </div>
    );
};

export default Result;
