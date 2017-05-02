import { LOG_IN, LOG_OUT, LOGGING, LOGIN_FAIL, ADD_INGREDIENT, REMOVE_INGREDIENT } from '../actions/session'

const session = (state = {token: null, ingredients: []}, action) => {
  switch (action.type) {
    case LOGGING:
    return {
      ...state,
      isLogging: true,
    }
    case LOG_IN:
    return {
      ...state,
      isLogging: false,
      failed: false,
      ...action.user
    }
    case LOG_OUT:
    return {
      ...state,
      token: null,
    }
    case LOGIN_FAIL:
    return {
      ...state,
      isLogging: false,
      failed: true,
    }
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.concat([action.ingredient]),
      }
    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(ingredient => (ingredient._id !== action.ingredient._id))
      }
    default:
      return state
  }
}
export default session
