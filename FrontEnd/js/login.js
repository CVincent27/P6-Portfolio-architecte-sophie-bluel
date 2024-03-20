const form = document.querySelector("form");


form.addEventListener("submit", async function (event) {
    // évite le rechargement de la page quand on envoie le form
    event.preventDefault(); 

    let errorMsg = document.createElement("span");
    let inputEmail = document.querySelector("[name='email']");
    let inputPassword = document.querySelector("[name='password']");

    // On récupère les valeurs dans login
    const login = {
    email: inputEmail.value,
    password: inputPassword.value,
    };
    // console.log(login);

    // vérifie que les champs ne sont pas vide
    if (!login.email || !login.password) {
        inputPassword.insertAdjacentElement("afterend",errorMsg);
        errorMsg.className = "message-error-login";
        errorMsg.innerText = "Veuillez compléter l'ensemble des champs à saisir";
    } else {

        // envoi information sur l'API login
        const responseLogin = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(login),
        });

        const response = await responseLogin.json();
        //récupération token et statut de la réponse
        const reponseToken = response.token;
        const reponseState = responseLogin.ok;

        // Retour en fonction du statut de la réponse
        if (reponseState) {
            sessionStorage.setItem("Token", reponseToken);
            window.location.replace("index.html");
        } else {
            inputPassword.insertAdjacentElement("afterend",errorMsg);
            errorMsg.className = "message-error-login";
            errorMsg.innerText = "Erreur dans l'identifiant ou le mot de passe";
        };
    };
});

