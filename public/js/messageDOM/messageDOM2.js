define(function (require, exports, module) {

    // Output message to DOM
    function outputMessage(message) {
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
    }
    
    // Add room name to DOM
    function outputRoomName(room,roomName) {
        roomName.innerText = room;
    }
    
    // Add users to DOM
    function outputUsers(users,userList) {
        userList.innerHTML = '';
        users.forEach((user) => {
        const li = document.createElement('li');
        li.innerText = user.username;
        userList.appendChild(li);
        });
    }

    module.exports = {
        outputMessage,
        outputRoomName,
        outputUsers
    };
  
});

  