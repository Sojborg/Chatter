import React, {FC, useCallback, useEffect, useState} from 'react';
import queryString from "query-string";
import io from "socket.io-client";
import {useLocation} from "react-router-dom";

export interface ISocketContext {
  name: string;
  room: string;
  users: string[];
  messages: string[];

  sendMessage(message: string): void;
}

export const SocketContext = React.createContext<ISocketContext>({} as ISocketContext);

const ENDPOINT = '/';
let socket: SocketIOClient.Socket;

export const SocketProvider: FC = (props) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const accessToken = window.localStorage.getItem('access-token');
  const location = useLocation();

  const sendMessage = (message: string) => {
    console.log('#### SEND MESSAGE ####', message)
    if (message) {
      socket.emit('sendMessage', message, room, () => {
      });
    }
  }

  useEffect(() => {
    socket = io(ENDPOINT, {
      query: {token: accessToken}
    });
  }, [accessToken])

  useEffect(() => {
    const {room} = queryString.parse(location.search);
    const getMessages = async () => {
      const response = await fetch(`/api/chat/channel/${room}`,
        {
          headers: new Headers({
            'token': `bearer ${accessToken}`
          })
        });
      const serverMessages = await response.json();
      const newMessages = serverMessages.map((x: any) => ({user: x.username, text: x.message}));
      setMessages(newMessages);
    }
    if (accessToken) {
      getMessages();
    }
  }, [accessToken, location.search]);

  const addMessageListener = useCallback(() => {
    // Remove existing listener before adding a new
    socket.off('message');
    socket.on('message', (message: string) => {
      console.log(socket.listeners('message'))
      setMessages((messages) => [...messages, message]);
    });
  }, [])

  useEffect(() => {
    const {name, room} = queryString.parse(location.search);

    room && setRoom(room as string);
    name && setName(name as string);

    socket.emit('join', {name, room}, (error: any) => {
      if (error) {
        alert(error);
      }

      addMessageListener();
      socket.on("roomData", ({users}: { users: string[] }) => {
        setUsers(users);
      });
    });
  }, [addMessageListener, location.search]);

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
