import {addAudioURLToConnectedTable, createURLFromBase64Audio} from './messageDOM/messageDOM.js'
import {setLogo} from './messageDOM/messageDOM.js'
const room = 'connectedTable';
const username = 'connectedTable'
const socket = io();
const track1 = document.getElementById('Track1');
const track2 = document.getElementById('Track2');
const track3 = document.getElementById('Track3');

// Join chatroom
socket.emit('joinRoom', { username, room });

window.addEventListener('contextmenu', function (e) {
    // do something here...
    e.preventDefault();
}, false);

// Message from server
socket.on('newAudioData', (base64Audio) => {
    let url = createURLFromBase64Audio(base64Audio);
    addAudioURLToConnectedTable(url);
});

socket.on('hideTrack1', (msg) => {
    if (msg === 'true') {
        track1.style.display = 'none';
        canPlayTrack1 = false;
    } else {
        track1.style.display = 'block';
        canPlayTrack1 = true;
    }
})

socket.on('hideTrack2', (msg) => {
    if (msg === 'true') {
        track2.style.display = 'none';
        canPlayTrack2 = false;
    } else {
        track2.style.display = 'block';
        canPlayTrack2 = true;
    }
})

socket.on('hideTrack3', (msg) => {
    if (msg === 'true') {
        track3.style.display = 'none';
        canPlayTrack3 = false;
    } else {
        track3.style.display = 'block';
        canPlayTrack3 = true;
    }
})

socket.on('newLogo', (logo) => {
    setLogo(logo);
});

socket.on('newVolume', (volume) => {
    setVolume(volume);
});

socket.on('clearTracks', (e) => {
    clearTracks();
});

socket.on('askTochangeSmartphoneDisplay', (msg) => {
    if (canPlay && soundsOnTracks.length !== 0){
        canPlay = false;
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
