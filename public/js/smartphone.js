import {outputAudio} from './messageDOM/messageDOM.js'
import {outputMessage} from './messageDOM/messageDOM.js'
import {outputRoomName} from './messageDOM/messageDOM.js'
import {outputUsers} from './messageDOM/messageDOM.js'
import {setIo, listenSendButton} from "./smartphoneEventListener.js";
import {alreadySentLogos} from "./smartphoneEventListener.js";

const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const volumeInput = document.getElementById("volume");
const volumeDiv = document.getElementById('divVolume');
let isPlaying = false;
const room = 'smartphone';
const username = 'smartphone'

const socket = io();

let audioMap = new Map();

function setAudioMap() {
  audioMap.set("beatbox2", 'playPauseBtn1');
  audioMap.set("trompette", 'playPauseBtn2');
  audioMap.set("beatbox1", 'playPauseBtn3');
  audioMap.set("pouet", 'playPauseBtn4');
  audioMap.set("pouet2", 'playPauseBtn5');
  audioMap.set("Toc", 'playPauseBtn6');
  audioMap.set("Flip", 'playPauseBtn7');
  audioMap.set("Badada", 'playPauseBtn8');
  audioMap.set("Boum", 'playPauseBtn9');
}
setAudioMap();

setIo();

export function getIo(){
  return socket;
}

let circle = new ProgressBar.Circle('#container', {
  strokeWidth: 6,
  duration: 21500,
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

socket.on('hideTrack1', (msg) => {
  const switch1 = document.getElementById('customSwitches1');
  switch1.checked = msg !== 'true';
})

socket.on('hideTrack2', (msg) => {
  const switch2 = document.getElementById('customSwitches2');
  switch2.checked = msg !== 'true';
})

socket.on('hideTrack3', (msg) => {
  const switch3 = document.getElementById('customSwitches3');
  switch3.checked = msg !== 'true';
})

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
    // stopper les audios en cours et remttre tous les audios à 0
    for (let audio of document.getElementsByTagName('audio')){
        if (audio.currentTime !==0 && audio.paused === false){
          let button = document.getElementById('button' + audio.id)
          if (button !== undefined && button !== null ) {
            button.click();
          }
          else {
            button = document.getElementById(audioMap.get(audio.id));
            button.click()
          }
        }
        audio.currentTime = 0;
    }
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

socket.on("newMap",(choice)=>{
  alreadySentLogos.set(choice,true)
})

