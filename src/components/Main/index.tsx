import React from "react";
import ButtonLists from "./ButtonLists";
import VideoContainer from "./VideoContainer";

export default function Main({ className }: MainProps) {
  return (
    <div className={`${className} p-5 overflow-x-hidden`}>
      <ButtonLists />
      <VideoContainer />
    </div>
  );
}
