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
let allAudioEffect;

function addFilter(audioName,btn , circle, boutoncolor, effet){

    const effect = document.getElementById(effet);

    context = (window.AudioContext) ? new AudioContext() : new window["webkitAudioContext"]();
    let audioSource;

    if (MEDIA_ELEMENT_NODES.has(document.getElementById(audioName))) {
        audioSource = MEDIA_ELEMENT_NODES.get(document.getElementById(audioName))
    } else {
        audioSource = context.createMediaElementSource(document.getElementById(audioName))
        MEDIA_ELEMENT_NODES.set(document.getElementById(audioName), audioSource)
    }

    let filter;

    console.log(allAudioEffect);
    if (allAudioEffect === undefined){
        filter = context.createBiquadFilter();
        allAudioEffect = [[effet, filter]];
    }
    else {
        filter = allAudioEffect[0][1];
    }

    try {
        audioSource.connect(filter);
        filter.connect(context.destination);
        filter.type='bandpass';
        filter.detune.value=parseInt(effect.value);
    } catch (error) {
        filter.detune.value = parseInt(effect.value)
    }

    document.getElementById(circle).style.background = "red"
    document.getElementById(boutoncolor).style.background = "red"

}
