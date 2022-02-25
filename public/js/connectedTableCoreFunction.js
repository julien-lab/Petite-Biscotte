disableScroll();

let lastTrack = "Track1";
let canPlayTrack1 = true;
let canPlayTrack2 = true;
let canPlayTrack3 = true;

const socket = io();

let volume = 0.5;

function setVolume(newVolume){
    volume = newVolume
}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

function touchHandler(event){
    if(event.touches.length > 1){
        event.preventDefault()
    }
}

window.addEventListener("touchstart", touchHandler, false);


function computeAngle(pX, pY){
    let centerX = window.innerWidth/2;
    let centerY =  window.innerHeight/2;

    let hX = centerX;
    let hY = 0;

    let HC = Math.sqrt(Math.pow(centerX-hX,2)+ Math.pow(centerY-hY,2));
    let CP = Math.sqrt(Math.pow(centerX-pX,2)+ Math.pow(centerY-pY,2));
    let HP = Math.sqrt(Math.pow(pX-hX,2)+ Math.pow(pY-hY,2));
    let angleRad =  Math.acos((CP*CP+HC*HC-HP*HP)/(2*CP*HC));
    return (angleRad * 180) / Math.PI;
}

async function playSongWhenTouchOnTrack(event) {
    const x = event.changedTouches[0].pageX;
    const y = event.changedTouches[0].pageY;

    const trackTargeted = document.elementFromPoint(x, y).id;

    if (trackTargeted.slice(0, 5) === "Track") {
        let touchPos = computeAngle(x, y);

        let centerX = window.innerWidth / 2;

        if (x < centerX) {
            touchPos = 180 + (180 - touchPos);
        }
        for (let i = 0; i < soundsOnTracks.length; i++) {
            let sound = soundsOnTracks[i];
            if (sound.track === trackTargeted) {
                if (sound.startPos <= touchPos && touchPos <= sound.endPos) {
                    var isDoubleTaped = doubletap(x, y);
                    let promise = sleep(800);
                    await promise;

                    if(!doubleClickOn ){
                        const audio = document.getElementById(sound.soundName);
                        audio.volume = volume
                        audio.play();
                    }

                    if(isDoubleTaped && doubleClickOn){
                        doubleClickOn=false;
                    }
                    break;
                }
            }
        }
    }

}

//document.addEventListener("touchstart", playSongWhenTouchOnTrack);
//document.addEventListener("touchend", doubletap);
//document.addEventListener("touchmove", previewSoundOnTrack);


function extracted(event) {
    let soundName
    if (event.target.classList[0] === "circle" || event.target.classList[0] === "circle_sent") soundName = event.target.firstElementChild.name
    else if (event.target.classList[0] === "btn_listen" || event.target.classList[0] === "btn_listen_sent") soundName = event.target.name
    else if (event.target.classList[0] === "info") soundName = event.target.parentNode.firstElementChild.name
    return soundName;
}

function previewSoundOnTrack(event){
    const x = event.changedTouches[0].pageX;
    const y = event.changedTouches[0].pageY;

    const trackTargeted = document.elementFromPoint(x, y).id;

    if(trackTargeted.slice(0, 5) === "Track" ){
        if(lastTrack !== trackTargeted){
            clearTrackFromPreview(lastTrack);
        }

        let startPos = computeAngle(x , y);

        let centerX = window.innerWidth/2;

        if(x < centerX){
            startPos = 180 + (180-startPos);
        }

        const soundName = extracted(event);

        let soundPercentage = (document.getElementById(soundName).duration*100)/20;
        let soundLength = (360*soundPercentage)/100;
        let endPos = Math.round(startPos+soundLength);

        let soundsOnTrackTemp = [...soundsOnTracks];
        let color = '#FFA85C';
        if(!soundCanBePlacedOnTrack(startPos, endPos, trackTargeted)){
            color = 'red';
        }
        soundsOnTrackTemp.push({'startPos':startPos,'endPos':endPos,'color': color, 'track':trackTargeted, 'soundName':soundName});
        soundsOnTrackTemp = sortSoundsByStartPos(soundsOnTrackTemp);
        let conicGradient = writeConicGradientString(trackTargeted, soundsOnTrackTemp);
        let trackDiv = document.getElementById(trackTargeted);
        trackDiv.setAttribute("style", "background:" + conicGradient);
        lastTrack = trackTargeted;
    }
}

function clearTrackFromPreview(track) {
    let conicGradient = writeConicGradientString(track, soundsOnTracks);
    let trackDiv = document.getElementById(track);
    trackDiv.setAttribute("style", "background:" + conicGradient);
}


var mylatesttap ;
var doubleClickOn = false;
function doubletap(x, y) {
    var isDoubleTaped = false;
    const trackTargeted = document.elementFromPoint(x, y).id;

    let now = new Date().getTime();
    let timesince = now - mylatesttap;
    if((timesince < 600) && (timesince > 0)){
        console.log("DOUBLE CLICK");
        isDoubleTaped = true;
        if(trackTargeted.slice(0, 5) === "Track" ){
            let touchPos = computeAngle(x , y);
            let centerX = window.innerWidth/2;
            doubleClickOn = true;
            if(x < centerX){
                touchPos = 180 + (180-touchPos);
            }
            for (let i=0;i<soundsOnTracks.length;i++) {
                let sound = soundsOnTracks[i];
                if(sound.track === trackTargeted){
                    if(sound.startPos <= touchPos && touchPos <= sound.endPos ){
                        let conicGradient = constructConicGradient(sound.endPos+1, document.getElementById(sound.soundName).duration, trackTargeted , sound.soundName);
                        let trackDiv = document.getElementById(trackTargeted);
                        trackDiv.setAttribute("style", "background:" + conicGradient);
                        break;
                    }
                }
            }
        }

    }else{
        console.log("Simple click")
    }

    mylatesttap = new Date().getTime();
    return isDoubleTaped;
}


function startDrag(event){
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'all';
    const id = event.target.firstElementChild.firstElementChild.firstElementChild.id;
    const str = event.target.firstElementChild.firstElementChild.nextElementSibling.textContent;
    const soundName = event.target.firstElementChild.firstElementChild.firstElementChild.name;

    event.dataTransfer.setData("id",id);
    event.dataTransfer.setData("str",str);
    event.dataTransfer.setData("soundName",soundName)
}

function touchend(event) {
    //let logo = null
    clearTrackFromPreview(lastTrack);
    const x = event.changedTouches[0].pageX;
    const y = event.changedTouches[0].pageY;

    const soundName = extracted(event)
    console.log(event.target.id)
    let condition = event.target.id.substr(0,1)
    /*if (condition === 'p'){
        logo = document.getElementById("logo"+event.target.id.substr(12,14))
    } else if(condition === 'c'){
        logo = document.getElementById("logo"+event.target.id.substr(6,8))
    } else if(condition === 'l'){
        logo = document.getElementById("logo"+event.target.id.substr(4,6))

    }
    console.log(logo)
    console.log(logo.innerHTML)*/


    const trackTargeted = document.elementFromPoint(x, y).id;

    if(trackTargeted.slice(0, 5) === "Track" ){
        let startPos = Math.round(computeAngle(x , y));
        let centerX = window.innerWidth/2;

        if(x < centerX){
            startPos = 180 + (180-startPos);
        }

        let conicGradient = constructConicGradient(startPos, document.getElementById(soundName).duration, trackTargeted , soundName);
        let trackDiv = document.getElementById(trackTargeted);
        trackDiv.setAttribute("style", "background:" + conicGradient);
    }

}

function disableScroll() {
    // Get the current page scroll position
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {add
            window.scrollTo(scrollLeft, scrollTop);
        };
}


function onDrop(event) {
    event.preventDefault();
    const soundName = event.dataTransfer.getData("soundName")

    const trackTargeted = event.target.id;
    //Detection de la position du son sur la piste
    let startPos = Math.round(computeAngle(event.clientX , event.clientY))
    let centerX = window.innerWidth/2;

    if(event.clientX < centerX){
        startPos = 180 + (180-startPos);
    }

    console.log(document.getElementById(soundName).duration);
    console.log(trackTargeted);

    let conicGradient = constructConicGradient(startPos, document.getElementById(soundName).duration, trackTargeted , soundName);
    let trackDiv = document.getElementById(trackTargeted);
    trackDiv.setAttribute("style", "background:" + conicGradient);
}

var soundsOnTracks= [];

function constructConicGradient(startPos, soundDuration, trackTargeted, soundName){
    //La loop fait 20sec
    let soundPercentage = (soundDuration*100)/20;

    //Calcule de la taille du son sur la piste
    let soundLength = (360*soundPercentage)/100;

    //Calcule la position de fin du son
    let endPos = Math.round(startPos+soundLength);

    //Enregistre les positions d'un nouveau son dans une chaine JSON si le son ne déborde pas sur un autre
    addSound(startPos, endPos, trackTargeted, soundName);
    //console.log((startPos+endPos)/2)

    return writeConicGradientString(trackTargeted, soundsOnTracks);
}

function writeConicGradientString(trackTargeted, sOT){
    let endPosPreviousSound = 0;
    let conicGradient = "conic-gradient(";
    for (let i=0;i<sOT.length;i++) {
        let sound = sOT[i];
        if(sound.track === trackTargeted){
            conicGradient+= "lightgrey "+endPosPreviousSound +"deg "+sound.startPos +"deg, "+ sound.color +" "+ sound.startPos +"deg "+ sound.endPos+"deg, ";
            endPosPreviousSound = sound.endPos;
        }
    }
    conicGradient+= "lightgrey "+endPosPreviousSound+"deg 360deg);";
    return conicGradient;

}

function addSound(startPos, endPos, trackTargeted, soundName){
    if(soundCanBePlacedOnTrack(startPos, endPos, trackTargeted)){
        let color;
        if(soundName.slice(0, 4) ==="blob"){
            color = "#10A9AE";
        }else{
            color = "#FD7905"
        }
        soundsOnTracks.push({'startPos':startPos,'endPos':endPos,'color':color, 'track':trackTargeted, 'soundName':soundName});
        //console.log(soundsOnTracks)
        soundsOnTracks = sortSoundsByStartPos(soundsOnTracks);
    }else{
        let audio = document.getElementById("error404");
        audio.play();
    }

}

function soundCanBePlacedOnTrack(startPos, endPos, trackTargeted) {
    let test = true;

    for (let i=0;i<soundsOnTracks.length;i++) {
        let sound = soundsOnTracks[i];
        if(sound.track === trackTargeted){
            let a = {start: startPos, end: endPos};
            let b = {start: sound.startPos, end: sound.endPos};
            let min = (a.start < b.start  ? a : b);
            let max = (min == a ? b : a);

            if (!(min.end < max.start)){
                test = false;
                //alert("Impossible de superposer 2 sons sur la même piste.")
                break;
            }
        }
    }

    if(endPos >360){
        //alert("Impossible le son est trop long.")
        test = false;
    }

    return test
}

function sortSoundsByStartPos(sOT){
    return sOT.sort(function(a, b) {
        let x = a['startPos']; let y = b['startPos'];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

let canPlay = true;

function stopComposition(){
    for (let i = 0; i < 360; i++) {
        for (let j=0;j<soundsOnTracks.length;j++) {
            let sound = soundsOnTracks[j];
            if(sound.startPos === i){
                let audio = document.getElementById(sound.soundName);
                audio.volume = volume;
                audio.muted = true;
                audio.pause();
                audio.currentTime = 0;
            }
        }
    }
}

let exit = false;
let canSuppress = true

async function playComposition() {
    // sert à arrêter les audioz avant le démarrage de la piste par exemple quand un audio est en train d'être écouté
    stopComposition();
    initCursor('Track1');
    initCursor('Track2');
    initCursor('Track3');
    if (!canPlay || soundsOnTracks.length === 0) return;
    socket.emit('changeSmartphoneDisplay', 'changeState');
    canPlay = false;
    canSuppress = false;
    for (let i = 0; i < 720; i++) {
        console.log('hello')

        let promise = sleep(55);
        for (let j=0;j<soundsOnTracks.length;j++) {
            //if (canPlayTrack1 &&)
            let sound = soundsOnTracks[j];
            if(sound.startPos === i &&
                ((sound.track === 'Track1' && canPlayTrack1) || (sound.track === 'Track2' && canPlayTrack2) || (sound.track === 'Track3' && canPlayTrack3))){
                let audio = document.getElementById(sound.soundName);
                audio.volume = volume;
                if(!audio.paused){
                    audio.currentTime = 0
                }
                audio.muted = false;
                audio.play();
            }
        }
        if (exit) break

        await promise;
    }
    canSuppress = true
    exit = false;
    canPlay = true;
    socket.emit('changeSmartphoneDisplay', "changeState");
    socket.emit('VolumeControl', 'reset');
    socket.emit("hideTrack1", "false");
    socket.emit("hideTrack2", "false");
    socket.emit("hideTrack3", "false");

}

function initCursor(track){
    var trackDiv = document.getElementById(track);
    const height = trackDiv.offsetHeight;
    const width = trackDiv.offsetWidth;
    console.log(height, width);

    const sH = window.screen.height;
    const sW = window.screen.width;

    var hPercentage;
    var wPercentage;
    if(track === 'Track1'){
        hPercentage = 87.5;
        wPercentage =98;
    }else if(track === 'Track2'){
        hPercentage = 77.1;
        wPercentage =88;
    }else{
        hPercentage = 67.5;
        wPercentage =78;
    }
    var hPxToAdd = (sH - ((sH*hPercentage)/100));
    var wPxToAdd = (sW - ((sW*wPercentage)/100));
    moveCursor((height/2),(width/2), hPxToAdd, wPxToAdd, track);
}



async function moveCursor(h, w, hPxToAdd, wPxToAdd, track) {
   var test = true;
   var i = 540;
    while(test){
        let promise = sleep(27.5);
        var x = wPxToAdd + w + (w * Math.cos((i/2) * Math.PI / 180));
        var y = hPxToAdd + h + (h * Math.sin((i/2) * Math.PI / 180));
        if(track === 'Track1'){
            $('#cursor1').css({left: x, top: y});
        }else if(track === 'Track2'){
            $('#cursor2').css({left: x, top: y});
        }else{
            $('#cursor3').css({left: x, top: y});
        }
        i++;
        if(i === 721){
            i=0;
        }
        if(i === 539){
            test = false;
        }
        await promise;
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function allowDrop(event) {
    event.preventDefault();
}

function clearTracks(){
    if (canSuppress) {
        soundsOnTracks = [];
        document.getElementById("Track1").style.background = "lightgrey"
        document.getElementById("Track2").style.background = "lightgrey"
        document.getElementById("Track3").style.background = "lightgrey"
    }
}

