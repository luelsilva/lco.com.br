var
  imgNaturalWidth = 0,
  imgNaturalHeight = 0,
  scale = 1,
  panning = false,
  pointX = 0,
  pointY = 0,
  start = { x: 0, y: 0 },
  evCache = new Array(),
  prevDiff = -1;


function imgLoad() {
  const img = document.getElementById('imagem');
  imgNaturalWidth = img.naturalWidth;
  imgNaturalHeight = img.naturalHeight;
}

function init() {
  var zoom = document.getElementById("zoom");
  zoom.onmousedown = mousedown_handler;
  zoom.onmouseup = mouseup_handler;
  zoom.onmousemove = mousemove_handler;
  zoom.onwheel = mousewheel_handler;
  zoom.onpointerdown = pointerdown_handler;
  zoom.onpointerup = pointerup_handler;
  log('Versão 17 <br>');
}

function setTransform() {
  zoom.style.transform =
    "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
}

function mousedown_handler(e) {
  //e.preventDefault();
  start = {
    x: e.clientX - pointX,
    y: e.clientY - pointY
  };
  panning = true;
  console.log('down');
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

function pointerdown_handler(e) {
  e.preventDefault();
  evCache.push(e);
}

function mouseup_handler(e) {
  e.preventDefault();
  panning = false;
}

function pointerup_handler(e) {
  e.preventDefault();
  remove_event(e);

  // If the number of pointers down is less than two then reset diff tracker
  if (evCache.length < 2) {
    prevDiff = -1;
  }
}

function remove_event(e) {
  for (var i = 0; i < evCache.length; i++) {
    if (evCache[i].pointerId == e.pointerId) {
      evCache.splice(i, 1);
      break;
    }
  }
}

function mousewheel_handler(e) {
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

var logEvents = true;

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