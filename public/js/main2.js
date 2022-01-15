const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
var messageDOM;

require(['./messageDOM/messageDOM2'], result => {
  messageDOM = result;
  
  // Get username and room from URL
  const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const socket = io();

  // Join chatroom
  socket.emit('joinRoom', { username, room });

  // Get room and users
  socket.on('roomUsers', ({ room, users }) => {
    messageDOM.outputRoomName(room,roomName);
    messageDOM.outputUsers(users,userList);
  });

  // Message from server
  socket.on('message', (message) => {
    console.log(message);
    messageDOM.outputMessage(message);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });

  // Message submit
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get message text
    let msg = e.target.elements.msg.value;

    msg = msg.trim();

    if (!msg) {
      return false;
    }

    // Emit message to server
    socket.emit('chatMessage', msg);

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
  });

  //Prompt the user before leave chat room
  document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
      window.location = '../index.html';
    } else {
    }
  });

}); 

