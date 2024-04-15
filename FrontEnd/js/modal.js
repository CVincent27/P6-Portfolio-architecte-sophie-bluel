import { getWorks, deleteWork, getCategories } from './service.js';

//pour affichage message erreur
let spanElement = document.createElement("span");
spanElement.innerText = "";
spanElement.className = "";

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
const newImage = document.querySelector("#myfile");
var uploadedImage = "";

newImage.addEventListener("change", function () {
    spanElement.className = "";
    spanElement.innerText = "";
    const reader = new FileReader();
    const type = document.getElementById("myfile").files[0].type;
    if (type !== "image/png" && type !== "image/jpeg" && type !== "image/jpg") {
        // Affichage d'une erreur si le type de fichier n'est pas pris en charge
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
            const formAddPhotoDiv = document.querySelector(".form-add-photo");

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

