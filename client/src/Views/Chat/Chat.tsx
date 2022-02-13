import React from "react";
import './Chat.css';
import {Messages} from "../../Components/Messages";
import {SocketProvider} from "../../Providers/SocketProvider";
import {RightSide} from "./RightSide/RightSide";
import {LeftSide} from "./LeftSide/LeftSide";
import {ChannelsProvider} from "../../Providers/ChannelsProvider";
import {ModalProvider} from "../../Providers/ModalProvider";
import {TopBar} from "./TopBar";

export const Chat = () => {

  return (
    <ChannelsProvider>
      <ModalProvider>
        <SocketProvider>
          <TopBar channelName={'Gaming'} />
          <div className="outerContainer">
            <LeftSide channels={[]}/>
            <div className="container">
              <Messages/>
            </div>
            <RightSide/>
          </div>
        </SocketProvider>
      </ModalProvider>
    </ChannelsProvider>
  );
}
