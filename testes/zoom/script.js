
scale = 1,
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

    //zoom.onpointerdown = pointerdown_handler;
    //zoom.onpointerup = pointerup_handler;

    logx("versão 7");
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

function mousedown_handler(e) {
    e.preventDefault();
    start = { x: e.clientX - pointX, y: e.clientY - pointY };
    panning = true;
    log("mousedown")
};

function pointerdown_handler(e) {
    e.preventDefault();
    start = { x: e.clientX - pointX, y: e.clientY - pointY };
    panning = true;
    log("pointerdown")
};

function pointerup_handler(e) {
    e.preventDefault();
    panning = false;
    log("pointerup");
}

function mouseup_handler(e) {
    e.preventDefault();
    panning = false;
    log("mouseup");
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