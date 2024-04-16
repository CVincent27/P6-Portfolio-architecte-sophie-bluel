import { getWorks, getCategories } from "./service.js"

const gallery = document.querySelector(".gallery")
const filter = document.querySelector(".filters")
const arrayWorks = await getWorks()
let filterButtons;

function createWorkFigure(work) {
    const figure = document.createElement("figure")
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
    btn.addEventListener("click", filterCategories)
}

// Afficher les travaux
async function displayWorks(works) {
    works.forEach(createWorkFigure)
}
displayWorks(arrayWorks);

// ----- Filtrer les boutons par catégories -----
async function filterCategories(e) {
    let filterWorks = await getWorks();
    let btnId = e.target.id;
    gallery.innerHTML = "";

    // Retirer class select des btn filtres
    filterButtons.forEach(btn => {
        btn.classList.remove('select');
    });

    // add select class
    e.target.classList.add('select');
    
    if (btnId !== "0") {
        filterWorks = filterWorks.filter((work) => {
            return work.categoryId == btnId;
        });
    }
    displayWorks(filterWorks);
}

// ----- Récupérer et afficher les categories -----
async function displayCategories() {
    const arrayCategories = await getCategories()
    arrayCategories.forEach(createCategoryBtn)

    filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', filterCategories);
    });
}
displayCategories();

// test mode edition

// Affichage
const token = localStorage.getItem("Token");
// console.log(token)

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
