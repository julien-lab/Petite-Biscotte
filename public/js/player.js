function playAnimation(btn){
    const bouton = document.getElementById(btn);
    bouton.innerHTML = "&#9658;"
}

let count = 0;
function playPause(audioName,btn){
    console.log("play")
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

function addFilter(audioName,btn , circle, boutoncolor){
    var context = new AudioContext(),
        audioSource = context.createMediaElementSource(document.getElementById(audioName)),
        filter = context.createBiquadFilter();
    audioSource.connect(filter);
    filter.connect(context.destination);
    //filter.type = "lowshelf"
    //filter.gain.value = 20
    document.getElementById(circle).style.background = "red"
    document.getElementById(boutoncolor).style.background = "red"

}
