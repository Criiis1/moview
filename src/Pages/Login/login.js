import { auth } from '../../../firebase.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.getElementById("submit-button-login").addEventListener("click", function (e) {
  e.preventDefault();

  const email = document.getElementById("email-login-user-form").value;
  const password = document.getElementById("pass-login-user-form").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login exitoso");
      window.location.href = "../../Pages/Dashboard/index.html";
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});

// Para mantener la sesión activa:
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuario activo:", user.email);
  } else {
    console.log("Usuario no autenticado");
  }
});
