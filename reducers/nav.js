import { AppNavigator } from '../containers/Navigation'

const nav = (state = '', action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
}

export default nav
