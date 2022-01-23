import {createContext, FC, useEffect, useState} from "react";
import {Channel} from "../Views/Chat/LeftSide/LeftSide";
import {getRequest, postRequest} from "../api";

interface IChannelsContext {
  channels: Channel[] | undefined;
  createChannel(channelName: string): void;
}

export const ChannelsContext = createContext({} as IChannelsContext);

export const ChannelsProvider: FC = (props) => {
  const [channels, setChannels] = useState<Channel[] | undefined>(undefined);
  const accessToken = window.localStorage.getItem('access-token');

  useEffect(() => {
    const getChannels = async () => {
      const response = await getRequest<Channel[]>('channel');
      setChannels(response);
    }
    if (accessToken) {
      getChannels();
    }
  }, [accessToken])

  const createChannel = (channelName: string) => {
    const response = postRequest('channel', {name: channelName});
  }

  return <ChannelsContext.Provider value={{
    channels,
    createChannel
  }}>
    {props.children}
  </ChannelsContext.Provider>
}
