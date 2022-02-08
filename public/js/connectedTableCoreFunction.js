function testff(btn){
    const bouton = document.getElementById(btn);
    bouton.innerHTML = "&#9658;"
}

function touchend(event) {
    const data = event.target.id
    const str = event.target.parentElement.nextElementSibling.textContent
    const dropzone = document.getElementById("dropzone")
    console.log(event.changedTouches[0].pageX,event.changedTouches[0].pageY)
    //if(event.changedTouches[0].pageY >700) createCopy(dropzone,data,str)
}

/*
Piste interieure :
    - gauche : (536,747)
    - droite : (2500,747)
    - haut : (1512,270)
    - bas : (1512,1226)

Piste milieu :
    - gauche : (427,747)
    - droite : (2608,747)
    - haut : (1512,197)
    - bas : (1512,1290)

Piste exterieure :
    - gauche : (278,747)
    - droite : (2756,747)
    - haut : (1512,123)
    - bas : (1512,1366)

 */

function printMousePos(event) {
    console.log("clientX: " + event.clientX +" - clientY: " + event.clientY);
}

document.addEventListener("click", printMousePos);

let count = 0;
function playPause(audioName,btn){
    const audio = document.getElementById(audioName);
    const bouton = document.getElementById(btn);
    if(count === 0){
        count = 1;
        bouton.innerHTML = "&#9208;"
        audio.play();
        audio.onended

    }else{
        count = 0
        audio.pause()
        bouton.innerHTML = "&#9658;"
    }
}

function startDrag(event){
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'all'
    const id = event.target.firstElementChild.firstElementChild.firstElementChild.id
    const str = event.target.firstElementChild.firstElementChild.nextElementSibling.textContent
    event.dataTransfer.setData("id",id)
    event.dataTransfer.setData("str",str)
}

function onDrop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("id")
    const str = event.dataTransfer.getData("str")
    const dropzone = document.getElementById("dropzone")
    createCopy(dropzone,data,str)
}

function createCopy(dropzone,id,str){
    let card_container = document.createElement('div')
    card_container.classList.add("card-container")
    let card = document.createElement('div')
    card.classList.add("card")
    let circle = document.createElement('div')
    circle.classList.add("circle")
    let button = document.createElement('button')
    button.classList.add("btn_listen")
    button.id = id + "drop";
    button.onclick = function(){playPause(str,button.id)}
    button.innerHTML = "&#9658;"
    let name = document.createElement('div')
    name.classList.add("info")
    name.textContent = str
    circle.appendChild(button)
    card.appendChild(circle)
    card.appendChild(name)
    card_container.appendChild(card)
    dropzone.appendChild(card_container)
}

function allowDrop(event) {
    event.preventDefault();
}

