const gallery = document.querySelector(".gallery")
const filter = document.querySelector(".filters")

// Récuperer les travaux et les afficher
async function displayWorks() {
    try {
        const responseWorks = await fetch("http://localhost:5678/api/works")
        .then(responseWorks => responseWorks.json());
        
        responseWorks.forEach(work => {
            const figure = document.createElement("figure")
            const img = document.createElement("img")
            const figcaption = document.createElement("figcaption")
            img.src = work.imageUrl;
            figcaption.textContent = work.title;
            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        })
        
    } catch (error) {
        console.error("Une erreur est survenue pendant la récupération des travaux", error);    
    }
}
displayWorks();


// Récupérer et afficher les categories
async function displayCategories() {
    try {
        const responseCategories = await fetch("http://localhost:5678/api/categories")
        .then(responseCategories => responseCategories.json());
        
        responseCategories.forEach(category => {
            const btn = document.createElement("button");
            btn.textContent = category.name;
            btn.id = category.id;
            btn.classList.add("filter-btn");
            filter.appendChild(btn);
        })
        
    } catch (error) {
        console.error("Une erreur est survenue pendant la récupération des catégories", error);
    }
}
displayCategories();

// Filtrer les btn par catégories
async function filterCategories() {
    await displayWorks();
    const filterBtn = document.querySelectorAll(".filter-btn");
    filterBtn.forEach(button => {
        button.addEventListener("click", (e) => {
            console.log(e.target.id);
        });
    });

     
    
}
filterCategories();