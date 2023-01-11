import React from "react";
import AuthForm from "../components/auth.form";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

function SignUpScreen() {
  const signUpHandler = (user: User) => {
    //User to store
  };
  return <AuthForm onSignUp={signUpHandler} isLogin={false} />;
}

export default SignUpScreen;
