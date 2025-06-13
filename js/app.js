// js/app.js
import { fetchRecipes } from './api.js';
import { renderRecipes, showLoadingState, showMessage } from './ui.js';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const cuisineFilter = document.getElementById('cuisineFilter');
const dietFilter = document.getElementById('dietFilter');

let searchTimeout;

/**
 * Debounce function to limit how often a function is called.
 * @param {function} func - The function to debounce.
 * @param {number} delay - The delay in milliseconds.
 */
function debounce(func, delay = 500) {
    return function(...args) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

/**
 * Main function to handle searching and rendering recipes.
 */
async function handleSearch() {
    showLoadingState();

    const searchParams = {
        query: searchInput.value,
        cuisine: cuisineFilter.value,
        diet: dietFilter.value,
    };

    try {
        const recipes = await fetchRecipes(searchParams);
        renderRecipes(recipes);
    } catch (error) {
        console.error(error);
        showMessage('Could not fetch recipes. Please check your connection or API key.');
    }
}

// Event Listeners
searchInput.addEventListener('input', debounce(handleSearch));
cuisineFilter.addEventListener('change', handleSearch);
dietFilter.addEventListener('change', handleSearch);

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    handleSearch(); // Load initial set of recipes
});