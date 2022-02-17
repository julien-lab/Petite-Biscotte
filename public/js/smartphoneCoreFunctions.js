const socket = io()

function changingVolume(){
    let value = document.getElementById("volume").value
    socket.emit("changingVolume",value)
}
