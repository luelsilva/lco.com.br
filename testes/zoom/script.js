var scale = 1,
  panning = false,
  pointX = 0,
  pointY = 0,
  start = { x: 0, y: 0 };

var evCache = new Array();
var prevDiff = -1;


function init() {
  var zoom = document.getElementById("zoom");
  zoom.onmousedown = mousedown_handler;
  zoom.onmouseup = mouseup_handler;
  zoom.onmousemove = mousemove_handler;
  zoom.onwheel = mousewhell_handler;
  zoom.onpointerdown = pointerdown_handler;
}

function setTransform() {
  zoom.style.transform =
    "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
}

function mousedown_handler(e) {
  //e.preventDefault();
  log('mouse_dowm');
  start = { x: e.clientX - pointX, y: e.clientY - pointY };
  panning = true;
}

function pointerdown_handler(e) {
  // The pointerdown event signals the start of a touch interaction.
  // This event is cached to support 2-finger gestures
  //e.preventDefault();
  evCache.push(e);
  log('pointer_down');
 }
 
function mouseup_handler(e) {
  panning = false;
}

function mousemove_handler(e) {
  e.preventDefault();
  if (!panning) {
    return;
  }
  pointX = e.clientX - start.x;
  pointY = e.clientY - start.y;
  setTransform();
}

function mousewhell_handler(e) {
  e.preventDefault();
  var xs = (e.clientX - pointX) / scale,
    ys = (e.clientY - pointY) / scale,
    delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
  delta > 0 ? (scale *= 1.2) : (scale /= 1.2);

  if (scale < 1) {
    scale = 1;
  }
  if (scale > 20) {
    scale = 20;
  }

  pointX = e.clientX - xs * scale;
  pointY = e.clientY - ys * scale;

  setTransform();
}

  // Log events flag
  var logEvents = false;

  // Logging/debugging functions
  function enableLog(ev) {
    logEvents = logEvents ? false : true;
  }
  
  function log(texto) {
    if (!logEvents) return;
    var o = document.getElementsByTagName('output')[0];
    o.innerHTML += texto + " ";
  }
  
  function clearLog(event) {
   var o = document.getElementsByTagName('output')[0];
   o.innerHTML = "";
  }
  