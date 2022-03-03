disableScroll();

let positionsTrack1 = [[1171*100/2304,129*100/1296],[1217*100/2304,131*100/1296],[1262*100/2304,133*100/1296],[1316*100/2304,133*100/1296],[1359*100/2304,139*100/1296],[1417*100/2304,145*100/1296],[1467*100/2304,154*100/1296],[1523*100/2304,161*100/1296],[1589*100/2304,173*100/1296],[1654*100/2304,193*100/1296],
    [1727*100/2304,212*100/1296],[1808*100/2304,236*100/1296],[1886*100/2304,269*100/1296],[1975*100/2304,313*100/1296],[2055*100/2304,368*100/1296],[2134*100/2304,434*100/1296],[2199*100/2304,507*100/1296],[2239*100/2304,601*100/1296],[2236*100/2304,699*100/1296],[2216*100/2304,793*100/1296],[2163*100/2304,868*100/1296],[2086*100/2304,945*100/1296],
    [2003*100/2304,997*100/1296],[1921*100/2304,1048*100/1296],[1832*100/2304,1083*100/1296],[1760*100/2304,1111*100/1296],[1670*100/2304,1137*100/1296],[1603*100/2304,1151*100/1296],[1539*100/2304,1167*100/1296],[1480*100/2304,1173*100/1296],[1427*100/2304,1181*100/1296],[1373*100/2304,1187*100/1296],
    [1330*100/2304,1193*100/1296],[1280*100/2304,1193*100/1296],[1233*100/2304,1197*100/1296],[1177*100/2304,1198*100/1296],[1133*100/2304,1197*100/1296],[1081*100/2304,1198*100/1296],[1041*100/2304,1198*100/1296],[987*100/2304,1196*100/1296],[946*100/2304,1191*100/1296],[895*100/2304,1187*100/1296],
    [841*100/2304,1177*100/1296],[771*100/2304,1169*100/1296],[707*100/2304,1155*100/1296],[639*100/2304,1138*100/1296],[573*100/2304,1117*100/1296],[490*100/2304,1096*100/1296],[416*100/2304,1060*100/1296],[327*100/2304,1018*100/1296],[241*100/2304,961*100/1296],[167*100/2304,893*100/1296],[104*100/2304,819*100/1296],[67*100/2304,713*100/1296],
    [59*100/2304,629*100/1296],[92*100/2304,536*100/1296],[145*100/2304,453*100/1296],[225*100/2304,388*100/1296],[308*100/2304,323*100/1296],[387*100/2304,279*100/1296],[469*100/2304,245*100/1296],[547*100/2304,217*100/1296],[628*100/2304,191*100/1296],[699*100/2304,176*100/1296],[761*100/2304,159*100/1296],[819*100/2304,151*100/1296],[873*100/2304,145*100/1296],
    [926*100/2304,140*100/1296],[976*100/2304,133*100/1296],[1027*100/2304,131*100/1296],[1075*100/2304,131*100/1296],[1130*100/2304,129*100/1296]*100/1296]

let positionsTrack2 = [[1166*100/2304,200*100/1296],[1211*100/2304,202*100/1296],[1250*100/2304,206*100/1296],[1292*100/2304,206*100/1296],[1335*100/2304,212*100/1296],[1381*100/2304,217*100/1296],[1425*100/2304,220*100/1296],[1477*100/2304,227*100/1296],[1538*100/2304,238*100/1296],[1600*100/2304,253*100/1296],
    [1661*100/2304,271*100/1296],[1725*100/2304,292*100/1296],[1797*100/2304,320*100/1296],[1873*100/2304,358*100/1296],[1947*100/2304,404*100/1296],[2018*100/2304,463*100/1296],[2079*100/2304,531*100/1296],[2120*100/2304,620*100/1296],[2122*100/2304,699*100/1296],[2093*100/2304,781*100/1296],[2044*100/2304,855*100/1296],[1987*100/2304,910*100/1296],
    [1901*100/2304,963*100/1296],[1826*100/2304,1007*100/1296],[1754*100/2304,1037*100/1296],[1682*100/2304,1059*100/1296],[1612*100/2304,1078*100/1296],[1549*100/2304,1095*100/1296],[1493*100/2304,1101*100/1296],[1445*100/2304,1113*100/1296],[1391*100/2304,1123*100/1296],[1352*100/2304,1126*100/1296],
    [1307*100/2304,1125*100/1296],[1265*100/2304,1129*100/1296],[1221*100/2304,1133*100/1296],[1172*100/2304,1135*100/1296],[1137*100/2304,1136*100/1296],[1095*100/2304,1133*100/1296],[1057*100/2304,1132*100/1296],[1009*100/2304,1130*100/1296],[971*100/2304,1126*100/1296],[921*100/2304,1119*100/1296],
    [874*100/2304,1117*100/1296],[824*100/2304,1108*100/1296],[763*100/2304,1095*100/1296],[706*100/2304,1079*100/1296],[645*100/2304,1063*100/1296],[577*100/2304,1042*100/1296],[497*100/2304,1013*100/1296],[421*100/2304,980*100/1296],[353*100/2304,937*100/1296],[286*100/2304,878*100/1296],[221*100/2304,803*100/1296],[190*100/2304,711*100/1296],
    [182*100/2304,633*100/1296],[211*100/2304,551*100/1296],[260*100/2304,478*100/1296],[326*100/2304,422*100/1296],[406*100/2304,369*100/1296],[483*100/2304,331*100/1296],[555*100/2304,301*100/1296],[622*100/2304,275*100/1296],[698*100/2304,255*100/1296],[761*100/2304,243*100/1296],[811*100/2304,229*100/1296],[861*100/2304,220*100/1296],[914*100/2304,213*100/1296],
    [952*100/2304,208*100/1296],[997*100/2304,203*100/1296],[1040*100/2304,201*100/1296],[1082*100/2304,197*100/1296],[1124*100/2304,200*100/1296]*100/1296]

let positionsTrack3 = [[1166*100/2304,266*100/1296],[1203*100/2304,265*100/1296],[1233*100/2304,262*100/1296],[1273*100/2304,263*100/1296],[1313*100/2304,271*100/1296],[1351*100/2304,274*100/1296],[1390*100/2304,278*100/1296],[1436*100/2304,285*100/1296],[1486*100/2304,292*100/1296],[1539*100/2304,307*100/1296],
    [1595*100/2304,321*100/1296],[1655*100/2304,339*100/1296],[1717*100/2304,363*100/1296],[1787*100/2304,394*100/1296],[1852*100/2304,434*100/1296],[1922*100/2304,484*100/1296],[1971*100/2304,541*100/1296],[2006*100/2304,625*100/1296],[2007*100/2304,694*100/1296],[1987*100/2304,771*100/1296],[1941*100/2304,831*100/1296],[1877*100/2304,883*100/1296],
    [1813*100/2304,926*100/1296],[1743*100/2304,963*100/1296],[1676*100/2304,989*100/1296],[1616*100/2304,1009*100/1296],[1549*100/2304,1028*100/1296],[1495*100/2304,1036*100/1296],[1451*100/2304,1046*100/1296],[1407*100/2304,1052*100/1296],[1364*100/2304,1057*100/1296],[1323*100/2304,1065*100/1296],
    [1287*100/2304,1066*100/1296],[1249*100/2304,1067*100/1296],[1210*100/2304,1069*100/1296],[1172*100/2304,1073*100/1296],[1141*100/2304,1073*100/1296],[1102*100/2304,1071*100/1296],[1071*100/2304,1072*100/1296],[1027*100/2304,1070*100/1296],[993*100/2304,1067*100/1296],[951*100/2304,1063*100/1296],
    [910*100/2304,1058*100/1296],[866*100/2304,1052*100/1296],[811*100/2304,1040*100/1296],[759*100/2304,1029*100/1296],[704*100/2304,1013*100/1296],[639*100/2304,997*100/1296],[583*100/2304,971*100/1296],[514*100/2304,940*100/1296],[445*100/2304,899*100/1296],[386*100/2304,850*100/1296],[334*100/2304,782*100/1296],[296*100/2304,705*100/1296],
    [295*100/2304,633*100/1296],[319*100/2304,568*100/1296],[362*100/2304,497*100/1296],[429*100/2304,446*100/1296],[493*100/2304,403*100/1296],[565*100/2304,370*100/1296],[628*100/2304,346*100/1296],[689*100/2304,325*100/1296],[753*100/2304,308*100/1296],[808*100/2304,293*100/1296],[857*100/2304,284*100/1296],[903*100/2304,279*100/1296],[941*100/2304,272*100/1296],
    [983*100/2304,269*100/1296],[1021*100/2304,267*100/1296],[1053*100/2304,263*100/1296],[1095*100/2304,263*100/1296],[1133*100/2304,262*100/1296]*100/1296]



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
    if (event.target.classList[0] === "circle") logo = event.target.childNodes[3].textContent
    else if (event.target.classList[0] === "circle_sent") logo = event.target.childNodes[1].textContent
    else if (event.target.classList[0] === "btn_listen") logo = event.target.parentElement.childNodes[3].textContent
    else if (event.target.classList[0] === "btn_listen_sent") logo = event.target.parentElement.childNodes[1].textContent
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

function findLogoWhenDuplicate(soundName){
    let playButton = document.getElementsByName(soundName)[0]
    let logo
    if (playButton.classList[0] === "btn_listen") logo = playButton.parentElement.childNodes[3].textContent
    else if (playButton.classList[0] === "btn_listen_sent") logo = playButton.parentElement.childNodes[1].textContent
    return logo

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
                        let logo = findLogoWhenDuplicate(sound.soundName)
                        placeLogo(sound.endPos+1,document.getElementById(sound.soundName).duration,trackTargeted,logo)
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

function placeLogo(startPos,soundDuration, track, foundLogo = undefined) {
    let soundPercentage = (soundDuration*100)/20;

    //Calcule de la taille du son sur la piste
    let soundLength = (360*soundPercentage)/100;

    //Calcule la position de fin du son
    let endPos = Math.round(startPos+soundLength);

    var logo = document.createElement("div");
    if(foundLogo!==undefined) {
        console.log(foundLogo)
        logo.textContent = foundLogo
    }
    else logo.textContent = extractLogo(event)
    logo.style.position = "absolute"
    var index = Math.round(((startPos + endPos) / 10) - 1)
    let x,y
    if(track === "Track1"){
        x = positionsTrack1[index][0]
        y = positionsTrack1[index][1] - (15*100/1296)
    }
    else if (track === "Track2"){
        x = positionsTrack2[index][0]
        y = positionsTrack2[index][1] - (20*100/1296)
    }
    else{
        x = positionsTrack3[index][0]
        y = positionsTrack3[index][1] - (30*100/1296)
    }
    console.log(x,y)
    logo.style.left = x + "%"
    logo.style.top = y + "%"
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
    if (!canPlay || soundsOnTracks.length === 0) return;
    //initCursor('Track1');
    //initCursor('Track2');
    //initCursor('Track3');
    socket.emit('changeSmartphoneDisplay', 'changeState');
    canPlay = false;
    canSuppress = false;
    for (let i = 0; i < 360; i++) {
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
    moveCursor((height/2)-20,(width/2)-20, hPxToAdd, wPxToAdd, track);
}



async function moveCursor(h, w, hPxToAdd, wPxToAdd, track) {
   var test = true;
   var i = 540;
   var deg = 0;
   var time = 55.1;
    while(test){
        let promise = sleep(time);
        var x = wPxToAdd + w + (w * Math.cos((i/2) * Math.PI / 180));
        var y = hPxToAdd + h + (h * Math.sin((i/2) * Math.PI / 180));
        if(track === 'Track1'){
            var cursor = document.getElementById("cursor1");
            cursor.setAttribute("style", "transform: rotate("+(deg/2) + "deg)" );
            $('#cursor1').css({left: x, top: y});
        }else if(track === 'Track2'){
            var cursor = document.getElementById("cursor2");
            cursor.setAttribute("style", "transform: rotate("+(deg/2) + "deg)" );
            $('#cursor2').css({left: x, top: y});
        }else{
            var cursor = document.getElementById("cursor3");
            cursor.setAttribute("style", "transform: rotate("+(deg/2) + "deg)" );
            $('#cursor3').css({left: x, top: y});
        }
        deg++;
        i++;
        if(i === 721){
            i=0;
        }
        if(i === 539){
            test = false;
        }
        if( (i >=540 && i<=  720) || (i >=180 && i<= 360)){
            time-=0.305;
        }else{
            time+=0.305;
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
    console.log($(window).width(),$(window).height())
}

//document.addEventListener("click", printMousePos);
