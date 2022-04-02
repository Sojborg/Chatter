import {createContext, FC, useCallback, useEffect, useState} from "react";
import {Channel} from "../Views/Chat/LeftSide/LeftSide";
import {getRequest, postRequest} from "../api";
import {useLocation} from "react-router-dom";
import queryString from "query-string";

interface IChannelsContext {
  channels: Channel[] | undefined;
  createChannel(channelName: string): void;
  currentChannel: Channel | undefined;
}

export const ChannelsContext = createContext({} as IChannelsContext);

export const ChannelsProvider: FC = (props) => {
  const [channels, setChannels] = useState<Channel[] | undefined>(undefined);
  const [currentChannel, setCurrentChannel] = useState<Channel>();
  const location = useLocation();
  const accessToken = window.localStorage.getItem('access-token');

  const getChannels = useCallback(async () => {
    const response = await getRequest<Channel[]>('channel');
    setChannels(response);
  }, [])

  useEffect(() => {
    if (accessToken) {
      getChannels();
    }
  }, [accessToken, getChannels])

  useEffect(() => {
    const {room} = queryString.parse(location.search);
    const channel = channels?.find(x => x._id === room);

    if (channel) {
      setCurrentChannel(channel);
    }
  }, [channels, location.search])

  const createChannel = async (channelName: string) => {
    const response = postRequest('channel', {name: channelName});
    await getChannels();
    return response;
  }

  return <ChannelsContext.Provider value={{
    channels,
    createChannel,
    currentChannel
  }}>
    {props.children}
  </ChannelsContext.Provider>
}
