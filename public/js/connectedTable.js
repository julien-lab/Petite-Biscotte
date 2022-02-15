    import {
    addAudioURLToConnectedTable,
    convertURIToBinary,
    createURLFromBase64Audio,
    outputAudio
} from './messageDOM/messageDOM.js'
import {setLogo} from './messageDOM/messageDOM.js'
import {outputMessage} from './messageDOM/messageDOM.js'
import {outputRoomName} from './messageDOM/messageDOM.js'
import {outputUsers} from './messageDOM/messageDOM.js'

const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const track = document.querySelector('.soundsss');
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
socket.on('newAudioData', (base64Audio) => {
    let url = createURLFromBase64Audio(base64Audio);
    addAudioURLToConnectedTable(url);
    console.log(url);
});

socket.on('newLogo', (logo) => {
    setLogo(logo)
    console.log(logo);
});

let msg = "Bonjour ceci vient de la table"

socket.emit('talkToConnectedTable', msg)
