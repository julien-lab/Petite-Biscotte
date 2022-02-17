    import {
    addAudioURLToConnectedTable,
    createURLFromBase64Audio,
} from './messageDOM/messageDOM.js'
import {setLogo} from './messageDOM/messageDOM.js'

const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const track = document.querySelector('.soundsss');
const carouselWidth = document.querySelector('.carousel-container').offsetWidth;
let $ = jQuery;
const room = 'connectedTable';
const username = 'connectedTable'
const socket = io();
const playButton = document.getElementById('btn_listenAll');
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

socket.on('newVolume', (volume) => {
    setVolume(volume)
});

playButton.addEventListener('click',(e) => {
    let msg = "change isPlaying"

    socket.emit('talkToSmartphone', msg)
});
