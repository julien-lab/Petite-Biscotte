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
        console.log(audio)
        audio.play();
        audio.onended

    }else{
        count = 0
        audio.pause()
        bouton.innerHTML = "&#9658;"
    }
}

var MEDIA_ELEMENT_NODES = new WeakMap();
var context = []

function addFilter(audioName,btn , circle, boutoncolor, effet){
    var effect = document.getElementById(effet)
    console.log(parseInt(effect.value))

    var context = (window.AudioContext) ? new AudioContext() : new window["webkitAudioContext"]();
    if(MEDIA_ELEMENT_NODES.has(document.getElementById(audioName)))
    {
        audioSource = MEDIA_ELEMENT_NODES.get(document.getElementById(audioName))
    }
    else {
        audioSource = context.createMediaElementSource(document.getElementById(audioName))
        MEDIA_ELEMENT_NODES.set(document.getElementById(audioName),audioSource)
    }

    var filter = context.createBiquadFilter()

    audioSource.connect(filter);
    
    filter.connect(context.destination);
    filter.type = "lowpass"
    filter.gain.value = 1
    // faire varier ce detune de - 1000 à 1000
    filter.detune.value = parseInt(effect.value)
    console.log(filter.detune.value)
    document.getElementById(circle).style.background = "red"
    document.getElementById(boutoncolor).style.background = "red"

}
