const socket = io()
let cpt = 0;
/*function changingVolume(){
    // let value = document.getElementById("volume").value
    let volumeDiv = document.getElementById("volume");
    socket.emit("VolumeControl", 'lost');
    socket.emit("changingVolume",volumeDiv.value);
}*/

function addSound(audioURL){
    let card_container = document.createElement('div')
    card_container.classList.add("card-container")
    let card = document.createElement('div')
    card.classList.add("card")
    let circle = document.createElement('div')
    circle.classList.add("circle_sent")


    const importedAudioDiv = document.getElementById('importedAudio');
    const audio = document.createElement('audio');
    let audioID = audioURL;
    let buttonID = 'button' + audioURL;
    audio.id = audioURL;
    audio.src = audioURL;
    audio.onended = function(){
        const bouton = document.getElementById(buttonID);
        bouton.innerHTML = "&#9658;";
    }
    importedAudioDiv.appendChild(audio);
    const newTrack = document.getElementById('newTrack');
    const button = document.createElement('button');
    button.classList = "btn_listen_sent";
    button.id = buttonID;
    button.onclick = function(){
        playPause(audioID,buttonID);
    }
    button.name = audioID;
    button.innerHTML = '&#9658';

    let name = document.createElement('div')
    name.classList.add("info")
    name.innerHTML = cpt.toString()
    cpt++

    circle.appendChild(button)
    circle.appendChild(name)
    card.appendChild(circle)
    card_container.appendChild(card)
    newTrack.appendChild(card_container);
}

