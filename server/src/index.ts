import http from 'http';
import express from "express" ;
import cors from 'cors';
import router from './router';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {authRoutes} from "./Routes/Auth";
import {json} from 'body-parser';
import {chatRoutes} from "./Routes/Chat";
import {ChatSocket} from "./Sockets/ChatSocket";
import {usersRoutes} from "./Routes/Users";
import {channelRoutes} from "./Routes/ChannelRoute";

const jsonParser = json();

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.error(err))


const app = express();
app.use(jsonParser);
app.use(cors());
app.use(router);
app.use(authRoutes);
app.use('/api/chat', chatRoutes);
app.use(usersRoutes);
app.use('/api/channel', channelRoutes);


const port = 5000;
const server = http.createServer(app);

const chatSocket = new ChatSocket(server);

server.listen(port);
