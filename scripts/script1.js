// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCahLUq03Hk9iCkoRSWKuEHAFoWbSG5yc4",
  authDomain: "personal-portfolio-9767b.firebaseapp.com",
  projectId: "personal-portfolio-9767b",
  storageBucket: "personal-portfolio-9767b.appspot.com",
  messagingSenderId: "752079549972",
  appId: "1:752079549972:web:f5da46980625ac6bd51901",
  measurementId: "G-MGEPM981SX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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

function submitForm(e) {
    e.preventDefault();
    
    //get values
    var name = getInputVal("name");
    var email = getInputVal("email");
    var phoneNumber = getInputVal("phoneNumber");
    var message = getInputVal("message");
}

//Get contact form values
function getInputVal(id) {
    return document.getElementById(id).value;
}