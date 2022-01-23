import {useContext, useState} from "react";
import {ChannelsContext} from "../../Providers/ChannelsProvider";

export const NewChannel = () => {
  const {createChannel} = useContext(ChannelsContext);
  const [channel, setChannel] = useState('');

  const onCreateChannel = () => {
    createChannel(channel);
  }

  return (<div className={'new-channel'}>
      <input type={'text'} onChange={(e) => setChannel(e.target.value)} value={channel} />
      <button onClick={onCreateChannel}>New channel</button>
    </div>
  )
}
