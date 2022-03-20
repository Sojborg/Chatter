import http from 'http';
import express from "express" ;
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {authRoutes} from "./Routes/Auth";
import {json} from 'body-parser';
import {chatRoutes} from "./Routes/Chat";
import {ChatSocket} from "./Sockets/ChatSocket";
import {usersRoutes} from "./Routes/Users";
import {channelRoutes} from "./Routes/ChannelRoute";
import path from "path";

const jsonParser = json();

dotenv.config();

console.error('STARTING SERVER');
console.error('MONGOURL: ', process.env.MONGO_URL);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.error('DB CONNECTION ERROR', err))


const app = express();
app.use(jsonParser);
const clientDirPath = __dirname + "/../client/build";
app.use(express.static(clientDirPath));
app.use(cors());
app.use(authRoutes);
app.use('/api/chat', chatRoutes);
app.use(usersRoutes);
app.use('/api/channel', channelRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const chatSocket = new ChatSocket(server);

server.listen(PORT);
