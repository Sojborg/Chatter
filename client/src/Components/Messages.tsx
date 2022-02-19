import React, {useContext, useState} from 'react';

import {Message} from './Message';

import './Messages.css';
import {Input} from "./Input";
import {SocketContext} from "../Providers/SocketProvider";

export const Messages = () => {
  const [message, setMessage] = useState('');
  const {sendMessage, messages, name} = useContext(SocketContext);

  const onSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    sendMessage(message);
    setMessage('');
  }

  return (<div className="messages">

    <Input message={message} setMessage={setMessage} sendMessage={onSendMessage}/>
    <div className={'messages__content'}>
      {messages.map((message: string, i: number) => <div key={i}><Message message={message} name={name}/></div>)}
    </div>
  </div>)
};
