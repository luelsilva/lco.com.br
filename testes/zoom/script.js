// Global vars to cache event state
var evCache = new Array();
var prevDiff = -1;

var scale = 1,
  panning = false,
  pointX = 0,
  pointY = 0,
  start = {
    x: 0,
    y: 0
  };

function init() {
  var zoom = document.getElementById("zoom");
  zoom.onmousedown = mousedown_handler;
  zoom.onmouseup = mouseup_handler;
  zoom.onmousemove = mousemove_handler;
  zoom.onwheel = mousewheel_handler;

  zoom.onpointerdown = mousedown_handler;
  zoom.onpointerup = mouseup_handler;
  zoom.onpointercancel = mouseup_handler;
  zoom.onpointerout = mouseup_handler;
  zoom.onpointerleave = mouseup_handler;

  zoom.onpointermove = pointermove_handler;
};

function setTransform() {
  zoom.style.transform =
    "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
};

function mousedown_handler(e) {
  e.preventDefault();
  start = {
    x: e.clientX - pointX,
    y: e.clientY - pointY
  };
  panning = true;
  evCache.push(e); // adicionado para a função touche
};

function mouseup_handler(e) {
  panning = false;

  // Remove this pointer from the cache and reset the target's
  // background and border
  remove_event(e);

  // If the number of pointers down is less than two then reset diff tracker
  if (evCache.length < 2) {
    prevDiff = -1;
  }
};

function remove_event(ev) {
  // Remove this event from the target's cache
  for (var i = 0; i < evCache.length; i++) {
    if (evCache[i].pointerId == ev.pointerId) {
      evCache.splice(i, 1);
      break;
    }
  }
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
  ev.preventDefault();
  // Find this event in the cache and update its record with this event
  for (var i = 0; i < evCache.length; i++) {
    if (ev.pointerId == evCache[i].pointerId) {
      evCache[i] = ev;
      break;
    }
  }

  if (evCache.length == 1) {
    mousemove_handler(ev);
  };


  // If two pointers are down, check for pinch gestures
  if (evCache.length == 2) {
    // Calculate the distance between the two pointers
    var curDiff = Math.abs(evCache[0].clientX - evCache[1].clientX);
    var xs = (ev.clientX - pointX) / scale;
    var ys = (ev.clientY - pointY) / scale;

    if (prevDiff > 0) {
      if (curDiff > prevDiff) {
        // The distance between the two pointers has increased
        // Pinch moving OUT -> Zoom in
        ev.target.style.background = "pink";
        scale *= 1.05;
      }

      if (curDiff < prevDiff) {
        // The distance between the two pointers has decreased
        // Pinch moving IN -> Zoom out
        ev.target.style.background = "lightblue";
        scale /= 1.05;
      }

      pointX = ev.clientX - xs * scale;
      pointY = ev.clientY - ys * scale;

      setTransform();
    };

  }

  // Cache the distance for the next move event
  prevDiff = curDiff;
}



function mousewheel_handler(e) {
  e.preventDefault();
  var xs = (e.clientX - pointX) / scale,
    ys = (e.clientY - pointY) / scale,
    delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
  delta > 0 ? (scale *= 1.2) : (scale /= 1.2);
  if (scale < 1) { scale = 1 };
  if (scale > 20) { scale = 20 };
  pointX = e.clientX - xs * scale;
  pointY = e.clientY - ys * scale;

  setTransform();
};