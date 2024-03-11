const gallery = document.querySelector(".gallery")

//  -- TODO: rassembler les 2 func en 1
// Récuperer les travaux 
async function getWorks() {
    try {
        const responseWorks = await fetch("http://localhost:5678/api/works")
        .then(responseWorks => responseWorks.json());
        return await responseWorks;
        
    } catch (error) {
        console.error("Une erreur est survenue pendant la récupération des travaux", error);
        
    }
}
// Afficher les travaux
async function displayWorks() {
    const arrayWorks = await getWorks()

    arrayWorks.forEach(work => {
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const figcaption = document.createElement("figcaption")
        img.src = work.imageUrl;
        figcaption.textContent = work.title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}
displayWorks();

// Récupérer et afficher les categories
async function displayCategories() {
    try {
        const responseCategories = await fetch("http://localhost:5678/api/categories")
        .then(responseCategories => responseCategories.json());
        console.log(responseCategories);
        
    } catch (error) {
        console.error("Une erreur est survenue pendant la récupération des catégories", error);
        
    }
}
displayCategories();