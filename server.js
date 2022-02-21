const path = require('path');
const https = require('https');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const fs = require('fs');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

const app = express();

const options = {
  key: fs.readFileSync(path.join(__dirname,'key.pem')),
  cert: fs.readFileSync(path.join(__dirname,'cert.pem'))
};
const server = https.createServer(options, app);



const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Petite Biscotte Bot ';

// Run when client connects
io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    if(user.room === "smartphone") {
      // Welcome current user
      socket.emit('message', formatMessage(botName, 'Welcome to Petite Biscotte!'));

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });

    /*/// Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to Petite Biscotte!'));

    // Broadcast when a user connects
    socket.broadcast
        .to("smartphone") // ------------------------------------------------------------------------------------------------------- Test with user id
        .emit(
            'message',
            formatMessage(botName, `${user.username} has joined the chat`)
        );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });*/

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });

  socket.on('connectedTableAudioData', (audioURL) => {
    io.to("connectedTable").emit('newAudioData', audioURL)
  })

  socket.on('logo', (logo) => {
    socket.to("connectedTable").emit('newLogo', logo)
  })

  socket.on('changingVolume', (volume) => {
    socket.to("connectedTable").emit('newVolume', volume);
    io.to("smartphone").emit('newVolume', volume)
  })

  socket.on('changeSmartphoneDisplay', (msg) => {
    io.emit('changeSmartphoneDisplay', msg);
  })

  socket.on('askTochangeSmartphoneDisplay', (msg) => {
    io.to("connectedTable").emit('askTochangeSmartphoneDisplay',msg);
  })

  socket.on('VolumeControl', (msg) => {
    socket.broadcast
        .to("smartphone")
        .emit('VolumeControl', msg);
    // socket.broadcast.emit('VolumeControl', msg);
  })

});



const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/* ------------------------------------------------------------------------------------------ */

const app2 = express();

const serverUnsafe = http.createServer(app2);

const io2 = socketio(serverUnsafe);

// Set static folder
app2.use(express.static(path.join(__dirname, 'public')));

const botName2 = 'Petite Biscotte Bot ';

// Run when client connects
io2.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    if(user.room === "smartphone") {
      // Welcome current user
      socket.emit('message', formatMessage(botName, 'Welcome to Petite Biscotte!'));

      // Send users and room info
      io2.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }

  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io2.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      // Send users and room info
      io2.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });

  socket.on('connectedTableAudioData', (audioURL) => {
    io2.to("connectedTable").emit('newAudioData', audioURL)
  })

  socket.on('logo', (logo) => {
    io2.to("connectedTable").emit('newLogo', logo)
  })

  socket.on('changingVolume', (volume) => {
    socket.to("connectedTable").emit('newVolume', volume);
    io2.to("smartphone").emit('newVolume', volume)
  })

  socket.on('changeSmartphoneDisplay', (msg) => {
    io2.emit('changeSmartphoneDisplay', msg);
  })

  socket.on('VolumeControl', (msg) => {
    socket.broadcast
        .to("smartphone")
        .emit('VolumeControl', msg);
    // socket.broadcast.emit('VolumeControl', msg);
  })
});

const UnsafePORT = 3001;

serverUnsafe.listen(UnsafePORT, () => console.log(`Server running on port ${UnsafePORT}`));

