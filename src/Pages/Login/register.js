// register.js
import { auth } from "../../../firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

document.getElementById("register-button").addEventListener("click", function (e) {
    e.preventDefault();

    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value.trim();

    if (email === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Registration successful! You can now log in.");
            window.location.href = "./index.html";
        })
        .catch((error) => {
            alert("Registration error: " + error.message);
        });
});
