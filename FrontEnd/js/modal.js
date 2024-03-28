import { getWorks, createWorks } from './index.js';

// ---- Première modale ----
// récupération de la modal html
const modalProjet = document.querySelector("#modal-projet");

const modalContainer = document.createElement("div");
modalContainer.className = "modal-container";

// logo font awesome X
const imgModalContainer = document.createElement("i");
imgModalContainer.id = "modal-close";
imgModalContainer.className = "fa-solid fa-xmark";

// titre de la modale
const h3ModalContainer = document.createElement("h3");
h3ModalContainer.innerText = "Galerie photo";
// console.log(h3ModalContainer);


const galleryModalContainer = document.createElement("div");
galleryModalContainer.className = "gallery-modal";
const hrModalContainer = document.createElement("hr");


// remove photo



// add photo
const btnAddPhoto = document.createElement("input");
btnAddPhoto.type = "submit"
btnAddPhoto.id = "btn-add-photo";
btnAddPhoto.value = "Ajouter une photo";

modalProjet.append(modalContainer);
modalContainer.append(
    imgModalContainer,
    h3ModalContainer,
    galleryModalContainer,
    hrModalContainer,
    btnAddPhoto,
    
);

// Affichage des travaux
export async function createWorksModal(work) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const removeBtn = document.createElement("i");
    img.src = work.imageUrl;
    removeBtn.className = "fa-solid fa-trash-can";
    removeBtn.id = "remove-btn";
    figure.append(img);
    figure.append(removeBtn);
    const galleryModal = document.querySelector(".gallery-modal");
    galleryModal.appendChild(figure);
    
}

// Afficher les travaux dans la modale
export async function displayWorksModal() {
    const arrayWorks = await getWorks();
    arrayWorks.forEach(work => {
        createWorksModal(work);
    });
}
displayWorksModal()

//fonctionnement modale
// récupère la 1ere modale
var firstModal = document.getElementById("modal-projet");

// récupère le bouton qui ouvre la modale
var btnOpenModal = document.getElementById("modal-projet-btn");

// récupère le bouton qui ferme la modale
var btnCloseModal = document.getElementById("modal-close");

// ouverture de la modale au click
btnOpenModal.addEventListener("click", function () {
    firstModal.style.display = "block";
});

// fermeture de la modale
btnCloseModal.addEventListener("click", function () {
    firstModal.style.display = "none";
});

// fermeture de la modale si click en dehors
window.addEventListener("click", function (event) {
    if (event.target == firstModal) {
        firstModal.style.display = "none";
    }
});

