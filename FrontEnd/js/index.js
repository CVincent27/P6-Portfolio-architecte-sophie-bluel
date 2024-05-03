import { getWorks, getCategories } from "./service.js"

const gallery = document.querySelector(".gallery")
const filter = document.querySelector(".filters")
let filterButtons;
let arrayWorks; // Déplacez la déclaration de arrayWorks ici

// Fonction pour créer une figure de travail
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

// Fonction pour créer un bouton de catégorie
function createCategoryBtn(category) {
    const btn = document.createElement("button");
    btn.textContent = category.name;
    btn.id = category.id;
    btn.classList.add("filter-btn");
    filter.appendChild(btn);
}

// Fonction pour afficher les travaux
async function displayWorks() {
    try {
        arrayWorks = await getWorks(); // Assignez la valeur de getWorks à arrayWorks
        arrayWorks.forEach(createWorkFigure);
    } catch (error) {
        console.error('Erreur lors de la récupération des travaux', error);
    }
}

// Appel de la fonction displayWorks
try {
    displayWorks();
} catch (error) {
    console.error('Erreur lors de l`affichage des travaux', error);
}

// Fonction pour filtrer les catégories
async function filterCategories(e) {
    let btnId = e.target.id;
    gallery.innerHTML = "";

    // Retirer class select des btn filtres
    filterButtons.forEach(btn => {
        btn.classList.remove('select');
    });

    // ajout class select
    e.target.classList.add('select');

    if (arrayWorks) { // Vérifier si arrayWorks est défini
        let filterWorks = arrayWorks;

        if (btnId !== "0") {
            filterWorks = arrayWorks.filter((work) => {
                return work.categoryId == btnId;
            });
        }
        // Afficher les travaux filtrés dans la galerie
        filterWorks.forEach(createWorkFigure);
    }
}

// Fonction pour afficher les catégories
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
