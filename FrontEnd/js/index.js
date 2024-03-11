// Récuperer travaux 
async function getWorks() {
    try {
        const responseWorks = await fetch("http://localhost:5678/api/works")
        .then(responseWorks => responseWorks.json());
        console.log(responseWorks);
        
    } catch (error) {
        console.error("Une erreur est survenue", error);
        
    }

}
getWorks();