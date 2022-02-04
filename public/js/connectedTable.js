const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const startRecord = document.getElementById('startRecord');
let base64Audio;
let listObject;
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const track = document.querySelector('.track');
const carouselWidth = document.querySelector('.carousel-container').offsetWidth

next.addEventListener('click', () => {
    track.style.transform = `translateX(-${carouselWidth}px)`;
});

prev.addEventListener('click', () => {
    track.style.transform = `translateX(-${0}px)`;
});

jQuery(document).ready(function () {
    myRecorder.stop(listObject);
})
