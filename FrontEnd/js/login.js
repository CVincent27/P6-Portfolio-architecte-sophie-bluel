const form = document.querySelector("form");
let errorMsg = document.createElement("span");
let inputEmail = document.querySelector("[name='email']");
let inputPassword = document.querySelector("[name='password']");

form.addEventListener("submit", async function (event) {
    // évite le rechargement de la page quand on envoie le form
    event.preventDefault(); 
});

// On récupère les valeurs dans login
const login = {
    email: inputEmail.value,
    password: inputPassword.value,
};
console.log(login);
// vérifie que les champs ne sont pas vide
if (!login.email || !login.password) {
    inputPassword.insertAdjacentElement("afterend",spanElement);
    spanElement.className = "message-error-login";
    spanElement.innerText = "Veuillez compléter l'ensemble des champs à saisir";
} else {
    // envoi information sur l'API login
    const responseLogin = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
    });
};