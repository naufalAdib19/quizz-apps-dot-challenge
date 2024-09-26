import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsRujevntnGuUwywzCXsCPAutXimRUB0g",
  authDomain: "quizz-apps-challenge.firebaseapp.com",
  projectId: "quizz-apps-challenge",
  storageBucket: "quizz-apps-challenge.appspot.com",
  messagingSenderId: "660053424705",
  appId: "1:660053424705:web:a0810ebc3cd9d33fff24c0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
