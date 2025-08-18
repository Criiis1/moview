// InputsControl.js (module)
import { auth } from "../../../firebase.js"; // <<-- AJUSTA ESTA RUTA según donde esté tu firebase.js
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

$(document).ready(function () {

    var EmailValid = false;
    var PassValid = false;

    $('#email-login-user-form').focusout(function () {
        if ($('#email-login-user-form').val().length == 0) {
            $('.warning-email-error').removeClass('hidden');
            $('.warning-pass-error').css({ 'margin-top': '80px' });
            $('#email-login-user-form').css({ 'border-bottom': '2.5px solid #ffa00a' });
            $('#pass-login-user-form').css({ 'margin-top': '35px' });
            $('.lb-email').css({ 'margin-top': '-170px' });
            $('.lb-pass').css({ 'margin-top': '0px' });
            EmailValid = false;
        } else {
            $('.lb-email').css({ 'margin-top': '-190px', 'margin-right': '-590px', 'font-size': '12px' });
            $('#email-login-user-form').css({ 'border': 'none' });
            $('.warning-email-error').addClass('hidden');
            EmailValid = true;
        }
    });

    $('#email-login-user-form').focus(function () {
        $('.lb-email').css({ 'margin-top': '-190px', 'margin-right': '-590px', 'font-size': '12px' });
        $('#email-login-user-form').css({ 'border': 'none' });
        $('.warning-email-error').addClass('hidden');
    });

    $('#pass-login-user-form').focusout(function () {
        let passLength = $('#pass-login-user-form').val().length;
        if (passLength == 0 || passLength < 4 || passLength > 60) {
            $('.warning-pass-error').removeClass('hidden');
            $('#pass-login-user-form').css({ 'border-bottom': '2.5px solid #ffa00a' });
            $('.lb-pass').css({ 'margin-top': '-20px', 'margin-right': '-590px' });
            PassValid = false;
        } else {
            $('.lb-pass').css({ 'margin-top': '-10px', 'margin-right': '-590px', 'font-size': '12px' });
            $('#pass-login-user-form').css({ 'border': 'none' });
            $('.warning-pass-error').addClass('hidden');
            PassValid = true;
        }
    });

    $('#pass-login-user-form').focus(function () {
        $('.lb-pass').css({ 'margin-top': '-20px', 'margin-right': '-590px', 'font-size': '12px' });
        $('#pass-login-user-form').css({ 'border': 'none' });
        $('.warning-pass-error').addClass('hidden');
    });

    // Botón de login con Firebase Modular + "Remember me"
    $('#submit-button-login').click(async function (e) {
        e.preventDefault(); // evita redirección automática

        let email = $('#email-login-user-form').val().trim();
        let password = $('#pass-login-user-form').val().trim();
        // checkbox remember me (ya lo tienes en tu HTML con id user-true-login)
        const remember = $('#user-true-login').is(':checked');

        if (EmailValid && PassValid) {
            try {
                // Define persistencia según remember checkbox
                await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);

                // intenta login
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                
                // login correcto -> redirigir
                window.location.href = '../Dashboard/index.html';
            } catch (error) {
                console.error("Firebase login error:", error);
                // puedes mostrar errores en tus spans en vez de alert si prefieres
                alert("Error al iniciar sesión: " + error.message);
            }
        } else {
            // Mostrar errores de validación (tu diseño)
            $('.warning-email-error').removeClass('hidden');
            $('.warning-pass-error').css({ 'margin-top': '80px' });
            $('#email-login-user-form').css({ 'border-bottom': '2.5px solid #ffa00a' });
            $('#pass-login-user-form').css({ 'margin-top': '35px', 'border-bottom': '2.5px solid #ffa00a' });
            $('.lb-email').css({ 'margin-top': '-170px' });
            $('.lb-pass').css({ 'margin-top': '-20px', 'margin-right': '-590px' });
            $('.warning-pass-error').removeClass('hidden');
        }
    });

});
