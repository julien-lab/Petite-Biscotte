const chatForm = document.getElementById('chat-form');
let sendVocalForm;
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const startRecord = document.getElementById('startRecord');
let base64Audio;
let listObject;
import {outputAudio} from './messageDOM/messageDOM.js'
import {outputMessage} from './messageDOM/messageDOM.js'
import {outputRoomName} from './messageDOM/messageDOM.js'
import {outputUsers} from './messageDOM/messageDOM.js'

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
 });
  
const socket = io();
  
// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room,roomName);
  outputUsers(users,userList);
});

// Message from server
socket.on('message', (message) => {
  if (message.text.length < 1500 ) outputMessage(message);
  else outputAudio(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
}); 

startRecord.addEventListener('click',(e) => {
  var div = document.getElementById('holderObject');
  if (div != null) div.remove();
});

// vocal submit 
function listenSendButton() {
  sendVocalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('chatMessage',base64Audio);
    base64Audio = null;
    // remove the new formed html
    var div = document.getElementById('holderObject');
    div.remove();
  });
}

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





/* ----------------- RECORDING PART ----------------- */




jQuery(document).ready(function () {
  let $ = jQuery;
  let myRecorder = {
    objects: {
      context: null,
      stream: null,
      recorder: null
    },
    init: function () {
      if (null === myRecorder.objects.context) {
        myRecorder.objects.context = new (
          window.AudioContext || window.webkitAudioContext
          );
      }
    },
    start: function () {
      let options = {audio: true, video: false};
      navigator.mediaDevices.getUserMedia(options).then(function (stream) {
        myRecorder.objects.stream = stream;
        myRecorder.objects.recorder = new Recorder(
          myRecorder.objects.context.createMediaStreamSource(stream),
          {numChannels: 1}
        );
        myRecorder.objects.recorder.record();
      }).catch(function (err) {});
    },
    stop: function (listObject) {
      if (null !== myRecorder.objects.stream) {
        myRecorder.objects.stream.getAudioTracks()[0].stop();
      }
      if (null !== myRecorder.objects.recorder) {
        myRecorder.objects.recorder.stop();

        // Validate object
        if (null !== listObject
                && 'object' === typeof listObject
                && listObject.length > 0) {

          // Export the WAV file
          myRecorder.objects.recorder.exportWAV(function (blob) {
            let reader = new window.FileReader();
            reader.readAsDataURL(blob); 
            reader.onloadend = function() {
              base64Audio = reader.result;
              base64Audio = base64Audio.split(',')[1];
            }
            let url = (window.URL || window.webkitURL)
                    .createObjectURL(blob);

            // Prepare the playback
            let audioObject = $('<audio controls></audio>')
                    .attr('src', url);

            // Create send audio button
            let sendObject = $('<form id="sendVocal"><button class="btn"><i class="fas fa-paper-plane"></i> Send</button></form>');

            // Wrap everything in a row
            let holderObject = $('<div class="row" id="holderObject"></div>')
                    .append(audioObject)
                    .append(sendObject)

            // Append to the list
            listObject.append(holderObject);
            
            // Listen to the send audio button
            sendVocalForm = document.getElementById('sendVocal');
            listenSendButton();
          });
        }
      }
    }
  };

  // Prepare the recordings list
  listObject = $('[data-role="recordings"]');

  // Prepare the record button
  $('[data-role="controls"] > button').click(function () {
    // Initialize the recorder
    myRecorder.init();

    // Get the button state 
    let buttonState = !!$(this).attr('data-recording');

    // Toggle
    if (!buttonState) {
      $(this).attr('data-recording', 'true');
      myRecorder.start();
    } else {
      $(this).attr('data-recording', '');
      myRecorder.stop(listObject);
    }
  });
});