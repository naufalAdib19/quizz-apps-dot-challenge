import React, { useContext, useState, useMemo, useEffect } from "react";
import { QuizzContext } from "../../../services/context/quizzcontext/QuizzContext";
import { Button, Divider, Typography } from "@mui/material";
import AnswerList from "./AnswerList";
import { useBeforeunload } from "react-beforeunload";

const QuizzSection = () => {
  const { quiz, currentQuestion } = useContext(QuizzContext);

  useBeforeunload(() => {
    localStorage.setItem("currentQuestion", JSON.stringify(currentQuestion));
  });

  if (quiz !== null && quiz.isQuizAlreadyDone !== true)
    return (
      <div>
        <div className="py-4 flex flex-col gap-y-4">
          <div>
            <Typography
              dangerouslySetInnerHTML={{
                __html: quiz?.results[currentQuestion].question,
              }}
            ></Typography>
          </div>
          <div className="flex flex-col gap-y-2">
            <AnswerList quiz={quiz} currentQuestion={currentQuestion} />
          </div>
        </div>
      </div>
    );
};

export default QuizzSection;
