import React from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { getAllData } from "../../functions/getSheet";

const LoginPage = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
        console.log(tokenResponse);
        getAllData();
    },
    scope: "https://www.googleapis.com/auth/spreadsheets",
  });

  return (
    <>
      <button onClick={() => login()}>Sign in with Google 🚀</button>;
    </>
  );
};

export default LoginPage;
