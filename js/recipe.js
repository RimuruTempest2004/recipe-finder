// js/recipe.js
import { fetchRecipeDetails } from './api.js';

const contentEl = document.getElementById('recipe-detail-content');

/**
 * Renders the full recipe details onto the page.
 * @param {object} recipe - The detailed recipe object from the API.
 */
function displayRecipe(recipe) {
    // Clear the loader
    contentEl.innerHTML = '';

    const ingredientsHtml = recipe.extendedIngredients.map(ingredient => 
        `<li>${ingredient.original}</li>`
    ).join('');

    // Handle cases where analyzedInstructions might be empty
    const instructionsHtml = recipe.analyzedInstructions.length > 0
        ? recipe.analyzedInstructions[0].steps.map(step => `<li>${step.step}</li>`).join('')
        : '<li>No instructions available.</li>';

    const recipeHtml = `
        <div class="recipe-detail-container">
            <div class="recipe-hero">
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-hero__image">
                <h1 class="recipe-hero__title">${recipe.title}</h1>
                <div class="recipe-meta">
                    <span><i class="fa-regular fa-clock"></i> ${recipe.readyInMinutes} min</span>
                    <span><i class="fa-solid fa-users"></i> Serves ${recipe.servings}</span>
                </div>
            </div>

            <div class="recipe-section">
                <h2>Summary</h2>
                <p class="recipe-summary">${recipe.summary}</p>
            </div>

            <div class="recipe-section">
                <h2>Ingredients</h2>
                <ul class="ingredient-list">
                    ${ingredientsHtml}
                </ul>
            </div>

            <div class="recipe-section">
                <h2>Instructions</h2>
                <ol class="instruction-list">
                    ${instructionsHtml}
                </ol>
            </div>
        </div>
    `;

    contentEl.innerHTML = recipeHtml;
}

/**
 * Main function to load and display recipe details.
 */
async function loadRecipeDetails() {
    try {
        const recipeId = new URLSearchParams(window.location.search).get('id');
        if (!recipeId) {
            contentEl.innerHTML = '<p class="info-message">No recipe ID provided.</p>';
            return;
        }
        
        const recipe = await fetchRecipeDetails(recipeId);
        displayRecipe(recipe);

    } catch (error) {
        console.error(error);
        contentEl.innerHTML = '<p class="info-message">Could not load recipe details. Please try again later.</p>';
    }
}

// Initial load
loadRecipeDetails();