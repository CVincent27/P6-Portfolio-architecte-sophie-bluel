// Récuperer les travaux 
export async function getWorks() {
    try {
        const responseWorks = await fetch("http://localhost:5678/api/works")
        .then(response => response.json());
        return await responseWorks;

    } catch (error) {
        console.error("Une erreur est survenue pendant la récupération des travaux", error);

    }
}

// Récuperer les categories
export async function getCategories() {
    try {
        const responseCategories = await fetch("http://localhost:5678/api/categories")
        .then(response => response.json());
        return await responseCategories;

    } catch (error) {
        console.error("Une erreur est survenue pendant la récupération des catégories", error);

    }
}

// Supprimer work
export async function deleteWork(id) {
    try {
        const responseDeleteWork = await fetch("http://localhost:5678/api/works/" + id, {
            method:"DELETE",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("Token")
            }
        })
        .then(response => response.json());
        return await responseDeleteWork;

    } catch (error) {

    }
    
}

// test ajout travaux
export async function addWork(formData) {
    try {
        const responseFormData = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("Token"),
            },
            body: formData,
        });

        return responseFormData;
    } catch (error) {
    }
}
