import {Link} from "react-router-dom";
import {useContext} from "react";
import {ChannelsContext} from "../../Providers/ChannelsProvider";
import './Channels.css';
import {NewChannel} from "./NewChannel";

export const Channels = () => {
  const channelsContext = useContext(ChannelsContext);
  const {channels} = channelsContext;

    return (<div className={'channels'}>
        <NewChannel />
        <ul>
          {channels && channels.map(channel => {
            return (<li key={channel._id}>
              <Link to={`./Chat?room=${channel._id}`}># {channel.name}</Link>
            </li>)
          })}
        </ul>
      </div>
    )
}
