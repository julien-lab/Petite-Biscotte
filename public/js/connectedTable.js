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

function hideLogos(track,msg){
    let x
    for(let i = 0;i<cptLogos;i++){
        let logo = document.getElementById(i.toString())
        x = logo.style.left.replace("%","")
        console.log("coord : ",x)
        if(track === "Track1"){
            positionsTrack1.forEach(element =>{
                if (element[0]===undefined) return
                if(element[0].toFixed(4).toString()===x){
                    console.log("found")
                    if(msg === "true") logo.style.display = "none"
                    else logo.style.display = "block"
                }
            })
        }
        else if(track === "Track2"){
            positionsTrack2.forEach(element =>{
                if (element[0]===undefined) return
                if(element[0].toFixed(4).toString()===x){
                    if(msg === "true") logo.style.display = "none"
                    else logo.style.display = "block"
                }
            })
        }
        else if(track === "Track3"){
            positionsTrack3.forEach(element =>{
                if (element[0]===undefined) return
                if(element[0].toFixed(4).toString()===x){
                    if(msg === "true") logo.style.display = "none"
                    else logo.style.display = "block"
                }
            })
        }
    }
}

window.addEventListener('contextmenu', function (e) {
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
    hideLogos("Track1",msg)
})

socket.on('hideTrack2', (msg) => {
    if (msg === 'true') {
        track2.style.display = 'none';
        canPlayTrack2 = false;
    } else {
        track2.style.display = 'block';
        canPlayTrack2 = true;
    }
    hideLogos("Track2",msg)
})

socket.on('hideTrack3', (msg) => {
    if (msg === 'true') {
        track3.style.display = 'none';
        canPlayTrack3 = false;
    } else {
        track3.style.display = 'block';
        canPlayTrack3 = true;
    }
    hideLogos("Track3",msg)
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

socket.on('restartTable', () => {
    window.location.reload();
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
