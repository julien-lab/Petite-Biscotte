const socket = io()

function changingVolume(){
    let value = document.getElementById("volume").value
    socket.emit("changingVolume",value)
}

function addSound(audioURL){
    console.log("add sound")
    let card_container = document.createElement('div')
    card_container.classList.add("card-container")
    let card = document.createElement('div')
    card.classList.add("card")
    let circle = document.createElement('div')
    circle.classList.add("circle_sent")


    const importedAudioDiv = document.getElementById('importedAudio');
    const audio = document.createElement('audio');
    audio.classList.add('message');
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

    circle.appendChild(button)
    card.appendChild(circle)
    card.appendChild(name)
    card_container.appendChild(card)
    newTrack.appendChild(card_container);
    console.log(newTrack)
}

