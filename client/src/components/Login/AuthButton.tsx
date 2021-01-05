import React, { FunctionComponent, ReactNode } from "react";
import { firebase } from "../../util/firebase";
import axios from "axios";
import history from "../../util/history";
import loginWithFirebase from "../../util/loginWithFirebase";
import { useDispatch } from "react-redux";
import { SET_USER_DATA } from "../../redux/types";

// FIXME: merge this with google auth component

interface AuthButtonProps {
  provider: any;
}

type Props = {
  children: ReactNode;
  provider: any;
};

const AuthButton: FunctionComponent<Props> = (props, { provider }: AuthButtonProps) => {
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const userData = await loginWithFirebase(firebase, provider);
    axios.defaults.headers.common["Authorization"] = userData?.FBIdToken;

    delete userData?.FBIdToken;
    dispatch({ type: SET_USER_DATA, payload: userData });

    if (userData?.newUser) {
      await axios.post("/signup", userData);
    }

    userData?.userId && history.push("/");
  };

  return (
    <div>
      <button onClick={handleLogin}>{props.children}</button>
    </div>
  );
};
export default AuthButton;
