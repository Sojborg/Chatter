import React, {FC} from "react";
import {TextField, Typography} from "@mui/material";
import {Inbox, Notifications, PushPin, People, Tag} from '@mui/icons-material';
import './TopBar.css';

interface TopBarProps {
  channelName: string;
}

export const TopBar: FC<TopBarProps> = ({channelName}) => {
    return (<div className="top-bar">
      <div className="channel-settings">

      </div>
      <div className={'channel-name'}>
        <Typography variant={'h6'}>{channelName}</Typography>
      </div>
      <div className="channel-actions">
        <Tag
          className="channel-actions-item"
          color={'info'}
        />
        <Notifications
          className="channel-actions-item"
          color={'info'}
        />
        <PushPin
          className="channel-actions-item"
          color={'info'}
        />
        <People
          className="channel-actions-item"
          color={'info'}
        />
        <div className="search-bar">
          <TextField
            type={'text'}
            name={'search'}
          />
        </div>
        <div className="notifications">
          <Inbox fontSize={'small'} />
        </div>
        <div className="help">

        </div>
      </div>
    </div>);
}
