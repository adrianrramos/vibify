import ReactDOM from "react-dom";
import { useEffect, ReactNode } from "react";

const portalRoot = document.getElementById("portal");

const Portal = ({ children }: { children: ReactNode }) => {
  const el = document.createElement("div");
  useEffect(() => {
    portalRoot?.append(el);

    return () => {
      portalRoot?.removeChild(el);
    };
  });

  return ReactDOM.createPortal(children, el);
};

export default Portal;
