// js/ui.js
const grid = document.getElementById('recipeGrid');

/**
 * Creates a recipe card DOM element.
 * @param {object} recipe - The recipe data from the API.
 * @returns {HTMLElement} - The recipe card element.
 */
function createRecipeCard(recipe) {
    const card = document.createElement('a');
    card.className = 'recipe-card';
    card.href = `recipe.html?id=${recipe.id}`;
    card.target = '_self';

    const image = document.createElement('img');
    image.className = 'recipe-card__image';
    image.src = recipe.image;
    image.alt = recipe.title;
    image.loading = 'lazy'; // Lazy load images

    const body = document.createElement('div');
    body.className = 'recipe-card__body';

    const title = document.createElement('h3');
    title.className = 'recipe-card__title';
    title.textContent = recipe.title;

    const details = document.createElement('div');
    details.className = 'recipe-card__details';
    
    const readyIn = document.createElement('span');
    readyIn.innerHTML = `<i class="fa-regular fa-clock"></i> ${recipe.readyInMinutes} min`;
    
    details.appendChild(readyIn);
    
    body.append(title, details);
    card.append(image, body);

    return card;
}

/**
 * Creates a skeleton loader card.
 * @returns {HTMLElement}
 */
function createSkeletonCard() {
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton';
    skeleton.innerHTML = `
        <div class="recipe-card__image shimmer"></div>
        <div class="recipe-card__body">
            <div class="line line-1 shimmer"></div>
            <div class="line line-2 shimmer"></div>
            <div class="line line-3 shimmer"></div>
        </div>
    `;
    return skeleton;
}

export function renderRecipes(recipes) {
    grid.innerHTML = ''; // Clear previous content
    if (recipes.length === 0) {
        showMessage('No recipes found. Try a different search!');
        return;
    }
    recipes.forEach(recipe => {
        const card = createRecipeCard(recipe);
        grid.appendChild(card);
    });
}

export function showLoadingState() {
    grid.innerHTML = ''; // Clear previous content
    for (let i = 0; i < 12; i++) {
        grid.appendChild(createSkeletonCard());
    }
}

export function showMessage(message) {
    grid.innerHTML = `<p class="info-message">${message}</p>`;
}