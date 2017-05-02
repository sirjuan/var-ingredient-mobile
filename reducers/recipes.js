import { REQUEST_RECIPES, RECEIVE_RECIPES } from '../actions/ingredients'
import { SHOW_MODAL, HIDE_MODAL } from '../actions/modal'

export const recipeReducer = (state = {modalVisible:false, fetching: false, recipes: []}, action) => {
  switch (action.type) {
    case REQUEST_RECIPES:
      return {
        ...state,
        fetching: true,
      }
    case RECEIVE_RECIPES:
      return {
        ...state,
        fetching: false,
        recipes: action.recipes,
      }
    case SHOW_MODAL:
      return {
        ...state,
        modalRecipe: action.recipe,
        modalVisible:true,
      }
    case HIDE_MODAL:
      return {
        ...state,
        modalVisible: false,
      }
    default:
      return state
  }
}
