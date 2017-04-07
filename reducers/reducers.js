import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { ingredients, recipesByIngredients} from './ingredients'
import { postsByRecipe, searchRecipe, postsByPagination,} from './old'
import nav from './nav'
import submit from './submit'
import { wizardPage } from '../containers/WizardForm/WizardForm'

const submitRecipe = (state = {}, action) => {
  switch (action.type) {
    case TAKE_PICTURE:
    return {
      ...state,
      localImage: action.uri
    }
    case UPLOAD_PICTURE:
    return {
      ...state,
      databaseId: action.id
    }
    case RECEIVE_SUBMIT:
    return {
      ...state,
      isSubmiting: false,
      submitted: true
    }
    case REQUEST_SUBMIT:
      return {
        ...state,
        isSubmiting: true
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByRecipe,
  searchRecipe,
  postsByPagination,
  nav,
  form,
  submit,
  ingredients,
  recipesByIngredients,
  wizardPage
})

export default rootReducer
