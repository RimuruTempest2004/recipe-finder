// js/api.js
import { API_KEY } from './config.js';

const BASE_URL = 'https://api.spoonacular.com';

export async function fetchRecipes({ query, diet, cuisine }) {
    // Construct the query parameters
    const params = new URLSearchParams({
        apiKey: API_KEY,
        number: 12, // Number of results
        addRecipeInformation: true,
    });

    if (query) params.append('query', query);
    if (diet) params.append('diet', diet);
    if (cuisine) params.append('cuisine', cuisine);

    const url = `${BASE_URL}/recipes/complexSearch?${params.toString()}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Failed to fetch recipes:", error);
        throw error; // Re-throw the error to be caught by the caller
    }
}// In js/api.js

export async function fetchRecipeDetails(id) {
    const url = `${BASE_URL}/recipes/${id}/information?apiKey=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch recipe details for ID ${id}:`, error);
        throw error;
    }
}