var helloText = ["Hello!", "¡Hola!", "Namaste!", "Bonjour!"];
var helloCounter = 0;
var helloRepeatMethod = setInterval(changeHello,2000);

function changeHello() {
    document.getElementById("hello").innerHTML = helloText[helloCounter];
    helloCounter++;
    if(helloCounter >= helloText.length) {
        helloCounter = 0;
    }
}

window.onload = function () {
    changeHello();
};