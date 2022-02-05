import {useContext, useState} from "react";
import {ChannelsContext} from "../../Providers/ChannelsProvider";
import {AddCircleOutline} from '@mui/icons-material';
import {IDialogOptions, ModalContext} from "../../Providers/ModalProvider";
import {Button, TextField} from "@mui/material";
import './NewChannel.css';

export const NewChannel = () => {
  const {showDialog, hideDialog} = useContext(ModalContext);

  const CreateChannel = () => {
    const {createChannel} = useContext(ChannelsContext);
    const [channel, setChannel] = useState('');

    return (<div className={'new-channel-form'}>
      <TextField
        type={'text'}
        onChange={(e) => {
          setChannel(e.target.value)
        }}
        value={channel}
        placeholder={'Channel name'}
        label={'Channel name'}

        sx={{
          marginTop: '16px'
        }}
      />
      <Button
        sx={{
          marginTop: '16px'
        }}
        variant={'contained'}
        disabled={channel === ''}
        onClick={async (e) => {
          try {
            await createChannel(channel);
            hideDialog();
          } catch (e) {

          }

        }}
      >
        Create
      </Button>
    </div>)
  }

  const onCreateChannel = () => {
    const dialogOptions = {
      title: 'Create channel',
      content: <CreateChannel/>
    } as IDialogOptions;

    showDialog(dialogOptions);
  }

  return (<div className={'new-channel'}>
      <AddCircleOutline
        onClick={onCreateChannel}
        fontSize={'large'}
        className={'new-channel-icon'}
      />

    </div>
  )
}
