import {addUser, getUser, getUsersInRoom, removeUser} from "../users";
import {Chat} from "../Models/Chat";
import {ObjectId} from "mongodb";
import {Server as HttpServer} from 'http';
import {Server as IoServer} from 'socket.io';
import {verify} from 'jsonwebtoken';

export class ChatSocket {

  constructor(httpServer: HttpServer) {
    const io = new IoServer(httpServer, {
      cors: {
        origin: true,
        credentials: true
      }
    });
    io.use((socket, next) => {
      if (socket.handshake.query && socket.handshake.query.token) {
        const token = socket.handshake.query.token as string;

        verify(token, process.env.SECRET_KEY, (err, user) => {
          if (err) return next(new Error('Authentication error'));
          (socket as any).user = user;
          next();
        });
      } else {
        next(new Error('Authentication error'));
      }
    })

    io.on('connection', (socket) => {
      console.log('connected');

      socket.on('join', async ({room}, callback) => {
        console.log('join', room)
        const userId = (socket as any)?.user?.id;
        console.log('userId', userId)
        const user = await getUser(userId);
        console.log('user', user)
        addUser({name: user.email, room});

        socket.join(room);

        socket.emit('message', {user: 'admin', text: `${user.username}, welcome to room ${room}.`});
        socket.broadcast.to(room).emit('message', {user: 'admin', text: `${user.username} has joined!`});

        const usersInRoom = await getUsersInRoom(room);

        const channelUsersPromises = usersInRoom.map(async (x: any) => await getUser(x));

        const channelUsers = await Promise.all(channelUsersPromises);
        io.to(room).emit('roomData', {room: user.room, users: channelUsers});

        callback();

      });

      socket.on('sendMessage', async (message, room, callback) => {
        const userId = (socket as any)?.user?.id;
        if (!userId) throw new Error('Invalid user');

        const user = await getUser(userId);

        const newChat = new Chat({
          channelId: new ObjectId(room),
          userId: new ObjectId(user._id),
          message,
          username: user.username
        });
        newChat.save();
        io.to(room).emit('message', {user: user.username, text: message});

        callback();
      });

      socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
          io.to(user.room).emit('message', {user: 'Admin', text: `${user.email} has left.`});
          io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
        }
      })
    })
  }
}
