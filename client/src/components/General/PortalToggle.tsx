import React, { useState, ReactNode } from "react";
import Portal from "./Portal";

interface PostToggle {
  icon: ReactNode;
  children: ReactNode;
  btnClassName: string;
}

const PostToggle = ({ icon, children, btnClassName }: PostToggle) => {
  const [open, setOpen] = useState(false);

  const closePortal = () => {
    setOpen(false);
  };

  const clonedChild = React.Children.map(children, child => {
    const props = { closePortal };

    if (React.isValidElement(child)) {
      return React.cloneElement(child, props);
    }
    return child;
  });

  return (
    <>
      <button onClick={() => setOpen(true)} className={btnClassName}>
        {icon}
      </button>
      {open && <Portal>{clonedChild}</Portal>}
    </>
  );
};
export default PostToggle;
