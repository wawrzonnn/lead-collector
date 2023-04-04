import React from "react";
import Gameboy from "./Gameboy";

export const GameboysMobile = () => (
  <svg width="500%" height="160px">
    <pattern
      id="gameboys-mobile"
      x="0"
      y="30"
      width="100"
      height="200"
      patternUnits="userSpaceOnUse"
      patternTransform="scale(1)"
    >
      <Gameboy />
    </pattern>
    <rect
      x="0"
      y="0"
      width="100%"
      height="100%"
      fill="url(#gameboys-mobile)"
    ></rect>
  </svg>
);
