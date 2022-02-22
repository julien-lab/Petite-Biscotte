import {addAudioURLToConnectedTable, createURLFromBase64Audio, outputAudio} from './messageDOM/messageDOM.js'
import {outputMessage} from './messageDOM/messageDOM.js'
import {outputRoomName} from './messageDOM/messageDOM.js'
import {outputUsers} from './messageDOM/messageDOM.js'
import {setIo, listenSendButton} from "./smartphoneEventListener.js";

const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const volumeInput = document.getElementById("volume");
const volumeDiv = document.getElementById('divVolume');
let isPlaying = false;
const room = 'smartphone';
const username = 'smartphone'

const socket = io();

setIo();

export function getIo(){
  return socket;
}

let circle = new ProgressBar.Circle('#container', {
  strokeWidth: 6,
  duration: 20000,
  color: '#FF0000',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: null
});

window.onresize = function(){ getOrientation(); }

function getOrientation(){
  if (window.innerWidth > window.innerHeight) {
    socket.emit('clearTracks', 'youhouuuuuuuuuuu');
  }
}

socket.emit('joinRoom', { username, room });

socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room,roomName);
  outputUsers(users,userList);
});

socket.on('changeSmartphoneDisplay', (msg) => {
  isPlaying = !isPlaying
  if(isPlaying) {
    document.getElementById("chat").style.display = "none";
    document.getElementById("playing").style.display = "block";
    circle.set(0);
    circle.animate(1);
  }
  else{
    document.getElementById("chat").style.display = "block";
    document.getElementById("playing").style.display = "none";
  }
});

socket.on('message', (message) => {
  if (message.text.length < 1500 ) outputMessage(message);
  else outputAudio(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on('newVolume', (volume) => {
  console.log(volume)
  volumeInput.value = volume;
});

socket.on('VolumeControl', (msg) => {
  if (msg === 'lost') {
    volumeInput.style.display = 'none';
    volumeDiv.style.display = 'block';
  }
  else if (msg === 'reset'){
    volumeInput.style.display = 'block';
    volumeDiv.style.display = 'none';
  }
});

