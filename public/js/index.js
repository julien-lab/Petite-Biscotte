function hideDiv(elem) {
    if(elem.value === "chat.html")
        document.getElementById('hideDiv').style.display = "none";
    else
        document.getElementById('hideDiv').style.display = 'block';

    document.getElementById('root').action = elem.value;
}
function usernameDefault(username,room){
    if(room.value === "chat.html") {
        username.value = "default"
    }
    room.value = "1"

}
