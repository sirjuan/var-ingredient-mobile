import { getHeaders } from './headers'
import axios from 'axios'

export const REQUEST_RECIPES = 'REQUEST_RECIPES'
export const RECEIVE_RECIPES = 'RECEIVE_RECIPES'
export const ALL_INGREDIENTS = 'ALL_INGREDIENTS'
export const INGREDIENTS_BY_CATEGORY = 'INGREDIENTS_BY_CATEGORY'
export const CATEGORIES = 'CATEGORIES'
export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY'
export const TOGGLE_SEARCH = 'TOGGLE_SEARCH'

const all = (ingredients) => ({
  type: ALL_INGREDIENTS,
  ingredients
})
const requestRecipes = () => ({
  type: REQUEST_RECIPES,
})
const receiveRecipes = (recipes) => ({
  type: RECEIVE_RECIPES,
  recipes
})
const getIngredientsByCategory = (ingredients, category) => ({
  type: INGREDIENTS_BY_CATEGORY,
  ingredients, category
})
const getCategories = (categories) => ({
  type: CATEGORIES,
  categories
})

export const toggleCategory = (category) => ({
  type: TOGGLE_CATEGORY,
  category
})

export const toggleSearch = () => ({
  type: TOGGLE_SEARCH
})

const host_url = 'https://var-ingredient.joehub.fi/api';

export const fetchCategories = () => (dispatch, getState) => {
  return fetch(`${host_url}/categories`)
    .then(response => response.json())
    .then(json => dispatch(getCategories(json.categories)))
    .catch(error => console.log(error.message))
}

export const fetchIngredientsByCategory = (category) => (dispatch, getState) => {
  return fetch(`${host_url}/category/${category._id}/ingredients`)
    .then(response => response.json())
    .then(json => dispatch(getIngredientsByCategory(json.ingredients, category.name)))
    .catch(error => console.log(error.message))
}

export const fetchIngredients = () => (dispatch, getState) => {
  return fetch(`${host_url}/ingredients`)
    .then(response => response.json())
    .then(json => dispatch(all(json.ingredients)))
    .catch(error => console.log(error.message))
}

export const fetchRecipes = () => (dispatch, getState) => {
  dispatch(requestRecipes())
  const { ingredients } = getState().session
  const nameList = []
  ingredients.length && ingredients.map(i => nameList.push(i.name))
  const searchString = nameList.join(',')
  const url = `${host_url}/recipe?ingredients=${searchString}`
  return axios(url)
    .then(response => dispatch(receiveRecipes(response.data.recipes)))
    .catch(error => console.log(error))
}
