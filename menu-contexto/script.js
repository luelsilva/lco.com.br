function mostrarMenu() {
    var X = event.clientX;
    var Y = event.clientY;

    var menu = document.getElementById("divMenu");

    menu.style.top = Y.toString() + "px";
    menu.style.left = X.toString() + "px";
    menu.style.visibility = "visible";

    var lis = document.querySelectorAll("#divMenu > ul > li");
    for (var i = 0; i < lis.length; i++) {
        lis.item(i).addEventListener("click", function () {
            menu.style.visibility = "hidden";
        });
    }
}

window.onload = function () {
    document.addEventListener("click",
        function () {
            document.getElementById("divMenu").style.visibility = "hidden";
        }
    );

    document.querySelector("#divMenu > ul > li:nth-child(1)").addEventListener("click",
        function () {
            alert("copiar...");
        }
    );

    document.querySelector("#divMenu > ul > li:nth-child(2)").addEventListener("click",
        function () {
            alert("recortar...");
        }
    );

    document.querySelector("#divMenu > ul > li:nth-child(3)").addEventListener("click",
        function () {
            alert("colar...");
        }
    );
}