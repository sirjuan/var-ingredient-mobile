export const FOUND_INGREDIENTS = 'FOUND_INGREDIENTS'
export const CHANGE_INPUT = 'CHANGE_INPUT'
export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'
export const CLEAR_INPUT = 'CLEAR_INPUT'
export const REQUEST_RECIPES = 'REQUEST_RECIPES'
export const RECEIVE_RECIPES = 'RECEIVE_RECIPES'

export const addIngredient = ingredient => ({
  type: ADD_INGREDIENT,
  ingredient
})
export const removeIngredient = ingredient => ({
  type: REMOVE_INGREDIENT,
  ingredient
})
const find = (ingredients, input) => ({
  type: FOUND_INGREDIENTS,
  ingredients, input
})
const changeInput = input => ({
  type: CHANGE_INPUT,
  input
})
export const clearInput = () => ({
  type: CLEAR_INPUT
})
const requestRecipes = (ingredientList) => ({
  type: REQUEST_RECIPES,
  ingredientList
})
const receiveRecipes = (ingredientList, recipes) => ({
  type: RECEIVE_RECIPES,
  ingredientList, recipes
})
export const searchIngredient = input => dispatch => {
  dispatch(changeInput(input))
  return fetch(`https://var-ingredient.joehub.fi/api/ingredients?ingredient=${input}`)
    .then(response => response.json())
    .then(json => dispatch(find(json.ingredients)))
    .catch(error => console.log(error))
}
const fetchRecipes = () => (dispatch, getState) => {
  dispatch(requestRecipes())
  const ingredientList = getState().ingredients.list
  const searchString = ingredientList.join(',')
  console.log(searchString)
  return fetch(`https://var-ingredient.joehub.fi/api/recipe?ingredients=${searchString}`)
    .then(response => response.json())
    .then(json => dispatch(receiveRecipes(ingredientList, json)))
    .catch(error => console.log(error))
}
const shouldFetchRecipes = () => (dispatch, getState) => {
  const state = getState()
  const recipes = state.recipesByIngredients[state.ingredients.list]
  return !recipes || !recipes.isFetching
}

export const fetchRecipesIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchRecipes()) {
    return dispatch(fetchRecipes())
  }
}
