function testff(btn){
    const bouton = document.getElementById(btn);
    bouton.innerHTML = "&#9658;"
}

function touchend(event) {
    const data = event.target.id
    const str = event.target.parentElement.nextElementSibling.textContent
    const dropzone = document.getElementById("dropzone")
    console.log(event.changedTouches[0].pageX,event.changedTouches[0].pageY)
    if(event.changedTouches[0].pageY >300) createCopy(dropzone,data,str)
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

function startDrag(event){
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'all'
    const id = event.target.firstElementChild.firstElementChild.firstElementChild.id
    const str = event.target.firstElementChild.firstElementChild.nextElementSibling.textContent
    event.dataTransfer.setData("id",id)
    event.dataTransfer.setData("str",str)
}

function onDrop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("id")
    const str = event.dataTransfer.getData("str")
    const dropzone = document.getElementById("dropzone")
    createCopy(dropzone,data,str)
}

function createCopy(dropzone,id,str){
    let card_container = document.createElement('div')
    card_container.classList.add("card-container")
    let card = document.createElement('div')
    card.classList.add("card")
    let circle = document.createElement('div')
    circle.classList.add("circle")
    let button = document.createElement('button')
    button.classList.add("btn_listen")
    button.id = id + "drop";
    button.onclick = function(){playPause(str,button.id)}
    button.innerHTML = "&#9658;"
    let name = document.createElement('div')
    name.classList.add("info")
    name.textContent = str
    circle.appendChild(button)
    card.appendChild(circle)
    card.appendChild(name)
    card_container.appendChild(card)
    dropzone.appendChild(card_container)
}

function allowDrop(event) {
    event.preventDefault();
}


var SVGDocument = null;
var SVGRoot = null;

var TrueCoords = null;
var GrabPoint = null;
var BackDrop = null;
var DragTarget = null;

function Init(evt)
{
    SVGDocument = evt.target.ownerDocument;
    SVGRoot = SVGDocument.getElementById("table");
    // these svg points hold x and y values...
    //    very handy, but they do not display on the screen (just so you know)
    TrueCoords = SVGRoot.createSVGPoint();
    GrabPoint = SVGRoot.createSVGPoint();

    // this will serve as the canvas over which items are dragged.
    //    having the drag events occur on the mousemove over a backdrop
    //    (instead of the dragged element) prevents the dragged element
    //    from being inadvertantly dropped when the mouse is moved rapidly
    BackDrop = SVGDocument.getElementById('BackDrop');
}



function Grab(evt)
{
    // find out which element we moused down on
    var targetElement = evt.target;
    parent  = targetElement.parentElement;
    // you cannot drag the background itself, so ignore any attempts to mouse down on it
    if ( "Sounds" == targetElement.parentNode.id )
    {
        //set the item moused down on as the element to be dragged
        // CREATE HERE
        cloneElement = targetElement.cloneNode(true);
        parent.appendChild(cloneElement);

        DragTarget = cloneElement;

        // move this element to the "top" of the display, so it is (almost)
        //    always over other elements (exception: in this case, elements that are
        //    "in the folder" (children of the folder group) with only maintain
        //    hierarchy within that group
        DragTarget.parentNode.appendChild( DragTarget );

        // turn off all pointer events to the dragged element, this does 2 things:
        //    1) allows us to drag text elements without selecting the text
        //    2) allows us to find out where the dragged element is dropped (see Drop)
        DragTarget.setAttributeNS(null, 'pointer-events', 'none');

        // we need to find the current position and translation of the grabbed element,
        //    so that we only apply the differential between the current location
        //    and the new location
        var transMatrix = DragTarget.getCTM();
        GrabPoint.x = TrueCoords.x - Number(transMatrix.e);
        GrabPoint.y = TrueCoords.y - Number(transMatrix.f);

    }
};


function Drag(evt)
{
    // account for zooming and panning
    GetTrueCoords(evt);

    // if we don't currently have an element in tow, don't do anything
    if (DragTarget)
    {
        // account for the offset between the element's origin and the
        //    exact place we grabbed it... this way, the drag will look more natural
        var newX = TrueCoords.x - GrabPoint.x;
        var newY = TrueCoords.y - GrabPoint.y;

        // apply a new tranform translation to the dragged element, to display
        //    it in its new location
        DragTarget.setAttributeNS(null, 'transform', 'translate(' + newX + ',' + newY + ')');
    }
};




function Drop(evt)
{
    // if we aren't currently dragging an element, don't do anything
    if ( DragTarget )
    {
        // since the element currently being dragged has its pointer-events turned off,
        //    we are afforded the opportunity to find out the element it's being dropped on
        var targetElement = evt.target;

        // turn the pointer-events back on, so we can grab this item later
        DragTarget.setAttributeNS(null, 'pointer-events', 'all');
        if ( 'Tracks' == targetElement.parentNode.id )
        {
            alert(DragTarget.id + ' has been dropped on top of ' + targetElement.id);
            // if the dragged element is dropped on an element that is a child
            //    of the folder group, it is inserted as a child of that group
        }


        // set the global variable to null, so nothing will be dragged until we
        //    grab the next element

        //Delete copy on screen
        DragTarget.remove()
        DragTarget = null;
    }
};


function GetTrueCoords(evt)
{
    // find the current zoom level and pan setting, and adjust the reported
    //    mouse position accordingly
    var newScale = SVGRoot.currentScale;
    var translation = SVGRoot.currentTranslate;
    TrueCoords.x = (evt.clientX - translation.x)/newScale;
    TrueCoords.y = (evt.clientY - translation.y)/newScale;
};
