const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeClosBtn = document.querySelector('.recipe-close-Btn');
// function fetch recipes
const fetchRecipes = async (query) =>
{ 
    recipeContainer.innerHTML = "fetching recipe...";
    try {
        
    
    const data =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response =await data.json();
 
    // empty recipeContainer
    recipeContainer.innerHTML="";
    response.meals.forEach(meal => {
       const recipeDiv = document.createElement('div');
       recipeDiv.classList.add('recipe');
       recipeDiv.innerHTML = `
       <img src="${meal.strMealThumb}">
       <h3> ${meal.strMeal}</h3>
       <p><span>${meal.strArea}</span> Dish</p>
       <p>Belongs to <span>${meal.strCategory}</span> Category</p>
       
       `
       const button = document.createElement('button');
       button.textContent = 'view Recipe';
       recipeDiv.appendChild(button);

    //    adding eventListener to recipe button
    button.addEventListener('click', () =>
    {
       openrecipePopup(meal)
    });

       recipeContainer.appendChild(recipeDiv);
    });
    }
    catch (error) {
         recipeContainer.innerHTML = `<h2>error in faching recipe...</h2>`
    }
}
// function to fetch ingredients and measurements
const fetchIngredients = (meal) =>
{
   let ingredientsList = "";
   for(let i = 1 ;i<=20;i++)
   {
      const ingredient = meal[`strIngredient${i}`];
      if(ingredient)
      {
        const measure = meal[`strMeasure${i}`];
        ingredientsList += `<li>${measure} ${ingredient}</li>`
      }
      else{
        break;
      }
   }
   return ingredientsList;
}
const openrecipePopup = (meal) =>
{
  recipeDetailsContent.innerHTML = `
  <h2 class="recipeName"> ${meal.strMeal} </h2>
  <h3> Ingredents: </h3>
  <ul class = "IngrediantList"> ${fetchIngredients(meal)} </ul>
  <div class="recipeInstructions"> 
       <h3> Instructions :</h3>
       <p > ${meal.strInstructions} </p>
  </div>

  `
  recipeDetailsContent.parentElement.style.display = "block";
}


recipeClosBtn.addEventListener("click", () => {
    recipeDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener("click", (e) =>
{
    //  | this will stop the auto submit
    e.preventDefault();

    const searchInput = searchBox.value.trim();
    if(!searchInput)
    {
        recipeContainer.innerHTML = `<h2>type the meal in the search box.</h2>`
    }
    fetchRecipes(searchInput);
})
