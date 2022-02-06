import {addAudioToConnectedTable, outputAudio} from './messageDOM/messageDOM.js'
import {outputMessage} from './messageDOM/messageDOM.js'
import {outputRoomName} from './messageDOM/messageDOM.js'
import {outputUsers} from './messageDOM/messageDOM.js'

const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const track = document.querySelector('.track');
const carouselWidth = document.querySelector('.carousel-container').offsetWidth;
let $ = jQuery;
const room = 'connectedTable';
const username = 'connectedTable'
const socket = io();
// const Yeah = document.getElementById('Yeah');

next.addEventListener('click', () => {
    track.style.transform = `translateX(-${carouselWidth}px)`;
});

prev.addEventListener('click', () => {
    track.style.transform = `translateX(-${0}px)`;
});


// Join chatroom
socket.emit('joinRoom', { username, room });

// Message from server
socket.on('newAudioURL', (audioURL) => {
    addAudioToConnectedTable(audioURL);
    console.log(audioURL);
    // Yeah.src = audioURL;
});
