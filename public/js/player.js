function playAnimation(btn){
    const bouton = document.getElementById(btn);
    bouton.innerHTML = "&#9658;"
}

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

const MEDIA_ELEMENT_NODES = new WeakMap();
let context = [];
let allAudioEffect = [];

function addFilter(audioName, circle, effet){
    const effectDiv = document.getElementById(effet);

    context = (window.AudioContext) ? new AudioContext() : new window["webkitAudioContext"]();
    let audioSource;

    if (MEDIA_ELEMENT_NODES.has(document.getElementById(audioName))) {
        audioSource = MEDIA_ELEMENT_NODES.get(document.getElementById(audioName));
    } else {
        audioSource = context.createMediaElementSource(document.getElementById(audioName))
        MEDIA_ELEMENT_NODES.set(document.getElementById(audioName), audioSource);
    }

    let filter;

    for (let effect of allAudioEffect) {
        if (effect[0] === effet) {
            filter = effect[1];
            addEffect(audioSource, filter, effectDiv, circle);
            return;
        }
    }
    filter = context.createBiquadFilter();
    allAudioEffect.push([effet, filter])
    audioSource.connect(filter);
    filter.connect(context.destination);
    addEffect(audioSource, filter, effectDiv, circle);
}

function addEffect(audioSource, filter, effectDiv, circle) {
    effectIntensity(filter, effectDiv);
    borderColorEffect(effectDiv.value, circle);
}

function effectIntensity(filter, effectDiv) {
    /*filter.frequency.value = 1000;
    filter.frequency.value=1200;*/
    if (parseInt(effectDiv.value) < -800) {
        filter.type='allpass';
    }
    else {
        filter.type='bandpass';
        filter.gain.value= 40/900 * parseInt(effectDiv.value) + 40/900*-100; // coeff directeur 40/900 ordonn??e ?? l'origine -100*40/900
        filter.detune.value = -parseInt(effectDiv.value)*3;
    }
}

function borderColorEffect(value, circle){
    if (parseInt(value) < -800) {
        document.getElementById(circle).style.border = '';
    }
    else {
        document.getElementById(circle).style.border = (parseInt(value)+ 800) * 0.004 + "px solid red";
    }
}

function disableRefresh(e){
    switch (e.keyCode) {
        case 116: // 'F5'
            event.returnValue = false;
            event.keyCode = 0;
            window.status = "Refresh is disabled";
            break;
    }
}
