import { loginUser } from './service.js';

const form = document.querySelector("form");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    let inputEmail = document.querySelector("[name='email']");
    let inputPassword = document.querySelector("[name='password']");

    const login = {
        email: inputEmail.value,
        password: inputPassword.value,
    };

    if (!login.email || !login.password) {
        let errorMsg = document.querySelector("#login-error");

        if (!errorMsg) {
            errorMsg = document.createElement("span");
            errorMsg.id = "login-error";
            errorMsg.className = "message-error";
        }

        errorMsg.innerText = "Veuillez compléter l'ensemble des champs";
        inputPassword.insertAdjacentElement("afterend", errorMsg);
    } else {
        try {
            const response = await loginUser(login);
            
            // Vérifier si la réponse contient un token
            if (response && response.token) {
                localStorage.setItem("Token", response.token);
                window.location.replace("index.html");
            } else {
                let errorMsg = document.querySelector("#login-error");

                if (!errorMsg) {
                    errorMsg = document.createElement("span");
                    errorMsg.id = "login-error";
                    errorMsg.className = "message-error";
                }

                errorMsg.innerText = "Erreur dans l'identifiant ou le mot de passe";
                const inputPassword = document.querySelector("[name='password']");
                inputPassword.insertAdjacentElement("afterend", errorMsg);
            }
        } catch (error) {
            console.error('Erreur lors de la tentative de connexion :', error);
        }
    }
});
