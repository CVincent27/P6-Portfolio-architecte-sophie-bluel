const form = document.querySelector("form");


form.addEventListener("submit", async function (event) {
    // évite le rechargement de la page quand on envoie le form
    event.preventDefault();

    let errorMsg = document.querySelector("#login-error");

    if (!errorMsg) {
        errorMsg = document.createElement("span");
        errorMsg.id = "login-error";
        errorMsg.className = "message-error";
    }

    let inputEmail = document.querySelector("[name='email']");
    let inputPassword = document.querySelector("[name='password']");

    // récupère les valeurs
    const login = {
        email: inputEmail.value,
        password: inputPassword.value,
    };

    // vérifie que les champs ne sont pas vide
    if (!login.email || !login.password) {
        errorMsg.innerText = "Veuillez compléter l'ensemble des champs";
    } else {
        const responseLogin = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(login),
        });

        const response = await responseLogin.json();
        const reponseToken = response.token;
        const reponseState = responseLogin.ok;

        if (reponseState) {
            localStorage.setItem("Token", reponseToken);
            window.location.replace("index.html");
        } else {
            errorMsg.innerText = "Erreur dans l'identifiant ou le mot de passe";
        };
    };
    inputPassword.insertAdjacentElement("afterend", errorMsg);
});
