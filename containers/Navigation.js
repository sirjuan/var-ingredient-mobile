import React from 'react'
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation';
import { connect } from 'react-redux'
import Home from '../containers/Home'
import AllRecipes from '../containers/AllRecipes'
import SubmitRecipe from '../containers/SubmitRecipe'
import Ingredients from '../containers/Ingredients'
import WizardForm from '../containers/WizardForm/WizardForm'

export const AppNavigator = TabNavigator({
    Search: {screen: Ingredients},
    All: { screen: WizardForm },
    Submit: { screen: SubmitRecipe },
    Home: { screen: Home },
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: 20,
        backgroundColor: 'rgba(0,0,0,0.9)',
      },
  },
});

class AppWithNavigationState extends React.Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
              dispatch: this.props.dispatch,
              state: this.props.nav,
            })} />
    );
  }
}

const mapStateToProps = state => {
  const { nav } = state
  return { nav }
}

export default connect(mapStateToProps)(AppWithNavigationState)
