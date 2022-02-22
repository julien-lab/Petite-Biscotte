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
let sendVocalForm;
let socket;

export function setIo(){
    socket = getIo();
}

stopMusic.addEventListener('click', (e) => {
    socket.emit('stopTrack', 'stop');
})

// On start track
startTrack.addEventListener('click', (e) => {
    socket.emit('askTochangeSmartphoneDisplay', 'please');
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

// vocal submit
export const listenSendButton = function(base64Audio) {
    sendVocalForm = document.getElementById('sendVocal');
    sendVocalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        socket.emit('chatMessage',base64Audio);
        addSound(createURLFromBase64Audio(base64Audio))
        base64Audio = null;
        let div = document.getElementById('holderObject');
        div.remove();
    });
}


// Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let msg = e.target.elements.msg.value;
    msg = msg.trim();
    if (!msg) {
        return false;
    }
    socket.emit('chatMessage', msg);
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

container.addEventListener('click', async function (e) {
    let localBase64 ;
    if (e.target.classList.contains('btn')) {
        let blob = await fetch(e.target.value).then(r => r.blob());
        let reader = new window.FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function() {
            localBase64 = reader.result;
            localBase64 = localBase64.split(',')[1];
            socket.emit('logo', document.getElementById('dropdown').value)
            socket.emit('connectedTableAudioData', localBase64);
        }
        e.target.style.display = 'none';
    }
});

leaveRoom.addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
        window.location = '../index.html';
    } else {
    }
});
