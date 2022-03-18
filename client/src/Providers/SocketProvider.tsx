import React, {FC, useCallback, useEffect, useState} from 'react';
import queryString from "query-string";
import io from "socket.io-client";

export interface ISocketContext {
  name: string;
  room: string;
  users: string[];
  messages: string[];

  sendMessage(message: string): void;
}

export const SocketContext = React.createContext<ISocketContext>({} as ISocketContext);

const ENDPOINT = 'http://localhost:8080';
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
    socket = io(ENDPOINT, {
      query: {token: accessToken}
    });
  }, [accessToken])

  useEffect(() => {
    const {room} = queryString.parse(window.location.search);
    const getMessages = async () => {
      const response = await fetch(`http://localhost:8080/api/chat/channel/${room}`,
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
  }, [accessToken]);

  const addMessageListener = useCallback(() => {
    // Remove existing listener before adding a new
    socket.off('message');
    socket.on('message', (message: string) => {
      console.log(socket.listeners('message'))
      setMessages((messages) => [...messages, message]);
    });
  }, [])

  useEffect(() => {
    const {name, room} = queryString.parse(window.location.search);

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
  }, [addMessageListener]);

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
