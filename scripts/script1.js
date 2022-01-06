//Establish different variables used to change "Hello!" to other languages
var helloText = ["Hello!", "¡Hola!", "Hallo!", "Olá!", "Halló!", "Hej!"];
var helloCounter = 0;
var helloRepeatMethod = setInterval(changeHello, 2000);

//Alternate between different languages' versions of the word "hello"
function changeHello() {
    document.getElementById("hello1").innerHTML = helloText[helloCounter];
    helloCounter++;
    if (helloCounter >= helloText.length) {
        helloCounter = 0;
    }
}

//Lists the functions to be executed the moment the website loads
window.onload = function () {
    changeHello;
};

//Switches to Menu button for dropdown menu in mobile mode
window.onresize = function () {
    if (window.matchMedia('screen and (max-device-width: 480px)').matches) {
        document.getElementById("home1").innerHTML = "Menu";
        document.getElementById("home1").setAttribute("href", "javascript:void(0)");
    } else if (!(window.matchMedia('screen and (max-device-width: 480px)').matches)) {
        document.getElementById("home1").innerHTML = "Home";
        document.getElementById("home1").setAttribute("href", "index.html");
    }
}