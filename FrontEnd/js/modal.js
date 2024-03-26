// ---- Première modale ----
// récupération de la modal html
const modalProjet = document.querySelector("#modal-projet");

const modalContainer = document.createElement("div");
modalContainer.className = "modal-container";

// logo font awesome X
const imgModalContainer = document.createElement("i");
imgModalContainer.id = "first-modal-close";
imgModalContainer.className = "fa-solid fa-xmark";

// titre de la modale
const h3ModalContainer = document.createElement("h3");
h3ModalContainer.innerText = "Galerie photo";
console.log(h3ModalContainer);

const galleryModalContainer = document.createElement("div");
galleryModalContainer.className = "gallery-modal";
const hrModalContainer = document.createElement("hr");

const btnAddPhoto = document.createElement("a");
btnAddPhoto.href = "#modal-projet-photo";
btnAddPhoto.id = "btn-add-photo";
btnAddPhoto.innerText = "Ajouter une photo";

const btnRemoveGallery = document.createElement("button");
btnRemoveGallery.innerText = "Supprimer la galerie";

modalProjet.append(modalContainer);
modalContainer.append(
    imgModalContainer,
    h3ModalContainer,
    galleryModalContainer,
    hrModalContainer,
    btnAddPhoto,
    btnRemoveGallery
);

//fonctionnement modale
// récupère la 1ere modale
var firstModal = document.getElementById("modal-projet");

// récupère le bouton qui ouvre la modale
var btnOpenModal = document.getElementById("modal-projet-btn");

// récupère le bouton qui ferme la modale
var btnCloseModal = document.getElementById("first-modal-close");

// ouverture de la modale au click
btnOpenModal.addEventListener("click", function () {
    firstModal.style.display = "block";
});

// fermeture de la modale
btnCloseModal.addEventListener("click", function () {
    firstModal.style.display = "none";
});

// fermeture de la modale si clic en dehors de la modale
window.addEventListener("click", function (event) {
    if (event.target == firstModal) {
        firstModal.style.display = "none";
    }
});