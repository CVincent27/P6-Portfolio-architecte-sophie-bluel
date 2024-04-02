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
// ouvrir 2nd depuis 1ere modale
const btnOpenSecondModal = document.querySelector("#btn-add-photo");
// fermer 2nd modal
// const btnCloseModal = document.querySelector("#modal-projet-photo #modal-close");

// ouverture de la seconde modale (via 1ere modal)
btnOpenSecondModal.addEventListener("click", function () {
    // Ferme la première modale
    modalProjet.close();
    // Ouvre la seconde modale
    modalProjetPhoto.showModal();
});

// // fermeture de la seconde modale
// btnCloseSecondModal.addEventListener("click", function () {
//     modalProjetPhoto.close();
// });




//fonctionnement modale

// Open modale
var btnOpenModal = document.getElementById("modal-projet-btn");

// btn close 1rst modale
var btnCloseFirstModal = document.getElementById("modal-close");
// btn close 2nd modale
var btnCloseSecondModal = document.querySelector("#modal-projet-photo #modal-close");
// btn back
var btnBackModal = document.getElementById("modal-back");

// ouverture de la modale au click
btnOpenModal.addEventListener("click", function () {
    modalProjet.showModal();
});

// fermeture 1ere modale
btnCloseFirstModal.addEventListener("click", function () {
    modalProjet.close();
});
// fermeture 2nd modale
btnCloseSecondModal.addEventListener("click", function () {
    modalProjetPhoto.close();
});

// fermeture de la modale si click en dehors
window.addEventListener("click", function (event) {
    if (event.target == modalProjet || event.target == modalProjetPhoto) {
        event.target.close();
    }
});

// revenir en arrière (2nd -> 1st)
btnBackModal.addEventListener("click", function () {
    modalProjetPhoto.close();
    modalProjet.showModal();
});

