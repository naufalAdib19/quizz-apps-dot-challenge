import React, { useEffect, useState } from "react";
import { Container, Typography, Divider, Button } from "@mui/material";
import OpeningSection from "../components/main/opening/OpeningSection";
import { QuizzProvider } from "../services/context/quizzcontext/QuizzContext";
import QuizzSection from "../components/main/quizz/QuizzSection";
import Result from "../components/main/result/Result";
import Timer from "../components/main/timer/Timer";

const Home = () => {
  return (
    <div className=" bg-blue-50  px-3 md:px-0">
      <QuizzProvider>
        <Container maxWidth="md" className="shadow-md bg-white py-2 my-7">
          <div
            id="quizzHeaders"
            className="py-2 flex items-center justify-between"
          >
            <Typography variant="h6">Quizz Apps</Typography>
            <div>
              <Timer initialSeconds={45} />
            </div>
          </div>
          <Divider />
          <OpeningSection />
          <QuizzSection />
          <Result />
        </Container>
      </QuizzProvider>
    </div>
  );
};

export default Home;
