import { ALL_INGREDIENTS, CATEGORIES, INGREDIENTS_BY_CATEGORY, TOGGLE_CATEGORY, TOGGLE_SEARCH }
from '../actions/ingredients'

export const status = (state = { all: [], categories: [], ingredients: []}, action) => {
  switch (action.type) {
    case ALL_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
      }
    case CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      }
    default:
      return state
  }
}

export const ingredientsByCategory= (state = { open: false }, action) => {
  switch (action.type) {
    case INGREDIENTS_BY_CATEGORY:
      return {
        ...state,
        [action.category]: ingredients(state[action.category], action)
      }
    case TOGGLE_CATEGORY:
      return {
        ...state,
        [action.category]: ingredients(state[action.category], action)
      }
    case TOGGLE_SEARCH:
      return {
        ...state, open: !state.open
      }
    default:
      return state
  }
}

const ingredients = (state = { open: false }, action) => {
  switch (action.type) {
    case INGREDIENTS_BY_CATEGORY:
      return {
        ...state,
        items: action.ingredients
      }
    case TOGGLE_CATEGORY:
      return {
        ...state,
        open: !state.open
      }
    default:
      return state
  }
}
