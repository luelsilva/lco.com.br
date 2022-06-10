
var evCache = new Array();
var prevDiff = -1;

var scale = 1,
    panning = false,
    pointX = 0,
    pointY = 0,
    start = { x: 0, y: 0 },
    imgNatWidth = 0,
    imgNatHeigth = 0;

function inicializa() {
    zoom = document.getElementById("zoom");
    zoom.onmouseup = mouseup_handler;
    zoom.onmousedown = mousedown_handler;
    zoom.onmousemove = mousemove_handler;
    zoom.onwheel = mousewheel_handler;

    zoom.onpointerdown = pointerdown_handler;
    zoom.onpointerup = pointerup_handler;
    zoom.onpointermove = pointermove_handler;

    logx("versão 13 <br/>");
};

function imgLoad() {
    imgzoom = document.getElementById("imgzoom");
    imgNatWidth = imgzoom.naturalWidth;
    imgNatHeigth = imgzoom.naturalHeight;
};

function logx(texto) {
    output = document.getElementsByTagName('output')[0];
    output.innerHTML = texto;
};

function log(texto) {
    var o = document.getElementsByTagName('output')[0];
    o.innerHTML += texto + " ";
};


function setTransform() {
    zoom.style.transform =
        "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
};

function remove_event(ev) {
    // Remove this event from the target's cache
    for (var i = 0; i < evCache.length; i++) {
        if (evCache[i].pointerId == ev.pointerId) {
            evCache.splice(i, 1);
            break;
        }
    }
}

function mousedown_handler(e) {
    e.preventDefault();
    start = { x: e.clientX - pointX, y: e.clientY - pointY };
    panning = true;
};

function pointerdown_handler(e) {
    //e.preventDefault();
    start = { x: e.clientX - pointX, y: e.clientY - pointY };
    panning = true;
    evCache.push(e);
};

function pointerup_handler(e) {
    //e.preventDefault();
    panning = false;

    remove_event(e);

    // If the number of pointers down is less than two then reset diff tracker
    if (evCache.length < 2) {
        prevDiff = -1;
    }
}

function mouseup_handler(e) {
    e.preventDefault();
    panning = false;
};

function mousewheel_handler(e) {
    e.preventDefault();
    var xs = (e.clientX - pointX) / scale,
        ys = (e.clientY - pointY) / scale,
        delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
    delta > 0 ? (scale *= 1.2) : (scale /= 1.2);

    pointX = e.clientX - xs * scale;
    pointY = e.clientY - ys * scale;

    setTransform();
};

function mousemove_handler(e) {
    e.preventDefault();
    if (!panning) {
        return;
    }
    pointX = e.clientX - start.x;
    pointY = e.clientY - start.y;

    setTransform();
};

function pointermove_handler(ev) {
    e.preventDefault();

    // Find this event in the cache and update its record with this event
    for (var i = 0; i < evCache.length; i++) {
        if (ev.pointerId == evCache[i].pointerId) {
            evCache[i] = ev;
            break;
        }
    }

    // If two pointers are down, check for pinch gestures
    if (evCache.length == 2) {
        // Calculate the distance between the two pointers
        var curDiff = Math.abs(evCache[0].clientX - evCache[1].clientX);

        if (prevDiff > 0) {
            if (curDiff > prevDiff) {
                // The distance between the two pointers has increased
                log("Pinch moving OUT -> Zoom in", ev);
                ev.target.style.background = "pink";
            }
            if (curDiff < prevDiff) {
                // The distance between the two pointers has decreased
                log("Pinch moving IN -> Zoom out", ev);
                ev.target.style.background = "lightblue";
            }
        }

        // Cache the distance for the next move event
        prevDiff = curDiff;
    }

    else {
        if (!panning) {
            return;
        }
        pointX = e.clientX - start.x;
        pointY = e.clientY - start.y;

        setTransform();
    }



}
