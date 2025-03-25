// Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Mettre à jour l'année dans le footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Fonction pour charger et afficher les films
async function loadFilms() {
    const filmsContainer = document.getElementById('films-container');

    try {
        // Appel à l'API pour récupérer les films
        const response = await fetch(`${API_BASE_URL}/films`);

        // Si la réponse n'est pas OK, lancer une erreur
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        // Convertir la réponse en JSON
        const data = await response.json();

        // Vérifier si des films sont disponibles
        if (data.status === 'success' && data.data && data.data.length > 0) {
            // Parcourir les films et les afficher
            data.data.forEach(film => {
                const filmCard = document.createElement('div');
                filmCard.className = 'col-md-4 mb-4';
                filmCard.innerHTML = `
                    <div class="card h-100">
                        <img src="${film.affiche}" class="card-img-top" alt="${film.titre}">
                        <div class="card-body">
                            <h5 class="card-title">${film.titre}</h5>
                            <p class="card-text"><strong>Genre:</strong> ${film.genre_nom}</p>
                            <p class="card-text"><strong>Réalisateur:</strong> ${film.realisateur}</p>
                            <a href="details.html?id=${film.id}" class="btn btn-primary">Voir détails</a>
                        </div>
                    </div>
                `;
                filmsContainer.appendChild(filmCard);
            });
        } else {
            // Aucun film disponible
            filmsContainer.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-info" role="alert">
                        Aucun film disponible pour le moment.
                    </div>
                </div>
            `;
        }
    } catch (error) {
        // Afficher une erreur en cas de problème
        console.error('Erreur lors du chargement des films:', error);
        filmsContainer.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-danger" role="alert">
                    Erreur: Impossible de se connecter à l'API.
                </div>
            </div>
        `;
    }
}

// Charger les films au chargement de la page
document.addEventListener('DOMContentLoaded', loadFilms);
async function afficherGenre() {
    const genreForm = document.getElementById('genre'); // Menu déroulant (select)
    try {
        // Appel à l'API pour récupérer les genres
        const response = await fetch(`http://localhost:3000/api/genres`);

        // Vérifier si la réponse est OK
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        // Convertir la réponse en JSON
        const data = await response.json();

        // Vérifier si des genres sont disponibles
        if (data.status === 'success' && data.data && data.data.length > 0) {
            // Parcourir les genres et les ajouter au menu déroulant
            data.data.forEach(genre => {
                const optionElement = document.createElement('option');
                optionElement.value = genre.id; // Utilisez l'ID du genre comme valeur
                optionElement.textContent = genre.nom; // Texte affiché dans le menu
                genreForm.appendChild(optionElement);
            });
        } else {
            // Aucun genre disponible
            genreForm.innerHTML = `
                <option disabled selected>Aucun genre disponible</option>
            `;
        }
    } catch (error) {
        // Gérer les erreurs en cas de problème
        console.error('Erreur lors du chargement des genres :', error);
        genreForm.innerHTML = `
            <option disabled selected>Erreur : Impossible de récupérer les genres</option>
        `;
    }
}

document.addEventListener('DOMContentLoaded',afficherGenre)

const form = document.getElementById('registrationForm');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
        username: form.username.value,
        email: form.email.value,
        password: form.password.value,
    };

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.text();
        alert(result); // Affiche un message en fonction de la réponse du serveur
    } catch (error) {
        console.error('Erreur lors de l’envoi :', error);
    }
});
