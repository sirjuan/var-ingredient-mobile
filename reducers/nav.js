
import { LoginNavigator, SimpleApp } from '../containers/Navigation'

export const appNav = (state = '', action) =>  SimpleApp.router.getStateForAction(action, state)

export const loginNav = (state = '', action) => LoginNavigator.router.getStateForAction(action, state)
