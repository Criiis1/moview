    import { auth } from "./firebase.js";
    import { onAuthStateChanged, signOut, updatePassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

    const userEmailSpan = document.getElementById("account-email");
    const userEmailNav = document.getElementById("user-email");
    const logoutLink = document.getElementById("logout-link");
    const changePasswordForm = document.getElementById("change-password-form");
    const passwordMessage = document.getElementById("password-message");

    // Mostrar email y controlar sesión
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userEmailSpan.textContent = user.email;
        userEmailNav.textContent = user.email;
      } else {
        window.location.href = "../../Login/index.html";
      }
    });

    // Logout
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      signOut(auth).then(() => {
        window.location.href = "../../Login/index.html";
      });
    });

    // Cambiar contraseña
    changePasswordForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newPassword = document.getElementById("new-password").value.trim();
      const user = auth.currentUser;

      if (!user) {
        passwordMessage.textContent = "No user is signed in.";
        passwordMessage.style.color = "red";
        return;
      }

      updatePassword(user, newPassword)
        .then(() => {
          passwordMessage.textContent = "Password updated successfully!";
          passwordMessage.style.color = "green";
          changePasswordForm.reset();
        })
        .catch((error) => {
          passwordMessage.textContent = "Error: " + error.message;
          passwordMessage.style.color = "red";
        });
    });