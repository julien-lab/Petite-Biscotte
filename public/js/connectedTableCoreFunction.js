disableScroll();

var lastTrack = "Track1";


const socket = io();


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

function playSongWhenTouchOnTrack(event) {
    var x = event.clientX;
    var y = event.clientY;

    const trackTargeted = document.elementFromPoint(x, y).id;

    if(trackTargeted.slice(0, 5) === "Track" ){
        var touchPos = computeAngle(x , y);

        centerX = window.innerWidth/2;

        if(x < centerX){
            touchPos = 180 + (180-touchPos);
        }
        for (var i=0;i<soundsOnTracks.length;i++) {
            var sound = soundsOnTracks[i];
            if(sound.track === trackTargeted){
                if(sound.startPos <= touchPos && touchPos <= sound.endPos ){
                    const audio = document.getElementById(sound.soundName);
                    audio.play();
                    break;
                }
            }
        }
    }
}

document.addEventListener("touchstart", playSongWhenTouchOnTrack);
//document.addEventListener("click", doubletap);
document.addEventListener("touchmove", previewSoundOnTrack);


function previewSoundOnTrack(event){
    var x = event.clientX;
    var y = event.clientY;

    const trackTargeted = document.elementFromPoint(x, y).id;

    if(trackTargeted.slice(0, 5) === "Track" ){
        if(lastTrack !== trackTargeted){
            clearTrackFromPreview(lastTrack);
        }

        var startPos = computeAngle(x , y);

        var centerX = window.innerWidth/2;

        if(x < centerX){
            startPos = 180 + (180-startPos);
        }
        const soundName = event.target.title;
        console.log(soundName);
        var soundPercentage = (document.getElementById(soundName).duration*100)/20;
        var soundLength = (360*soundPercentage)/100;
        var endPos = Math.round(startPos+soundLength);

        var soundsOnTrackTemp = [...soundsOnTracks];
        var color = '#FFA85C';
        if(!soundCanBePlacedOnTrack(startPos, endPos, trackTargeted)){
            color = 'red';
        }
        soundsOnTrackTemp.push({'startPos':startPos,'endPos':endPos,'color': color, 'track':trackTargeted, 'soundName':soundName});
        soundsOnTrackTemp = sortSoundsByStartPos(soundsOnTrackTemp);
        var conicGradient = writeConicGradientString(trackTargeted, soundsOnTrackTemp);
        var trackDiv = document.getElementById(trackTargeted);
        trackDiv.setAttribute("style", "background:" + conicGradient);
        lastTrack = trackTargeted;
    }
}

function clearTrackFromPreview(track) {
    var conicGradient = writeConicGradientString(track, soundsOnTracks);
    var trackDiv = document.getElementById(track);
    trackDiv.setAttribute("style", "background:" + conicGradient);
}


var mylatesttap ;
function doubletap(event) {

    var x = event.clientX;
    var y = event.clientY;

    const trackTargeted = document.elementFromPoint(x, y).id;

    var now = new Date().getTime();
    var timesince = now - mylatesttap;
    if((timesince < 600) && (timesince > 0)){
        console.log("DOUBLE CLICK")

        if(trackTargeted.slice(0, 5) === "Track" ){
            var touchPos = computeAngle(x , y);

            centerX = window.innerWidth/2;

            if(x < centerX){
                touchPos = 180 + (180-touchPos);
            }
            for (var i=0;i<soundsOnTracks.length;i++) {
                var sound = soundsOnTracks[i];
                if(sound.track === trackTargeted){
                    if(sound.startPos <= touchPos && touchPos <= sound.endPos ){
                        var conicGradient = constructConicGradient(sound.endPos+1, document.getElementById(sound.soundName).duration, trackTargeted , sound.soundName);
                        var trackDiv = document.getElementById(trackTargeted);
                        trackDiv.setAttribute("style", "background:" + conicGradient);
                        break;
                    }
                }
            }
        }

    }else{
        console.log("PROUT")
    }

    mylatesttap = new Date().getTime();
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
    console.log("touchend");
    clearTrackFromPreview(lastTrack);
    const x = event.changedTouches[0].pageX;
    const y = event.changedTouches[0].pageY;
    const soundName = event.target.name;
    const trackTargeted = document.elementFromPoint(x, y).id;

    if(trackTargeted.slice(0, 5) === "Track" ){
        var startPos = Math.round(computeAngle(x , y));
        centerX = window.innerWidth/2;

        if(x < centerX){
            startPos = 180 + (180-startPos);
        }

        var conicGradient = constructConicGradient(startPos, document.getElementById(soundName).duration, trackTargeted , soundName);
        var trackDiv = document.getElementById(trackTargeted);
        console.log(trackDiv)
        console.log(conicGradient)
        trackDiv.setAttribute("style", "background:" + conicGradient);
    }

}

function disableScroll() {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}


function onDrop(event) {
    event.preventDefault();
    const soundName = event.dataTransfer.getData("soundName")

    const trackTargeted = event.target.id;
    //Detection de la position du son sur la piste
    var startPos = Math.round(computeAngle(event.clientX , event.clientY))
    centerX = window.innerWidth/2;

    if(event.clientX < centerX){
        startPos = 180 + (180-startPos);
    }

    console.log(startPos)
    console.log(document.getElementById(soundName).duration);
    console.log(trackTargeted)
    console.log(soundName)

    var conicGradient = constructConicGradient(startPos, document.getElementById(soundName).duration, trackTargeted , soundName);
    var trackDiv = document.getElementById(trackTargeted);
    console.log(trackDiv)
    console.log(conicGradient)
    trackDiv.setAttribute("style", "background:" + conicGradient);
}

var soundsOnTracks= [];

function constructConicGradient(startPos, soundDuration, trackTargeted, soundName){
    //La loop fait 20sec
    soundPercentage = (soundDuration*100)/20;

    //Calcule de la taille du son sur la piste
    soundLength = (360*soundPercentage)/100;

    //Calcule la position de fin du son
    var endPos = Math.round(startPos+soundLength);

    //Enregistre les positions d'un nouveau son dans une chaine JSON si le son ne déborde pas sur un autre
    addSound(startPos, endPos, trackTargeted, soundName);

    return writeConicGradientString(trackTargeted, soundsOnTracks);
}

function writeConicGradientString(trackTargeted, sOT){
    var endPosPreviousSound = 0;
    var conicGradient = "conic-gradient(";
    for (var i=0;i<sOT.length;i++) {
        var sound = sOT[i];
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
        var color;
        if(soundName.slice(0, 4) ==="blob"){
            color = "#10A9AE";
        }else{
            color = "#FD7905"
        }

        soundsOnTracks.push({'startPos':startPos,'endPos':endPos,'color':color, 'track':trackTargeted, 'soundName':soundName});
        soundsOnTracks = sortSoundsByStartPos(soundsOnTracks);
    }else{
        var audio = document.getElementById("error404");
        audio.play();
    }

}

function soundCanBePlacedOnTrack(startPos, endPos, trackTargeted) {
    var test = true;

    for (var i=0;i<soundsOnTracks.length;i++) {
        var sound = soundsOnTracks[i];
        if(sound.track === trackTargeted){
            var a = {start: startPos, end: endPos};
            var b = {start: sound.startPos, end: sound.endPos};
            var min = (a.start < b.start  ? a : b);
            var max = (min == a ? b : a);

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
        var x = a['startPos']; var y = b['startPos'];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

let canPlay = true;

async function playComposition() {
    if (!canPlay) return;
    console.log("play composition")
    canPlay = false;
    for (var i = 0; i < 360; i++) {

        for (var j=0;j<soundsOnTracks.length;j++) {
            var sound = soundsOnTracks[j];
            if(sound.startPos === i){
                var audio = document.getElementById(sound.soundName);
                audio.play();
            }
        }
        console.log(i)
        await sleep(55,55556);
    }
    canPlay = true;
    socket.emit('talkToSmartphone', "change isPlaying")
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function allowDrop(event) {
    event.preventDefault();
}

function toMenu(){
    window.location = '../index.html';
}

function clearTracks(){
    soundsOnTracks= [];
    document.getElementById("Track1").style.background = "lightgrey"
    document.getElementById("Track2").style.background = "lightgrey"
    document.getElementById("Track3").style.background = "lightgrey"
}

