//Establish different variables used to change "Hello!" to other languages
var helloText = ["Hello!", "¡Hola!", "Hallo!", "Olá!", "Halló!", "Hej!"];
var helloCounter = 0;
var helloRepeatMethod = setInterval(changeHello, 2000);

//Alternate between different languages' versions of the word "hello"
function changeHello() {
    document.getElementById("hello").innerHTML = helloText[helloCounter];
    document.getElementById("banner-text").innerHTML = helloText[helloCounter];
    helloCounter++;
    if (helloCounter >= helloText.length) {
        helloCounter = 0;
    }
}

//Lists the functions to be executed the moment the website loads
window.onload = function () {
    changeHello;
};