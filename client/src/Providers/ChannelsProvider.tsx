import {createContext, FC, useCallback, useEffect, useState} from "react";
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

  const getChannels = useCallback(async () => {
    const response = await getRequest<Channel[]>('channel');
    setChannels(response);
  }, [])

  useEffect(() => {
    if (accessToken) {
      getChannels();
    }
  }, [accessToken])

  const createChannel = async (channelName: string) => {
    const response = postRequest('channel', {name: channelName});
    await getChannels();
    return response;
  }

  return <ChannelsContext.Provider value={{
    channels,
    createChannel
  }}>
    {props.children}
  </ChannelsContext.Provider>
}
