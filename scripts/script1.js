//Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe9qqoRNEVwzGPXfmKOzNl7wWqgetu1JI",
  authDomain: "nirjhar-deb-personal-portfolio.firebaseapp.com",
  projectId: "nirjhar-deb-personal-portfolio",
  storageBucket: "nirjhar-deb-personal-portfolio.appspot.com",
  messagingSenderId: "1076827520750",
  appId: "1:1076827520750:web:6f44740be0d37f20dc7dff"
};

//Initialize Firebase app and get the database
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//Establish different variables used to change "Hello!" to other languages
var helloText = ["Hello!", "¡Hola!", "Hallo!", "Olá!", "Ciao!", "Namaste!", "Halló!", "Hej!"];
var helloCounter = 0;
var helloRepeatMethod = setInterval(changeHello,2000);
var contactFormatCheck = false;

//Alternate between different languages' versions of the word "hello"
function changeHello() {
    document.getElementById("hello").innerHTML = helloText[helloCounter];
    document.getElementById("banner-text").innerHTML = helloText[helloCounter];
    helloCounter++;
    if(helloCounter >= helloText.length) {
        helloCounter = 0;
    }
}

//Lists the functions to be executed the moment the website loads
window.onload = function () {
    changeHello();
};

//Listen for a click (i.e., when the user clicks the submit button) in the contact form
document.getElementById("submitButton").addEventListener("click", submitForm);

//Once the user hits the submit button, grab values from the form
function submitForm(e) {
    e.preventDefault();
    
    //Get input values
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let message = document.getElementById("message").value;
    saveContactInfo(name,email,phone,message);
}

//Check information for correct format
function checkContactFormat(name, email, phone, message) {
    //Testing if email is in correct format (ex: johndoe@email.com)
    var emailTest = email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    //Testing if phone number is in correct format (ex: 470-832-9200 or 4708329200 or 470 832 9200)
    var phoneTest = phone.match(
        /^\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/
    );

    //Various checks on the form for format and completion
    if(name === "" || email === "" || phone === "" || message === "") {
        window.alert("One or more fields of the form are empty. Please complete all of the fields.");
    } else if(emailTest == null && phoneTest == null) {
        window.alert("Email address and phone number inputted incorrectly. Please enter your email in the format of johndoe@email.com, and enter your phone number in the format of ### ### ####, ###-###-####, or ##########.");
    } else if(emailTest == null) {
        window.alert("Email address inputted incorrectly. Please enter your email in the format of johndoe@email.com.");
    } else if(phoneTest == null) {
        window.alert("Phone number inputted incorrectly. Please enter your phone number in the format of ### ### ####, ###-###-####, or ##########.");
    } else {
        contactFormatCheck = true;
    }
}

//Save details from the form to Firebase database
function saveContactInfo(name, email, phone, message) {
    checkContactFormat(name, email, phone, message);
    if(contactFormatCheck) {
        push(ref(db, 'messengers/' + name + "/"), {
            //Attempt to submit user data to Firebase
            name: name,
            email: email,
            phone: phone,
            message: message
        })
        .then(() => {
            //Submitted successfully
            window.alert("Form submitted successfully!");
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("message").value = "";
            contactFormatCheck = false;
        })
        .catch((error) => {
            //Failed to submit
            window.alert("Failed to submit form. Please try again.");
        });
    }
}

//Listen for a click of the reset button to call the resetForm method
document.getElementById("resetButton").addEventListener("click", resetForm);

//Clears all the fields of the contact form
function resetForm() {
    if(window.confirm("Are you sure that you would like to reset the form?")) {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("message").value = "";
        contactFormatCheck = false;
    }
}