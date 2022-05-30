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
};


function setTransform() {
    zoom.style.transform =
      "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
  };

  function mousedown_handler(e) {
    e.preventDefault();
    start = { x: e.clientX - pointX, y: e.clientY - pointY };
    panning = true;
  };

  function mouseup_handler(e) {
    panning = false;
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