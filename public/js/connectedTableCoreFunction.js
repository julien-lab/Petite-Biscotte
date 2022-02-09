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


function printMousePos(event) {

}

function computeAngle(pX, pY){
    centerX = window.innerWidth/2;
    centerY =  window.innerHeight/2;

    hX = centerX;
    hY = 0;

    var HC = Math.sqrt(Math.pow(centerX-hX,2)+ Math.pow(centerY-hY,2));
    var CP = Math.sqrt(Math.pow(centerX-pX,2)+ Math.pow(centerY-pY,2));
    var HP = Math.sqrt(Math.pow(pX-hX,2)+ Math.pow(pY-hY,2));
    var angleRad =  Math.acos((CP*CP+HC*HC-HP*HP)/(2*CP*HC));
    return (angleRad * 180) / Math.PI;
}

//document.addEventListener("click", printMousePos);

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
    const soundName = event.target.firstElementChild.firstElementChild.firstElementChild.name

    event.dataTransfer.setData("id",id)
    event.dataTransfer.setData("str",str)
    event.dataTransfer.setData("soundName",soundName)
}

function onDrop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("id")
    const str = event.dataTransfer.getData("str")
    const soundName = event.dataTransfer.getData("soundName")
    const dropzone = document.getElementById("dropzone")
    //createCopy(dropzone,data,str)

    //Detection de la position du son sur la piste
    var startPos = computeAngle(event.clientX , event.clientY);
    centerX = window.innerWidth/2;

    if(event.clientX < centerX){
        startPos = 180 + (180-startPos);
    }
    console.log(document.getElementById(soundName).duration);

    var conicGradient = constructConicGradient(startPos, document.getElementById(soundName).duration);
    var myDiv = document.getElementById(event.target.id);
    myDiv.setAttribute("style", "background:" + conicGradient);
}


function constructConicGradient(startPos, soundDuration){
    //La loop fait 20sec
    soundPercentage = (soundDuration*100)/20;

    //Calcule de la taille du son sur la piste
    soundLength = (360*soundPercentage)/100;

    var endPos = (startPos+soundLength);
    var cG = "conic-gradient(lightgrey 0deg "+startPos +"deg, orange "+ startPos +"deg "+ endPos+"deg ,lightgrey "+endPos+"deg 360deg);"
    return cG;
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

