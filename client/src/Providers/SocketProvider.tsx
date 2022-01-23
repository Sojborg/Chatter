import React, {FC, useEffect, useState} from 'react';
import queryString from "query-string";
import io from "socket.io-client";
import {useLocalStorage} from 'usehooks-ts';


export interface ISocketContext {
  name: string;
  room: string;
  users: string[];
  messages: string[];

  sendMessage(message: string): void;
}

export const SocketContext = React.createContext<ISocketContext>({} as ISocketContext);

const ENDPOINT = 'http://localhost:5000';
let socket: SocketIOClient.Socket;

export const SocketProvider: FC = (props) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const accessToken = window.localStorage.getItem('access-token');

  const sendMessage = (message: string) => {
    console.log('#### SEND MESSAGE ####', message)
    if (message) {
      socket.emit('sendMessage', message, room, () => {
      });
    }
  }

  useEffect(() => {
    const getMessages = async () => {
      const response = await fetch(`http://localhost:5000/channel/61e68a6a6642d355e0004a91`,
        {
          headers: new Headers({
            'token': `bearer ${accessToken}`
          })
        }); //61e68a6a6642d355e0004a91
      const serverMessages = await response.json();
      const newMessages = serverMessages.map((x: any) => ({user: x.username, text: x.message}));
      setMessages(newMessages);
    }
    if (accessToken) {
      getMessages();
    }
  }, [accessToken]);

  useEffect(() => {
    const {name, room} = queryString.parse(window.location.search);

    socket = io(ENDPOINT, {
      query: {token: accessToken}
    });

    room && setRoom(room as string);
    name && setName(name as string);

    socket.emit('join', {name, room}, (error: any) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, window.location.search]);


  useEffect(() => {
    socket.on('message', (message: string) => {
      const newMessages = [...messages, message]
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({users}: { users: string[] }) => {
      setUsers(users);
    });
  }, []);

  return (<SocketContext.Provider value={{
    name,
    room,
    users,
    messages,
    sendMessage
  }}>
    {props.children}
  </SocketContext.Provider>)
}
