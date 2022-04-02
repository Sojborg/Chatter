import React, {FC, useContext} from "react";
import {TextField, Typography} from "@mui/material";
import {Inbox, Notifications, PushPin, People, Tag, Search} from '@mui/icons-material';
import './TopBar.css';
import {ChannelsContext} from "../../Providers/ChannelsProvider";

interface TopBarProps {
}

export const TopBar: FC<TopBarProps> = () => {
  const channelsContext = useContext((ChannelsContext));

  return (<div className="top-bar">
    <div className="channel-settings">

    </div>
    <div className={'channel-name'}>
      <Typography className={'channel-name-tag'} variant={'h5'} sx={{color: 'rgb(220, 221, 222)'}}>#</Typography>
      <Typography variant={'subtitle1'}>{channelsContext.currentChannel?.name ?? ''}</Typography>
    </div>
    <div className="channel-actions">
      <Tag
        className="channel-actions-item"
        sx={{
          color: 'rgb(220, 221, 222)'
        }}
      />
      <Notifications
        className="channel-actions-item"
        sx={{
          color: 'rgb(220, 221, 222)'
        }}
      />
      <PushPin
        className="channel-actions-item"
        sx={{
          color: 'rgb(220, 221, 222)'
        }}
      />
      <People
        className="channel-actions-item"
        sx={{
          color: 'rgb(220, 221, 222)'
        }}
      />
      <div className="search-bar">
        <TextField
          sx={{
            backgroundColor: 'rgb(32, 34, 37)',
          }}
          InputProps={{
            sx: {
              color: 'rgb(220, 221, 222)'
            },
            endAdornment: <Search fontSize={'small'}/>
          }}
          size={'small'}
          placeholder={'Search'}
          type={'text'}
          name={'search'}
        />
      </div>
      <div className="notifications">
        <Inbox
          fontSize={'small'}
          sx={{
            color: 'rgb(220, 221, 222)'
          }}
        />
      </div>
      <div className="help">

      </div>
    </div>
  </div>);
}
