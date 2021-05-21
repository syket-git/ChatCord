const chatForm = document.getElementById('chat-form');
const chatMassages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
const room = urlParams.get('room');

const socket = io();

// Join Room emit in server
socket.emit('joinRoom', { username, room });

socket.on('message', (msg) => {
  console.log(msg);
  outputMessage(msg);
  chatMassages.scrollTop = chatMassages.scrollHeight;
});

// Get the users in the room

socket.on('userList', ({ room, users }) => {
  outputRoom(room);
  outputUsers(users);
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;
  socket.emit('chatMessage', msg);
  e.target.elements.msg.value = '';
});

// Output message

const outputMessage = (message) => {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `
  <p class="meta">${message?.name}<span> ${message?.time}</span></p>
  <p class="text">
   ${message?.text}
  </p>
  `;

  document.querySelector('.chat-messages').appendChild(div);
};

// Set Room Name in the Frontend

const outputRoom = (room) => {
  roomName.innerText = room;
};

const outputUsers = (users) => {
  userList.innerHTML = `
  ${users?.map((user) => `<li>${user.username}</li>`).join('')}
  `;
};
