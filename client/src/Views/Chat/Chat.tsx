import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import './Chat.css';
import {Messages} from "../../Components/Messages";
import {Input} from "../../Components/Input";
import {TextContainer} from "../../Components/TextContainer";
import { Channels } from "../../Components/Channels/Channels";
import {Users} from "../../Components/Users/Users";
import {SocketContext, SocketProvider} from "../../Providers/SocketProvider";

const ENDPOINT = 'http://localhost:5000';

let socket: SocketIOClient.Socket;

export const Chat = ({ location }: {location: any}) => {

    return (
        <SocketProvider>
            <div className="outerContainer">
                <div className="container">
                    <Channels/>
                    <Messages />
                    <Users />
                </div>
                <TextContainer />
            </div>
        </SocketProvider>
    );
}