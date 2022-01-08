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

//Set contact format check to false
var contactFormatCheck = false;

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
    saveContactInfo(name, email, phone, message);
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

    //Helps bypass the phone test if phone number is not inputted
    if(phone === "") {
        phoneTest = 1;
    }

    //Various checks on the form for format and completion
    if (name === "" || email === "" || message === "") {
        window.alert("One or more fields of the form are empty. Please complete all of the required fields (marked by an *).");
    } else if (emailTest == null && phoneTest == null) {
        window.alert("Email address and phone number inputted incorrectly. Please enter your email in the format of johndoe@email.com, and enter your phone number in the format of ### ### ####, ###-###-####, or ##########.");
    } else if (emailTest == null) {
        window.alert("Email address inputted incorrectly. Please enter your email in the format of johndoe@email.com.");
    } else if (phoneTest == null) {
        window.alert("Phone number inputted incorrectly. Please enter your phone number in the format of ### ### ####, ###-###-####, or ##########.");
    } else {
        contactFormatCheck = true;
    }
}

//Save details from the form to Firebase database
function saveContactInfo(name, email, phone, message) {
    checkContactFormat(name, email, phone, message);
    if (contactFormatCheck) {
        push(ref(db, 'messengers/' + name + "/"), {
            //Attempt to submit user data to Firebase
            name: name,
            email: email,
            phone: phone,
            message: message
        })
            .then(() => {
                //Save user contact information to a .txt file
                var userInfo = "Name: " + document.getElementById("name").value + "\nEmail: " + document.getElementById("email").value + "\nPhone: " + document.getElementById("phone").value + "\nMessage: " + document.getElementById("message").value;                
                let userInfoDoc = document.createElement('userInfoDoc');
                userInfoDoc.href = "data:application/octet-stream,"+encodeURIComponent(userInfo);
                userInfoDoc.download = 'userInfo.txt';

                //Submitted successfully and sends an email to me and the user containing the user's contact information in a .txt file
                Email.send({
                    SecureToken: "5735a6f0-ac77-4cfe-96e6-21fe4661feb3",
                    To: ['nirjhardeb03@gmail.com',document.getElementById("email").value],
                    From: "nirjhardeb03@gmail.com",
                    Subject: "Nirjhar Deb's Personal Portfolio: Contact form successfully sent to Nirjhar from " + document.getElementById("name").value,
                    Body: "Greetings " + document.getElementById("name").value + "! Attached to this message is a text file containing your responses to my contact form to keep in your personal records. Have a nice day! ~~~ Nirjhar",
                        Attachments : [
                        {
                            name : "userInfo.txt",
                            path : userInfoDoc.href
                        }]
                }).then(
                    window.alert("Form submitted successfully! I have received your message and will email you within a week.\n\nIf your email address is valid, you will receive an automatically generated email containing your responses to this form. Occasionally, this email may find its way into your spam/junk folder.\n\nHave a fantastic day!")
                );

                //Resets the form
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("phone").value = "";
                document.getElementById("message").value = "";
                contactFormatCheck = false;
            })
            .catch((error) => {
                window.alert("Failed to submit form. Please try again.");
                console.log(error);
            });
    }
}

//Listen for a click of the reset button to call the resetForm method
document.getElementById("resetButton").addEventListener("click", resetForm);

//Clears all the fields of the contact form
function resetForm() {
    if (window.confirm("Are you sure that you would like to reset the form?")) {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("message").value = "";
        contactFormatCheck = false;
    }
}