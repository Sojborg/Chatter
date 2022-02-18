import {Schema, model} from 'mongoose';

const ChannelSchema = new Schema(
  {
    name: {type: String, required: true},
  },
  {timestamps: true}
);

export const Channel = model("Channel", ChannelSchema);
