let cpt = 0;

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

    const inputDiv = addInputSlider(audioURL);

    circle.appendChild(button)
    circle.appendChild(name)
    card.appendChild(circle)
    card.appendChild(inputDiv)
    card_container.appendChild(card)
    newTrack.appendChild(card_container);
}

function addInputSlider(audioURL){
    const outerDiv = document.createElement('div');
    outerDiv.classList.add('settings');
    const wrapperDiv = document.createElement('div');
    const input = document.createElement('input');
    input.type = "range";
    input.id = 'input' + audioURL;
    input.min = "-1000";
    input.max = "1000";
    input.onchange = function (){
        addFilter(audioURL , 'circle9' , input.id);
    }
    wrapperDiv.appendChild(input);
    outerDiv.appendChild(wrapperDiv);
    return outerDiv;
}

