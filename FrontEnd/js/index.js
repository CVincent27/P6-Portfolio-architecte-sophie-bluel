const gallery = document.querySelector(".gallery")

// Récuperer les travaux 
async function getWorks() {
    try {
        const responseWorks = await fetch("http://localhost:5678/api/works")
        .then(responseWorks => responseWorks.json());
        return await responseWorks;
        
    } catch (error) {
        console.error("Une erreur est survenue", error);
        
    }
}

// Afficher les travaux
async function displayWorks() {
    const arrayWorks = await getWorks()
    // console.log(arrayWorks);

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