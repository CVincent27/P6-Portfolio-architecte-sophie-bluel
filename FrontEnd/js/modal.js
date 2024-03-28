import { getWorks, deleteWork } from './service.js';

// ---- Première modale ----
// récupération de la modal html
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
    removeBtn.addEventListener("click", async () => {
        await deleteWork(work.id)
        // Supprimer manuellement
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

