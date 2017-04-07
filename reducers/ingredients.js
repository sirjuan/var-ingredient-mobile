import {
  FOUND_INGREDIENTS,
  CHANGE_INPUT,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  CLEAR_INPUT,
  REQUEST_RECIPES,
  RECEIVE_RECIPES,
  ALL_INGREDIENTS
} from '../actions/ingredients'

export const ingredients = (state = {
  list: [],
  found: [],
  input: '',
  all: []
}, action) => {
  switch (action.type) {
    case CLEAR_INPUT:
      return {
        ...state,
        input: ''
      }
    case ADD_INGREDIENT:
      return {
        ...state,
        list: state.list.concat(action.ingredient)
      }
    case REMOVE_INGREDIENT:
      return {
        ...state,
        list: state.list.filter(ingredient => (ingredient !== action.ingredient))
      }
    case FOUND_INGREDIENTS:
      return {
        ...state,
        found: action.ingredients,
      }
    case ALL_INGREDIENTS:
      return {
        ...state,
        all: action.ingredients,
      }
    case CHANGE_INPUT:
      return {
        ...state,
        input: action.input,
      }
    default:
      return state
  }
}
const recipes = (state = {
  isFetching: false,
  items: [],
}, action) => {
  switch (action.type) {
    case REQUEST_RECIPES:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_RECIPES:
      return {
        ...state,
        isFetching: false,
        items: action.recipes.recipes,
      }
    default:
      return state
  }
}
export const recipesByIngredients = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_RECIPES:
    case REQUEST_RECIPES:
      return {
        ...state,
        [action.ingredientList]: recipes(state[action.ingredientList], action)
      }
    default:
      return state
  }
}
