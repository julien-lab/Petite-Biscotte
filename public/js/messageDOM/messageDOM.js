var logo = "";

export const setLogo = function(newLogo){
    logo = newLogo
}

function convertURIToBinary(base64) {
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

export const addAudioToConnectedTable = function(audioURL){
    console.log("connectedtable",audioURL)
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
        console.log("hello")
        const bouton = document.getElementById(buttonID);
        bouton.innerHTML = "&#9658;";
    }
    importedAudioDiv.appendChild(audio);
    const newTrack = document.getElementById('newTrack');
    const button = document.createElement('button');
    button.classList = "btn_listen_sent";
    button.id = buttonID;
    button.ontouchend = function () {
        touchend(event);
    }
    button.onclick = function(){
        playPause(audioID,buttonID);
    }
    button.innerHTML = '&#9658';

    let name = document.createElement('div')
    name.classList.add("info")
    name.textContent = logo

    circle.appendChild(button)
    card.appendChild(circle)
    card.appendChild(name)
    card_container.appendChild(card)
    newTrack.appendChild(card_container);
    /*const infoDiv = document.createElement('div');
    infoDiv.classList = 'info';
    infoDiv.innerHTML = "";
    newTrack.appendChild()*/
    /*
    <div class="card-container" draggable="true" ondragstart="startDrag(event)">
        <div class="card">
          <div class="circle">
            <button class="btn_listen" id="playPauseBtn9" onClick="playPause('Boum','playPauseBtn9')">&#9658</button>
          </div>
        <div class="info">Boum</div>
      </div>
    </div>
     */
}
