// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe9qqoRNEVwzGPXfmKOzNl7wWqgetu1JI",
  authDomain: "nirjhar-deb-personal-portfolio.firebaseapp.com",
  projectId: "nirjhar-deb-personal-portfolio",
  storageBucket: "nirjhar-deb-personal-portfolio.appspot.com",
  messagingSenderId: "1076827520750",
  appId: "1:1076827520750:web:6f44740be0d37f20dc7dff"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

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
document.getElementById("submitButton").addEventListener("click", submitForm);

function submitForm(e) {
    e.preventDefault();
    
    //Get input values
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let message = document.getElementById("message").value;
    saveContactInfo(name,email,phone,message);
}

//Save infos to Firebase
function saveContactInfo(name, email, phone, message) {
    push(ref(db, 'contacters/' + name + "/"), {
        name: name,
        email: email,
        phone: phone,
        message: message
    });
}