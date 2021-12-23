//Reference messages collection
var messagesRef = firebase.database().ref('messages');

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

//Listen to submit event from contact form
var submitCheck = document.getElementById("submitButton");
if(submitCheck) {
    submitCheck.addEventListener("submit", submitForm);
}

//Submit form
function submitForm(e) {
    e.preventDefault();
    
    //get values
    var name = getInputVal("name");
    var email = getInputVal("email");
    var phoneNumber = getInputVal("phoneNumber");
    var message = getInputVal("message");

    saveMessage(name,email,phoneNumber,message);
}

//Get contact form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

//Save messages to firebase
function saveMessage(name,email,phoneNumber,message) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        message: message
    });
}