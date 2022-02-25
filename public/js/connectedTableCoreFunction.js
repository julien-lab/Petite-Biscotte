disableScroll();

let positionsTrack1 = [[1171,129],[1217,131],[1262,133],[1316,133],[1359,139],[1417,145],[1467,154],[1523,161],[1589,173],[1654,193],
    [1727,212],[1808,236],[1886,269],[1975,313],[2055,368],[2134,434],[2199,507],[2239,601], [2236,699],[2216,793],[2163,868],[2086,945],
    [2003,997],[1921,1048],[1832,1083],[1760,1111],[1670,1137],[1603,1151],[1539,1167],[1480,1173],[1427,1181],[1373,1187],
    [1330,1193],[1280,1193],[1233,1197],[1177,1198],[1133,1197],[1081,1198],[1041,1198],[987,1196],[946,1191],[895,1187],
    [841,1177],[771,1169],[707,1155],[639,1138],[573,1117],[490,1096],[416,1060],[327,1018],[241,961],[167,893],[104,819],[67,713],
    [59,629],[92,536],[145,453],[225,388],[308,323],[387,279],[469,245],[547,217],[628,191],[699,176],[761,159],[819,151],[873,145],
    [926,140],[976,133],[1027,131],[1075,131],[1130,129]]

let positionsTrack2 = [[1166,200],[1211,202],[1250,206],[1292,206],[1335,212],[1381,217],[1425,220],[1477,227],[1538,238],[1600,253],
    [1661,271],[1725,292],[1797,320],[1873,358],[1947,404],[2018,463],[2079,531],[2120,620],[2122,699],[2093,781],[2044,855],[1987,910],
    [1901,963],[1826,1007],[1754,1037],[1682,1059],[1612,1078],[1549,1095],[1493,1101],[1445,1113],[1391,1123],[1352,1126],
    [1307,1125],[1265,1129],[1221,1133],[1172,1135],[1137,1136],[1095,1133],[1057,1132],[1009,1130],[971,1126],[921,1119],
    [874,1117],[824,1108],[763,1095],[706,1079],[645,1063],[577,1042],[497,1013],[421,980],[353,937],[286,878],[221,803],[190,711],
    [182,633],[211,551],[260,478],[326,422],[406,369],[483,331],[555,301],[622,275],[698,255],[761,243],[811,229],[861,220],[914,213],
    [952,208],[997,203],[1040,201],[1082,197],[1124,200]]

let positionsTrack3 = [[1166,266],[1203,265],[1233,262],[1273,263],[1313,271],[1351,274],[1390,278],[1436,285],[1486,292],[1539,307],
    [1595,321],[1655,339],[1717,363],[1787,394],[1852,434],[1922,484],[1971,541],[2006,625],[2007,694],[1987,771],[1941,831],[1877,883],
    [1813,926],[1743,963],[1676,989],[1616,1009],[1549,1028],[1495,1036],[1451,1046],[1407,1052],[1364,1057],[1323,1065],
    [1287,1066],[1249,1067],[1210,1069],[1172,1073],[1141,1073],[1102,1071],[1071,1072],[1027,1070],[993,1067],[951,1063],
    [910,1058],[866,1052],[811,1040],[759,1029],[704,1013],[639,997],[583,971],[514,940],[445,899],[386,850],[334,782],[296,705],
    [295,633],[319,568],[362,497],[429,446],[493,403],[565,370],[628,346],[689,325],[753,308],[808,293],[857,284],[903,279],[941,272],
    [983,269],[1021,267],[1053,263],[1095,263],[1133,262]]


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


function extractSoundName(event) {
    let soundName
    if (event.target.classList[0] === "circle" || event.target.classList[0] === "circle_sent") soundName = event.target.firstElementChild.name
    else if (event.target.classList[0] === "btn_listen" || event.target.classList[0] === "btn_listen_sent") soundName = event.target.name
    else if (event.target.classList[0] === "info") soundName = event.target.parentNode.firstElementChild.name
    return soundName;
}

function extractLogo(event) {
    let logo
    if (event.target.classList[0] === "circle" || event.target.classList[0] === "circle_sent") logo = event.target.childNodes[3].textContent
    else if (event.target.classList[0] === "btn_listen" || event.target.classList[0] === "btn_listen_sent") logo = event.target.parentElement.childNodes[3].textContent
    else if (event.target.classList[0] === "info") logo = event.target.textContent
    return logo;
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

        const soundName = extractSoundName(event);

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

    const soundName = extractSoundName(event)
    console.log(event.target.id)


    const trackTargeted = document.elementFromPoint(x, y).id;

    if(trackTargeted.slice(0, 5) === "Track" ){
        let startPos = Math.round(computeAngle(x , y));
        let centerX = window.innerWidth/2;

        if(x < centerX){
            startPos = 180 + (180-startPos);
        }

        let conicGradient = constructConicGradient(startPos, document.getElementById(soundName).duration, trackTargeted , soundName,true);
        let trackDiv = document.getElementById(trackTargeted);
        trackDiv.setAttribute("style", "background:" + conicGradient);
        placeLogo(startPos,document.getElementById(soundName).duration,trackTargeted);
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

function placeLogo(startPos,soundDuration, track) {
    let soundPercentage = (soundDuration*100)/20;

    //Calcule de la taille du son sur la piste
    let soundLength = (360*soundPercentage)/100;

    //Calcule la position de fin du son
    let endPos = Math.round(startPos+soundLength);

    var logo = document.createElement("div");
    logo.textContent = extractLogo(event)
    logo.style.position = "absolute"
    var index = Math.round(((startPos + endPos) / 10) - 1)
    let x,y
    if(track === "Track1"){
        x = positionsTrack1[index][0]
        y = positionsTrack1[index][1] - 15
    }
    else if (track === "Track2"){
        x = positionsTrack2[index][0]
        y = positionsTrack2[index][1] - 15
    }
    else{
        x = positionsTrack3[index][0]
        y = positionsTrack3[index][1] - 20
    }
    console.log(index, positionsTrack1.length, positionsTrack1[index])
    logo.style.left = x + "px"
    logo.style.top = y + "px"
    logo.style.zIndex = "100"
    logo.style.fontSize = "xx-large"
    logo.classList.add("placedLogo");
    document.body.appendChild(logo)

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
        const logos = document.querySelectorAll('.placedLogo');

        logos.forEach(logo => {
            logo.remove();
        });
    }
}

function printMousePos(event) {
    console.log(event.clientX,event.clientY)
}

//document.addEventListener("click", printMousePos);
