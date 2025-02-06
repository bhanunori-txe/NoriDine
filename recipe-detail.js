async function fetchRecipeDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const mealId = urlParams.get('id');

    if (!mealId) return;

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await response.json();
    const recipe = data.meals[0];

    displayRecipeDetail(recipe);
}

function displayRecipeDetail(recipe) {
    const recipeDetailDiv = document.getElementById('recipe-detail');

    recipeDetailDiv.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${recipe.strMealThumb}" class="img-fluid" alt="${recipe.strMeal}">
            </div>
            <div class="col-md-6">
                <h2>${recipe.strMeal}</h2>
                <h4>Ingredients</h4>
                <ul>
                    ${generateIngredientsList(recipe)}
                </ul>
                <h4>Instructions</h4>
                <p>${recipe.strInstructions}</p>
            </div>
        </div>
    `;
}

function generateIngredientsList(recipe) {
    let ingredientsList = '';

    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient) {
            ingredientsList += `<li>${ingredient} - ${measure}</li>`;
        }
    }

    return ingredientsList;
}

fetchRecipeDetail();
