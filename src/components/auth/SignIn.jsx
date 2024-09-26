import React, { useEffect } from "react";

//FirebaseUI
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

// Auth service
import { auth } from "../../services/firebase";

const SignIn = () => {
  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    ui.start("#firebaseui-auth-container", {
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    });
  }, []);

  return (
    <div className="h-screen items-center flex justify-center flex-col">
      <div className="w-3/4">
        <div id="firebaseui-auth-container"></div>
      </div>
    </div>
  );
};

export default SignIn;
