import {addUser, getUser, getUsersInRoom, removeUser} from "../users";
import {Chat} from "../Models/Chat";
import {ObjectId} from "mongodb";
import {Server as HttpServer} from 'http';
import {Server as IoServer} from 'socket.io';

export class ChatSocket {
    
    constructor(httpServer: HttpServer) {
        const io = new IoServer(httpServer, {
            cors: {
                origin: true,
                credentials: true
            }
        });

        io.on('connection', (socket) => {
            console.log('connected');

            socket.on('join', ({name, room}, callback) => {
                console.log('join', name, room)
                const { error, user } = addUser({ id: socket.id, name, room });

                if(error) return callback(error);

                socket.join(user.room);

                socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
                socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

                io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

                callback();

            });

            socket.on('sendMessage', async(message, room, callback) => {
                const user = await getUser('61e68a6a6642d355e0004a99');
                console.log('#### message user ####');
                console.log(user);
                const newChat = new Chat({
                    channelId: new ObjectId('61e68a6a6642d355e0004a91'),
                    userId: new ObjectId(user._id), // '61e68a6a6642d355e0004a99',
                    message,
                    username: user.username
                });
                newChat.save();
                io.to(room).emit('message', { user: user.username, text: message });

                callback();
            });

            socket.on('disconnect', () => {
                const user = removeUser(socket.id);

                if(user) {
                    io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
                    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
                }
            })
        })
    }
} 