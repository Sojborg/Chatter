import {Schema, model} from 'mongoose';
import {ObjectId} from 'mongodb';

const ChatSchema = new Schema(
  {
    channelId: {type: ObjectId, required: true},
    userId: {type: ObjectId, required: true},
    message: {type: String, required: true},
    username: {type: String, required: true},
  },
  {timestamps: true}
);

export const Chat = model("Chat", ChatSchema);
