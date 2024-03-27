const gallery = document.querySelector(".gallery")
const filter = document.querySelector(".filters")

// Récuperer les travaux 
async function getWorks() {
    try {
        const responseWorks = await fetch("http://localhost:5678/api/works")
        .then(responseWorks => responseWorks.json());
        return await responseWorks;

    } catch (error) {
        console.error("Une erreur est survenue pendant la récupération des travaux", error);

    }
}

async function createWorks(work) {
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    const figcaption = document.createElement("figcaption")
    img.src = work.imageUrl;
    figcaption.textContent = work.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
}


// Afficher les travaux
async function displayWorks() {
    const arrayWorks = await getWorks()
    arrayWorks.forEach(work => {
        createWorks(work);
    });
}
displayWorks();

// ----- Récupérer et afficher les categories -----
async function displayCategories() {
    try {
        const responseCategories = await fetch("http://localhost:5678/api/categories")
        .then(responseCategories => responseCategories.json());
        
        responseCategories.forEach(category => {
            const btn = document.createElement("button");
            btn.textContent = category.name;
            btn.id = category.id;
            btn.classList.add("filter-btn");
            filter.appendChild(btn);
        })
        
    } catch (error) {
        console.error("Une erreur est survenue pendant la récupération des catégories", error);
    }
}
displayCategories();

// ----- Filtrer les btn par catégories -----
async function filterCategories() {
    // Permet d'attendre que les travaux soient affichés
    const filterWorks = await getWorks();

    const filterBtn = document.querySelectorAll(".filter-btn");
    filterBtn.forEach((button) => {
        button.addEventListener("click", (e) => {
            let btnId = e.target.id;
            // console.log(btnId);
            gallery.innerHTML = "";
            if (btnId !== "0") {
                const checkFilterWorks = filterWorks.filter((work) => {
                    return work.categoryId == btnId;
                });
                console.log(checkFilterWorks);
                checkFilterWorks.forEach(work => {
                    createWorks(work);
                });

            }else{
                displayWorks();
            }
        });
    });
}
filterCategories();

// test mode edition

// Affichage
const token = sessionStorage.getItem("Token");
console.log(token)

if (token){
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
        sessionStorage.removeItem("Token");
    });
};