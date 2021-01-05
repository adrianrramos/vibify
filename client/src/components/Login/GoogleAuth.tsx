import React from "react";
import { firebase } from "../../util/firebase";
import axios from "axios";
import history from "../../util/history";
import loginWithFirebase from "../../util/loginWithFirebase";
import { useDispatch } from "react-redux";
import { SET_USER_DATA } from "../../redux/types";



const GoogleAuth = () => {
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const userData = await loginWithFirebase(firebase, new firebase.auth.GoogleAuthProvider());
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
        <i className="fab fa-google"></i>
      </button>
    </>
  );
};
export default GoogleAuth;
