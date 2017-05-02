
import { LoginNavigator, SimpleApp } from '../containers/Navigation'

export const appNav = (state = '', action) =>  SimpleApp.router.getStateForAction(action, state)

export const loginNav = (state = '', action) => {
  const newState = LoginNavigator.router.getStateForAction(action, state);
  return newState || state;
}
