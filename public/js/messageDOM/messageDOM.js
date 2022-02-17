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
    let card_container = document.createElement('div')
    card_container.classList.add("card-container")
    let card = document.createElement('div')
    card.classList.add("card")
    let circle = document.createElement('div')
    circle.classList.add("circle_sent")
    card_container.draggable = true;
    card_container.ondragstart= function () {
        startDrag(event);
    };



    const importedAudioDiv = document.getElementById('importedAudio');
    const audio = document.createElement('audio');
    audio.classList.add('message');
    let audioID = audioURL;
    let buttonID = 'button' + audioURL;
    audio.id = audioURL;
    card_container.title = audioID;
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
    button.addEventListener("touchend",touchend)
    button.onclick = function(){
        playPause(audioID,buttonID);
    }
    button.name = audioID;
    button.innerHTML = '&#9658';

    let name = document.createElement('div')
    name.classList.add("info")
    name.textContent = logo

    circle.appendChild(button)
    card.appendChild(circle)
    card.appendChild(name)
    card_container.appendChild(card)
    newTrack.appendChild(card_container);
}
