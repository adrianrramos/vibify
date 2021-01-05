import React from "react";
import GoogleAuth from "../components/Login/GoogleAuth";
import GithubAuth from "../components/Login/GithubAuth";

interface LoginProps {}

const Login = () => {
  return (
    <div id="login-page" className="mx-auto w-1/2 text-center text-white">
      <p className="text-6xl font-black">WELCOME TO VIBIFY</p>
      <img src="https://cdn.dribbble.com/users/58911/screenshots/840469/paint_the_townbw.png" alt="vibify" className="my-0 mx-auto"/>
      <p className="text-3xl font-extrabold">Please Sign In</p>
      <div id="login-btns" className="flex items-center space-x-5 justify-center my-10">
        <div className="btn-login text-6xl">
            <GoogleAuth />
        </div>
        <p className="text-2xl font-extrabold">OR</p>
        <div className="btn-login text-6xl">
            <GithubAuth />
        </div>
      </div>
    </div>
  );
};
export default Login;
