import React from "react";
import './Chat.css';
import {Messages} from "../../Components/Messages";
import {SocketProvider} from "../../Providers/SocketProvider";
import {RightSide} from "./RightSide/RightSide";
import {LeftSide} from "./LeftSide/LeftSide";
import {ChannelsProvider} from "../../Providers/ChannelsProvider";

export const Chat = () => {

  return (
    <SocketProvider>
      <div className="outerContainer">

        <ChannelsProvider>
          <LeftSide channels={[]} />
        </ChannelsProvider>
        <div className="container">
          <Messages/>
        </div>
        <RightSide/>
      </div>
    </SocketProvider>
  );
}
