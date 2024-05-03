// Récuperer les travaux 
export async function getWorks() {
    const responseWorks = await fetch("http://localhost:5678/api/works")
        .then(response => response.json());
    return await responseWorks;
}

// Récuperer les categories
export async function getCategories() {
    const responseCategories = await fetch("http://localhost:5678/api/categories")
        .then(response => response.json());
    return await responseCategories;
}

// Supprimer work
export async function deleteWork(id) {
    try {
        const responseDeleteWork = await fetch("http://localhost:5678/api/works/" + id, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("Token")
            }
        })
            
        .then(response => response.json());
        return await responseDeleteWork;
    } catch (error) {
        console.log(error);
    }

}

// Ajout travaux
export async function addWork(formData) {
    const responseFormData = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
        },
        body: formData,
    });
    return responseFormData;
}

// Connexion user
export async function loginUser(loginData) {
    const responseLogin = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
    });

    return responseLogin.json();
}
