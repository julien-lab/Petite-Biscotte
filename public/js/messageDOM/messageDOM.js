var logo = "";

export const setLogo = function(newLogo){
    logo = newLogo
}

export const convertURIToBinary = function(base64) {
    let raw = window.atob(base64);
    let rawLength = raw.length;
    let arr = new Uint8Array(new ArrayBuffer(rawLength));
    for (let i = 0; i < rawLength; i++) {
      arr[i] = raw.charCodeAt(i);
    }
    return arr;
  }

function addHeaderAudio(audio, divLeft){
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = audio.username;
    p.innerHTML += `<span>${audio.time}</span>`;
    divLeft.appendChild(p);
}

function addAudio(audio, divLeft, div){
    let binary = convertURIToBinary(audio.text);
    let blob = new Blob([binary], {
        type: 'audio/wav'
    });
    let url = (window.URL || window.webkitURL)
        .createObjectURL(blob);
    let sound = document.createElement('audio');
    sound.controls = 'controls';
    sound.src = url;
    sound.id = url;
    divLeft.appendChild(sound);
    div.appendChild(divLeft);
}

function addConnectedTableButton(divRight, div, buttonValue){
    divRight.classList.add('divSendAudio');
    divRight.innerHTML = ' <select id="dropdown">\n' +
        '          <option class="dropdown-child">&#11033;</option>\n' +
        '          <option class="dropdown-child">&#11028;</option>\n' +
        '          <option class="dropdown-child">&#9635;</option>\n' +
        '          <option class="dropdown-child">&#9644;</option>\n' +
        '          <option class="dropdown-child">&#9639;</option>\n' +
        '          <option class="dropdown-child">&#9824;</option>\n' +
        '          <option class="dropdown-child">&#9827;</option>\n' +
        '          <option class="dropdown-child">&#9829;</option>\n' +
        '          <option class="dropdown-child">&#9830;</option>\n' +
        '          <option class="dropdown-child">&#966;</option>\n' +
        '        </select>' +
                '<button class="btn" value="'+buttonValue+'"><i class="fas fa-paper-plane"></i> Send to table</button>';
    div.appendChild(divRight);
}

export const createURLFromBase64Audio = function(base64Audio){
    let binary = convertURIToBinary(base64Audio);
    let blob = new Blob([binary], {
        type: 'audio/wav'
    });
    return (window.URL || window.webkitURL)
        .createObjectURL(blob);
}

export const outputAudio = function(audio) {
    const div = document.createElement('div');
    div.classList.add('audio');
    const divLeft = document.createElement('div');
    const divRight = document.createElement('div');
    addHeaderAudio(audio, divLeft);
    addAudio(audio, divLeft, div);
    addConnectedTableButton(divRight, div, divLeft.children[1].src);
    document.querySelector('.chat-messages').appendChild(div);
}

// Output message to DOM
export const outputMessage = function(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div); // ICI
};

// Add room name to DOM
export const outputRoomName = function(room,roomName) {
    roomName.innerText = room;
};

// Add users to DOM
export const outputUsers = function(users,userList) {
    userList.innerHTML = '';
    users.forEach((user) => {
        const li = document.createElement('li');
        li.innerText = user.username;
        userList.appendChild(li);
    });
};

export const addAudioURLToConnectedTable = function(audioURL){
    const newTrack = document.getElementById('newTrack');
    let card_container = document.createElement('div')
    let card = document.createElement('div')
    let circle = document.createElement('div')

    // Configure les classes et le drag and drop
    setClasses(card_container, card, circle, audioURL);

    // Rajoute l'audio dans le carousel des nouveaux sons sur la table
    addImportedDiv(audioURL, card_container);

    // Cr??e un bouton pour jouer l'audio
    const button = createButtonToPlayAudio(audioURL);

    // Ajoute le logo sur l'audio
    let name = addAudioLogo();

    // Ajouter input slider et r??cup??rer les valeurs des effets quand ils ??taient sur le t??l??phone
    const inputDiv = addInputSlider(audioURL, circle);

    circle.appendChild(button)
    circle.appendChild(name)
    card.appendChild(circle)
    card.appendChild(inputDiv)
    card_container.appendChild(card)
    newTrack.appendChild(card_container);
}

function setClasses(card_container, card, circle, audioURL){
    card_container.classList.add("card-container");
    card.classList.add("card");
    circle.classList.add("circle_sent");
    circle.id = 'circle' + audioURL;
    circle.addEventListener("touchend",touchend)
    circle.addEventListener("touchmove",previewSoundOnTrack)
    card_container.draggable = true;
    card_container.ondragstart= function () {
        startDrag(event);
    };
}

function addImportedDiv(audioURL, card_container) {
    const importedAudioDiv = document.getElementById('importedAudio');
    const audio = document.createElement('audio');
    audio.classList.add('message');
    let audioID = audioURL;
    audio.id = audioURL;
    card_container.title = audioID;
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
    return button;
}

function addAudioLogo() {
    let name = document.createElement('div');
    name.classList.add("info");
    name.textContent = logo;
    return name;
}

function addInputSlider(audioURL, circle) {
    const outerDiv = document.createElement('div');
    outerDiv.classList.add('settings');
    const wrapperDiv = document.createElement('div');
    const input = document.createElement('input');
    input.type = "range";
    input.id = 'input' + audioURL;
    input.min = "-1000";
    input.max = "1000";
    input.value = "-1000"
    input.onchange = function (){
        addFilter(audioURL , circle.id , input.id);
    }
    wrapperDiv.appendChild(input);
    outerDiv.appendChild(wrapperDiv);
    return outerDiv;
}
