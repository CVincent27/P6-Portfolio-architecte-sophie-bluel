import { getWorks, getCategories } from "./service.js"

const gallery = document.querySelector(".gallery")
const filter = document.querySelector(".filters")
// mettre try catch arrayworks
const arrayWorks = await getWorks()
let filterButtons;

export function createWorkFigure(work) {
    const figure = document.createElement("figure")
    figure.setAttribute("data-id", work.id)
    const img = document.createElement("img")
    const figcaption = document.createElement("figcaption")
    img.src = work.imageUrl;
    figcaption.textContent = work.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
}

function createCategoryBtn(category) {
    const btn = document.createElement("button");
    btn.textContent = category.name;
    btn.id = category.id;
    btn.classList.add("filter-btn");
    filter.appendChild(btn);
}

// Afficher les travaux
function displayWorks(works) {
    works.forEach(createWorkFigure)
}
displayWorks(arrayWorks);

// ----- Filtrer les boutons par catégories -----
async function filterCategories(e) {
    let btnId = e.target.id;
    gallery.innerHTML = "";

    // Retirer class select des btn filtres
    filterButtons.forEach(btn => {
        btn.classList.remove('select');
    });

    // ajout class select
    e.target.classList.add('select');

    let filterWorks = arrayWorks;
    
    if (btnId !== "0") {
        filterWorks = arrayWorks.filter((work) => {
            return work.categoryId == btnId;
        });
    }
    displayWorks(filterWorks);
}

// ----- Récupérer et afficher les categories -----
async function displayCategories() {
    try {
        const arrayCategories = await getCategories();
        arrayCategories.forEach(createCategoryBtn);

        filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', filterCategories);
        });
    } catch (error) {
        console.error('Erreur lors de l`affichage des catégories', error);
    }
}

displayCategories();


// Mode edition
const token = localStorage.getItem("Token");
console.log(token)

if (token) {
    const modeEdition = document.querySelectorAll(".edition-mode");
    for (let data of modeEdition) {
        data.classList.add("active");
    };
    // display none sur filters
    const modeEditionFilter = document.querySelector(".filters");
    modeEditionFilter.style.display = "none";
    // logout
    const logout = document.getElementById("login-logout");
    logout.setAttribute("href", "./index.html");
    logout.innerText = "logout";
    logout.addEventListener("click", function () {
        localStorage.removeItem("Token");
    });
};
