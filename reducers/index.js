import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { status, ingredientsByCategory } from './ingredients'
import { appNav, loginNav} from './nav'
import submit from './submit'
import session from './session'
import {recipeReducer} from './recipes'
import submitRecipe from './submit'

const rootReducer = combineReducers({
  appNav,
  loginNav,
  form,
  submit,
  status,
  recipeReducer,
  session,
  ingredientsByCategory,
})

export default rootReducer
