let cpt = 0;

function addSound(audioURL){
    const newTrack = document.getElementById('newTrack');
    let card_container = document.createElement('div');
    let card = document.createElement('div');
    let circle = document.createElement('div');

    // Ajoute les classes des divs principales
    setClasses(card_container, card, circle, audioURL)

    // Rajoute l'audio dans le carousel des nouveaux sons sur le téléphone
    addImportedDiv(audioURL);

    // Créer le bouton pour jouer l'audio
    const button = createButtonToPlayAudio(audioURL);

    // Créer l'input qui permettra d'ajouter et modifier les effets sur les nouveaux sons enregistrés
    const inputDiv = addInputSlider(audioURL);

    // Avant les logos, affiche 1,2,3,etc pour les nouveaux sons qui ne sont pas envoyés
    let name = tagAudio();

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
        addFilter(audioURL , 'circle' + audioURL , input.id);
    }
    wrapperDiv.appendChild(input);
    outerDiv.appendChild(wrapperDiv);
    return outerDiv;
}

function addImportedDiv(audioURL) {
    const importedAudioDiv = document.getElementById('importedAudio');
    const audio = document.createElement('audio');
    audio.id = audioURL;
    audio.src = audioURL;
    audio.onended = function(){
        const bouton = document.getElementById('button' + audioURL);
        bouton.innerHTML = "&#9658;";
    }
    importedAudioDiv.appendChild(audio);
}

function createButtonToPlayAudio(audioURL){
    const button = document.createElement('button');
    button.classList = "btn_listen_sent";
    button.id = 'button' + audioURL;
    button.onclick = function(){
        playPause(audioURL,'button' + audioURL);
    }
    button.name = audioURL;
    button.innerHTML = '&#9658';
    cpt++;
    return button;
}

function tagAudio() {
    let name = document.createElement('div')
    name.classList.add("info")
    name.innerHTML = cpt.toString()
    return name;
}

function setClasses(card_container, card, circle, audioURL){
    card_container.classList.add("card-container");
    card.classList.add("card");
    circle.classList.add("circle_sent");
    circle.id = 'circle' + audioURL;
}
