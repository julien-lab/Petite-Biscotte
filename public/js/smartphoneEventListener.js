import {getIo} from "./smartphone.js";
import {createURLFromBase64Audio} from "./messageDOM/messageDOM.js";

const container = document.querySelector('.chat-messages');
const stopMusic = document.getElementById('stopMusic');
const startTrack = document.getElementById('startTrack');
const volumeInput = document.getElementById("volume");
const startRecord = document.getElementById('startRecord');
const volumeButton = document.getElementById('volumeButton');
const volumeDiv = document.getElementById('divVolume');
const chatForm = document.getElementById('chat-form');
const leaveRoom = document.getElementById('leave-btn');
const switch1 = document.getElementById('customSwitches1');
const switch2 = document.getElementById('customSwitches2');
const switch3 = document.getElementById('customSwitches3');

let sendVocalForm;
let socket;

export function setIo(){
    socket = getIo();
}

export let alreadySentLogos = new Map()
initLogos()

function initLogos(){
    alreadySentLogos.set("⬙", false);
    alreadySentLogos.set("⬔", false);
    alreadySentLogos.set("▣", false);
    alreadySentLogos.set("▬", false);
    alreadySentLogos.set("▧", false);
    alreadySentLogos.set("♠", false);
    alreadySentLogos.set("♣", false);
    alreadySentLogos.set("♥", false);
    alreadySentLogos.set("♦", false);
    alreadySentLogos.set("φ", false);
}

switch1.addEventListener('click', (e) => {
    e.preventDefault();
    if (switch1.checked) {
        socket.emit("hideTrack1", "false");
    } else {
        socket.emit("hideTrack1", "true");
    }
})

switch2.addEventListener('click', (e) => {
    e.preventDefault();
    if (switch2.checked) {
        socket.emit("hideTrack2", "false");
    } else {
        socket.emit("hideTrack2", "true");
    }
})

switch3.addEventListener('click', (e) => {
    e.preventDefault();
    if (switch3.checked) {
        socket.emit("hideTrack3", "false");
    } else {
        socket.emit("hideTrack3", "true");
    }
})

stopMusic.addEventListener('click', (e) => {
    socket.emit('stopTrack', 'stop');
})

// On start track
startTrack.addEventListener('click', (e) => {
    socket.emit('warnBeforeChange')
    setTimeout(function() {socket.emit('askTochangeSmartphoneDisplay', 'please');}, 5000);

})

// Volume on change
volumeInput.addEventListener('change', (e) => {
    socket.emit("VolumeControl", 'lost');
    socket.emit("changingVolume",volumeInput.value);
})

startRecord.addEventListener('click',(e) => {
    let div = document.getElementById('holderObject');
    if (div != null) div.remove();
});

volumeButton.addEventListener('click', () => {
    socket.emit("VolumeControl", 'lost');
    volumeInput.style.display = 'block';
    volumeDiv.style.display = 'none';
});

// vocal and tag submit
export const listenSendButton = function(base64Audio) {
    sendVocalForm = document.getElementById('sendVocal');
    sendVocalForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // text
        let msg = document.getElementById('msg').value;
        msg = msg.trim();
        if (msg) {
            socket.emit('chatMessage', msg);
            document.getElementById('msg').value = '';
        }

        // audio
        socket.emit('chatMessage',base64Audio);
        addSound(createURLFromBase64Audio(base64Audio))
        base64Audio = null;
        let div = document.getElementById('holderObject');
        div.remove();
    });
}

container.addEventListener('click', async function (e) {
    // audio
    let localBase64 ;
    if (e.target.classList.contains('btn')) {
        let blob = await fetch(e.target.value).then(r => r.blob());
        let reader = new window.FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function() {
            localBase64 = reader.result;
            localBase64 = localBase64.split(',')[1];
            if(alreadySentLogos.get(e.target.parentNode.firstElementChild.value) === false){
                alreadySentLogos.set(e.target.parentNode.firstElementChild.value,true)
                socket.emit('logo', e.target.parentNode.firstElementChild.value)
                socket.emit('connectedTableAudioData', localBase64);
                socket.emit('updateMap',e.target.parentNode.firstElementChild.value)
                e.target.parentNode.firstElementChild.remove()
                e.target.style.display = 'none';
            }
            else{
                alert("Logo déjà utilisé")
            }
        }
    }
});

leaveRoom.addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
        window.location = '../index.html';
    } else {
    }
});
