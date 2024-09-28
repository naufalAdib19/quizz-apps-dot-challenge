import React, { useContext, useEffect, useState } from "react";
import { Typography, Button, CircularProgress } from "@mui/material";
import { QuizzContext } from "../../../services/context/quizzcontext/QuizzContext";
import img from "../../../assets/quizz.jpg";

const OpeningSection = () => {
  const { quiz, setQuiz } = useContext(QuizzContext);
  const [isLoad, setIsLoad] = useState(false);
  const baseUrl = import.meta.env.VITE_API_URL;

  const onQuizzStartHandle = async () => {
    setIsLoad(true);
    try {
      const response = await fetch(baseUrl + "amount=10&type=multiple");
      let data = await response.json();
      localStorage.setItem("quiz", JSON.stringify(data));
      setQuiz(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoad(false);
    }
  };

  if (quiz === null)
    return (
      <div className="py-2 flex flex-col items-center">
        <div>
          <img src={img} alt="" width={300} loading="lazy" />
        </div>
        <div className=" flex flex-col gap-y-1 items-center">
          <Typography variant="h6">WELCOME!</Typography>
          <Button
            variant="contained"
            className="w-fit"
            onClick={onQuizzStartHandle}
            disabled={isLoad}
          >
            <div>Let's try!</div>
          </Button>
        </div>
      </div>
    );
};

export default OpeningSection;
