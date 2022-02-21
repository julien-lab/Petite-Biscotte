    import {
    addAudioURLToConnectedTable,
    createURLFromBase64Audio,
} from './messageDOM/messageDOM.js'
import {setLogo} from './messageDOM/messageDOM.js'

const track = document.querySelector('.soundsss');
const carouselWidth = document.querySelector('.carousel-container').offsetWidth;
let $ = jQuery;
const room = 'connectedTable';
const username = 'connectedTable'
const socket = io();
const playButton = document.getElementById('btn_listenAll');

// Join chatroom
socket.emit('joinRoom', { username, room });

// Message from server
socket.on('newAudioData', (base64Audio) => {
    let url = createURLFromBase64Audio(base64Audio);
    addAudioURLToConnectedTable(url);
});

socket.on('newLogo', (logo) => {
    setLogo(logo);
});

socket.on('newVolume', (volume) => {
    setVolume(volume);
});

socket.on('askTochangeSmartphoneDisplay', (msg) => {
    if (canPlay && soundsOnTracks.length !== 0){
        playComposition();
    }
    else {
        console.log("nope")
    }
})

socket.on('stopTrack', (msg) => {
    exit = true;
    stopComposition();
})
