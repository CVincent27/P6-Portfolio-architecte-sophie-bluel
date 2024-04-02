import { getWorks, deleteWork } from './service.js';

// ---- Première modale ----

// récupération de la modale html
const modalProjet = document.querySelector("#modal-projet");
const modalContainer = document.querySelector(".modal-container");
const galleryModalContainer = document.querySelector(".gallery-modal");

modalProjet.append(modalContainer);
modalContainer.append(galleryModalContainer);

// Affichage et suppr des travaux
 function createWorksModal(work) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const removeBtn = document.createElement("i");
    img.src = work.imageUrl;
    removeBtn.className = "fa-solid fa-trash-can";
    figure.append(img);
    figure.append(removeBtn);
    const galleryModal = document.querySelector(".gallery-modal");
    galleryModal.appendChild(figure);
    // TODO: mettre la gallery au dessus de l'input
    removeBtn.addEventListener("click", async () => {
        await deleteWork(work.id)
        figure.remove()
    })
    
}

// Afficher les travaux dans la modale
export async function displayWorksModal() {
    const arrayWorks = await getWorks();
    arrayWorks.forEach(work => {
        createWorksModal(work);
    });
}
displayWorksModal()

// ---- Seconde modale ----

// récupère la seconde modale
const modalProjetPhoto = document.querySelector("#modal-projet-photo");
// récupère le bouton qui ouvre la seconde modale depuis la première modale
const btnOpenSecondModal = document.querySelector("#btn-add-photo");
// récupère le bouton qui ferme la seconde modale
const btnCloseSecondModal = document.querySelector("#modal-projet-photo #modal-close");

// ouverture de la seconde modale 
btnOpenSecondModal.addEventListener("click", function () {
    // Ferme la première modale
    modalProjet.close();
    // Ouvre la seconde modale
    modalProjetPhoto.showModal();
});

// fermeture de la seconde modale
btnCloseSecondModal.addEventListener("click", function () {
    modalProjetPhoto.close();
});

// fermeture de la seconde modale si click en dehors
window.addEventListener("click", function (event) {
    if (event.target == modalProjetPhoto) {
        modalProjetPhoto.close();
    }
});



//fonctionnement modale
// récupère la 1ere modale
var firstModal = document.getElementById("modal-projet");

// récupère le bouton qui ouvre la modale
var btnOpenModal = document.getElementById("modal-projet-btn");

// récupère le bouton qui ferme la modale
var btnCloseModal = document.getElementById("modal-close");

// ouverture de la modale au click
btnOpenModal.addEventListener("click", function () {
    firstModal.showModal();
});

// fermeture de la modale
btnCloseModal.addEventListener("click", function () {
    firstModal.close();
});

// fermeture de la modale si click en dehors
window.addEventListener("click", function (event) {
    if (event.target == firstModal) {
        firstModal.close();
    }
});

