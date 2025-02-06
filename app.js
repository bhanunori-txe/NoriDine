// Base API URL for fetching recipes
const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// Fetch recipes based on user input
async function fetchRecipes(query) {
    try {
        const response = await fetch(apiUrl + query);
        const data = await response.json();
        
        if (data.meals) {
            displayRecipes(data.meals);
        } else {
            document.getElementById('recipe-results').innerHTML = '<p>No recipes found.</p>';
        }
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

// Display the recipe results in the page
function displayRecipes(recipes) {
    const resultsContainer = document.getElementById('recipe-results');
    resultsContainer.innerHTML = ''; // Clear previous results
    
    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('col-md-4');
        recipeElement.classList.add('recipe-card');
        
        recipeElement.innerHTML = `
            <div class="card">
                <img src="${recipe.strMealThumb}" class="card-img-top" alt="${recipe.strMeal}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.strMeal}</h5>
                    <p class="card-text">Click to view recipe</p>
                    <button class="btn btn-primary" onclick="viewRecipe(${recipe.idMeal})">View Recipe</button>
                </div>
            </div>
        `;

        resultsContainer.appendChild(recipeElement);
    });
}

// View Recipe Details
function viewRecipe(id) {
    // Show recipe details
    window.location.href = `recipe.html?id=${id}`;
}

// Search for recipes when the user types in the search bar
document.getElementById('search-input').addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query.length > 2) {
        fetchRecipes(query);
    } else {
        document.getElementById('recipe-results').innerHTML = '';
    }
});


// Function to load saved recipes from localStorage
function loadRecipes() {
    const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const recipeList = document.getElementById("recipe-cards");

    // Clear the current list before adding new ones
    recipeList.innerHTML = "";

    // Create and append recipe cards
    savedRecipes.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "my-3");

        card.innerHTML = `
            <div class="card recipe-card">
                <div class="card-body">
                    <h5 class="card-title">${recipe.name}</h5>
                    <p class="card-text">${recipe.description}</p>
                    <ul class="list-unstyled">
                        <li><strong>Ingredients:</strong> ${recipe.ingredients}</li>
                        <li><strong>Instructions:</strong> ${recipe.instructions}</li>
                    </ul>
                </div>
            </div>
        `;

        recipeList.appendChild(card);
    });
}

// Function to handle recipe form submission
document.getElementById("recipe-form").addEventListener("submit", function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("recipe-name").value;
    const description = document.getElementById("recipe-description").value;
    const ingredients = document.getElementById("recipe-ingredients").value;
    const instructions = document.getElementById("recipe-instructions").value;

    // Create recipe object
    const newRecipe = {
        name,
        description,
        ingredients,
        instructions
    };

    // Get existing recipes from localStorage
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    // Add new recipe to the list
    recipes.push(newRecipe);

    // Save updated recipes back to localStorage
    localStorage.setItem("recipes", JSON.stringify(recipes));

    // Clear the form inputs
    document.getElementById("recipe-form").reset();

    // Reload the recipe list
    loadRecipes();
});

// Load recipes when the page loads
window.onload = loadRecipes;
