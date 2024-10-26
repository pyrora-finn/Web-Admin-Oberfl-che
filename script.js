// Dummy-Daten für Benutzeranmeldung
const USERNAME = "admin";
const PASSWORD = "password";

// Zugriff auf die DOM-Elemente
const form = document.getElementById("form");
const dashboard = document.getElementById("dashboard");
const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");
const logoutButton = document.getElementById("logout");

// Event-Listener für das Anmeldeformular
form.addEventListener("submit", function (e) {
    e.preventDefault(); // Verhindert das Standardverhalten des Formulars

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Benutzeranmeldung überprüfen
    if (username === USERNAME && password === PASSWORD) {
        loginForm.classList.add("hidden");
        dashboard.classList.remove("hidden");
        errorMessage.textContent = ""; // Fehlernachricht zurücksetzen
    } else {
        errorMessage.textContent = "Ungültiger Benutzername oder Passwort.";
    }
});

// Event-Listener für Logout
logoutButton.addEventListener("click", function () {
    dashboard.classList.add("hidden");
    loginForm.classList.remove("hidden");
    errorMessage.textContent = ""; // Fehlernachricht zurücksetzen
    form.reset(); // Formular zurücksetzen
});
