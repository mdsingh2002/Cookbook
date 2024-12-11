//javascript file
const recipeNameInput = document.querySelector("#recipe-name");
const recipeIngredientsInput = document.querySelector("#recipe-ingredients");
const recipeInstructionsInput = document.querySelector("#recipe-instructions");
const addRecipeButton = document.querySelector("#add-recipe");
const recipesContainer = document.querySelector("#recipes");

const loadRecipes = function () {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipes.forEach(function (recipe, index) {
    const recipeHTML = `
      <div class="recipe-box">
        <h2>${recipe.name}</h2>
        <h3>Ingredients:</h3>
        <p>${recipe.ingredients}</p>
        <h3>Instructions:</h3>
        <p>${recipe.instructions}</p>
        <button class="delete-recipe-button">Delete</button>
      </div>
    `;
    recipesContainer.innerHTML += recipeHTML;
    const deleteButton = recipesContainer.querySelector(
      ".delete-recipe-button:last-child"
    );
    deleteButton.addEventListener("click", function () {
      deleteRecipe(index);
    });
  });
};

const saveRecipe = function (recipe) {
  let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipes.push(recipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));
};

const deleteRecipe = function (index) {
  let recipes = JSON.parse(localStorage.getItem("recipes"));
  recipes.splice(index, 1);
  localStorage.setItem("recipes", JSON.stringify(recipes));
  loadRecipes();
};

addRecipeButton.addEventListener("click", function () {
  const recipeName = recipeNameInput.value;
  const recipeIngredients = recipeIngredientsInput.value;
  const recipeInstructions = recipeInstructionsInput.value;
  const recipe = {
    name: recipeName,
    ingredients: recipeIngredients,
    instructions: recipeInstructions,
  };
  saveRecipe(recipe);
  loadRecipes();
  recipeNameInput.value = "";
  recipeIngredientsInput.value = "";
  recipeInstructionsInput.value = "";
});

recipesContainer.addEventListener("click", function (event) {
  if (event.target.className === "delete-recipe-button") {
    const recipeBox = event.target.parentElement;
    recipeBox.remove();
  }
});

loadRecipes();
