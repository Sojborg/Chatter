import {User} from "./Models/User";
import {Chat} from "./Models/Chat";

const users: any[] = [];

export const addUser = ({name, room}: { name: string, room: string }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user: any) => user.room === room && user.name === name);

  // if (!name || !room) return {error: 'Username and room are required.'};
  // if (existingUser) return {error: 'Username is taken.'};

  const user = {name, room};

  users.push(user);

  return {user};
}

export const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
}

export const getUser = (id: string) => {
  return User.findById(id);
};

export const getUsersInRoom = async (room: string) => {
  const users = await Chat
    .find({channelId: room})
    .distinct('userId')
    .exec();
  return users;
}

module.exports = {addUser, removeUser, getUser, getUsersInRoom};
