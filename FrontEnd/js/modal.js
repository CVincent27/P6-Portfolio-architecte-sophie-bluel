import { getWorks, deleteWork, getCategories, addWork } from './service.js';
import { displayWorks } from './index.js'

//pour affichage message erreur
let spanElement = document.createElement("span");
spanElement.innerText = "";
spanElement.className = "";

let works = [];

// ---- Première modale ----

// récupération de la modale html
const modalProjet = document.querySelector("#modal-projet");
const modalContainer = document.querySelector(".modal-container");
const galleryModalContainer = document.querySelector(".gallery-modal");

modalProjet.append(modalContainer);
modalContainer.append(galleryModalContainer);

// Fonction pour ajouter un travail à la modale
function createWorksModal(work) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const removeBtn = document.createElement("i");
    figure.className = "work-figure";
    img.src = work.imageUrl;
    removeBtn.className = "fa-solid fa-trash-can";
    figure.appendChild(img);
    figure.appendChild(removeBtn);
    const galleryModal = document.querySelector(".gallery-modal");
    galleryModal.appendChild(figure);
    const gallery = document.querySelector(".gallery");

    removeBtn.addEventListener("click", async () => {
        try {
            await deleteWork(work.id);
            figure.remove();
            works = await getWorks();
            gallery.innerHTML = '';
            displayWorks(works);
            console.log(works);
        } catch (error) {
            console.error("Une erreur est survenue lors de la suppression du travail depuis la modale :", error);
        }
    });
    
}

// Afficher les travaux dans la modale
export async function displayWorksModal() {
    try {
        const arrayWorks = await getWorks();
        arrayWorks.forEach(work => {
            createWorksModal(work);
        });
    } catch (error) {
        console.error("Une erreur est survenue lors de l'affichage des travaux dans la modale :", error);
    }
}

// Placer la div de classe "gallery-modal" en première position dans le parent
const contentContainer = document.querySelector(".content-container");
const firstChild = contentContainer.firstChild;
contentContainer.insertBefore(galleryModalContainer, firstChild);

displayWorksModal()

// fonctionnement modale

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


// ---- Seconde modale ----

// récupère la seconde modale
const modalProjetPhoto = document.querySelector("#modal-projet-photo");
// ouvrir 2nd depuis 1ere modale
const btnOpenSecondModal = document.querySelector(".btn-add-photo");

// ouverture de la seconde modale (via 1ere modal)
btnOpenSecondModal.addEventListener("click", function () {
    // Ferme la première modale
    modalProjet.close();
    // Ouvre la seconde modale
    modalProjetPhoto.showModal();
});

// upload img et verif taille et type de fichier
const newWork = document.querySelector("#myfile");

newWork.addEventListener("change", function () {
    spanElement.className = "";
    spanElement.innerText = "";
    const reader = new FileReader();
    const type = document.getElementById("myfile").files[0].type;
    if (type !== "image/png" && type !== "image/jpeg" && type !== "image/jpg") {
        console.log("Mauvais format");
    } else {
        reader.addEventListener("load", () => {
            // Cacher la div de classe "form-upload-photo"
            const formUploadPhotoDiv = document.querySelector(".form-upload-photo");
            formUploadPhotoDiv.style.display = "none";

            // Création d'une nouvelle balise img
            const imgElement = document.createElement("img");
            imgElement.src = reader.result;
            imgElement.id = "display-image";

            // Récupérer la div de class "add-form-photo"
            const formAddPhotoDiv = document.querySelector(".container-add-photo");

            // Insérer la balise img dans la div de class "add-form-photo"
            formAddPhotoDiv.appendChild(imgElement);
        });
        reader.readAsDataURL(this.files[0]);
    }
});

// récupérer et afficher les catégories dans le select
async function CategoriesSelect() {
    try {
        const categories = await getCategories(); //
        const selectCategorieFormAddPhoto = document.getElementById("select-categorie");

        // ajoute chaque categories dans une option
        categories.forEach(categorie => {
            const optionForm = document.createElement("option");
            optionForm.value = categorie.id;
            optionForm.innerText = categorie.name;
            selectCategorieFormAddPhoto.appendChild(optionForm);
        });
    } catch (error) {
        console.error("Une erreur est survenue lors de la récupération des catégories", error);
    }
}
CategoriesSelect();

// Check si le form est correct (changement couleur bouton ajout)
const formUploadPhoto = document.getElementById("container-photo");
const btnFormAddPhoto = document.getElementById("btn-submit-form");

function checkForm() {
    // creation objet newWork pour la validation du formulaire
    const newWork = {
        imageUrl: document.querySelector("input[type=file]").value,
        title: document.querySelector("[name ='title']").value,
        categoryId: document.querySelector("select[name='categorie']").value,
    };

    // check si tous les champs sont remplis
    if (newWork.imageUrl && newWork.title && newWork.categoryId) {
        // si oui
        btnFormAddPhoto.id = "valider-form";
    } else {
        // si non id d'origine
        btnFormAddPhoto.id = "btn-submit-form";
    }
}

// écouter les event à chaque modif du form
formUploadPhoto.addEventListener("change" && "input", checkForm);
document.querySelector("[name ='title']").addEventListener("input", checkForm);
document.querySelector("select[name='categorie']").addEventListener("change", checkForm);


// Envoie des donnée du form sur l'API

btnFormAddPhoto.addEventListener("click", async function (e) {
    e.preventDefault();
    
    // Création de formData
    const formData = new FormData();
    formData.append("image", document.querySelector("input[type=file]").files[0]);
    formData.append("title", document.querySelector("[name ='title']").value);
    formData.append("category", document.querySelector("select[name='categorie']").value);

    try {
        // Appel de la fonction addWork pour envoyer les données à l'API
        const responseFormData = await addWork(formData);

        // Vérification de la réponse du serveur
        if (responseFormData.ok) {
            // Réponse OK, traitement des données
            const newWork = await responseFormData.json();

            // Ajout du nouveau travail à la liste et mise à jour de l'affichage
            works.push(newWork);
            const galleryModalContainer = document.querySelector(".gallery-modal");
            galleryModalContainer.innerHTML = "";
            displayWorksModal(works);

            // const portfolioGallery = document.querySelector(".gallery");
            // Fermeture des modales
            modalProjetPhoto.close();
            modalProjet.close();
            displayWorks(works);
            

        }
    } catch (error) {
        console.error("Une erreur est survenue lors de l'ajout du travail :", error);
    }
});
