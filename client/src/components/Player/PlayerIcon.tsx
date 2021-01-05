import React from "react";

interface PlayerIconProps {
  icon?: JSX.Element;
  handleClick?: () => void;
}

const PlayerIcon = ({ icon, handleClick }: PlayerIconProps) => {
  return (
    <>
      <span
        className="player-icon"
        onClick={() => {
          handleClick && handleClick();
        }}
      >
        {icon}
      </span>
    </>
  );
};

export default PlayerIcon;
