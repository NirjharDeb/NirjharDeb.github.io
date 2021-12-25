var helloText = ["Hello!", "¡Hola!", "Hallo!", "Olá!", "Ciao!", "Namaste!", "!سلام", "Halló!", "Hej!"];
var helloCounter = 0;
var helloRepeatMethod = setInterval(changeHello,2000);

//Alternate between different languages' versions of the word "hello"
function changeHello() {
    document.getElementById("hello").innerHTML = helloText[helloCounter];
    helloCounter++;
    if(helloCounter >= helloText.length) {
        helloCounter = 0;
    }
}

//Lists the functions to be executed the moment the website loads
window.onload = function () {
    changeHello();
};

//Listen for a submit in the contact form
document.querySelector("contact-form").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    console.log(123);
}