import React from "react";
import { SET_USER_DATA } from "../../redux/types";
import { useDispatch } from "react-redux";
import { firebase } from "../../util/firebase";
import loginWithFirebase from "../../util/loginWithFirebase";
import axios from "axios";
import history from "../../util/history";

interface GithubAuthProps {}

const GithubAuth = () => {
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const userData = await loginWithFirebase(firebase, new firebase.auth.GithubAuthProvider());
    axios.defaults.headers.common["Authorization"] = userData?.FBIdToken;

    delete userData?.FBIdToken;
    dispatch({ type: SET_USER_DATA, payload: userData });

    if (userData?.newUser) {
      await axios.post("/signup", userData);
    }

    userData?.userId && history.push("/");
  };

  return (
    <>
      <button onClick={handleLogin}>
        <i className="fab fa-github"></i>
      </button>
    </>
  );
};
export default GithubAuth;
