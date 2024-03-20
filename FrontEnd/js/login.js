const form = document.querySelector("form");
const email = document.querySelector("form #email");
const password = document.querySelector("form #pass");

// affiche les msg d'erreur
const errorMsg = document.querySelector("#contact p");
// console.log(errorMsg);

form.addEventListener("submit", async function (event) {
    // évite le rechargement de la page quand on envoie le form
    event.preventDefault(); 
});

// On récupère les valeurs dans login
const login = {
    email: document.querySelector("[name='email']").value,
    password: document.querySelector("[name='password']").value,
};
