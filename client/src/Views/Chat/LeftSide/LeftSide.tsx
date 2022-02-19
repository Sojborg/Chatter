import {FC} from "react";
import './LeftSide.css';
import {Channels} from "../../../Components/Channels/Channels";

export interface Channel {
  _id: string;
  name: string;
}

interface ILeftSide {
  channels: Channel[];
}

export const LeftSide: FC<ILeftSide> = (props) => {

  return (<div className={'left-side'}>
    <Channels />
  </div>)
}
