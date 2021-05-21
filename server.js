const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const path = require('path');
const { formatMessage } = require('./utils/message');
const {
  joinUser,
  getCurrentUser,
  disconnectUser,
  roomUsers,
} = require('./utils/user');

app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord Bot';

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = joinUser(socket.id, username, room);

    socket.join(user.room);

    socket.broadcast
      .to(user?.room)
      .emit('message', formatMessage(botName, `${user.username} joined`));
    socket.emit('message', formatMessage(botName, 'Welcome to the ChatCord'));

    // Sent the user list in the frontend
    io.to(user?.room).emit('userList', {
      room: user?.room,
      users: roomUsers(user?.room),
    });
  });

  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user?.room).emit('message', formatMessage(user.username, msg));
  });

  socket.on('disconnect', () => {
    const user = getCurrentUser(socket.id);
    disconnectUser(socket.id);
    // Sent the user list in the frontend
    io.to(user?.room).emit('userList', {
      room: user?.room,
      users: roomUsers(user?.room),
    });
    io.to(user?.room).emit(
      'message',
      formatMessage(botName, `${user?.username} has leave from the ChatCord`)
    );
  });
});

server.listen(3000, () => console.log('Project up and running on 3000'));
