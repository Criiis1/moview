import { auth } from "../../../../firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Si no hay sesión, redirige al login
    window.location.href = "../../Pages/Login/index.html";
  } else {
    // Usuario está logueado, mostrar email si quieres
    const userEmailSpan = document.getElementById("user-email");
    if (userEmailSpan) {
      userEmailSpan.textContent = user.email || "Email no disponible";
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const logoutLink = document.querySelector('a.dropdown-item[href*="Login/index.html"]');

  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault(); 
      signOut(auth)
        .then(() => {
          window.location.href = "../../Pages/Login/index.html";
        })
        .catch((error) => {
          console.error("Error al cerrar sesión:", error);
        });
    });
  }
});
