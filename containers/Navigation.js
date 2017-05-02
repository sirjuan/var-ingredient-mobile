import React from 'react'
import { AsyncStorage } from 'react-native'
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation';
import { connect } from 'react-redux'
import SubmitRecipe from '../containers/SubmitRecipe'
import Ingredients from '../containers/Ingredients'
import SignUpPage from '../containers/Auth/SignUpPage'
import LoginPage from '../containers/Auth/LoginPage'
import { startUp } from '../actions/session'
import { DarkContainer } from '../components/nativebase-hacks'

const options = {
  header: {
    visible: false,
  },
    tabBarOptions: {
      style: {
        marginTop: 0,
        paddingTop: 20,
        backgroundColor: 'rgba(0,0,0,0.9)',
      },
  },
}

export const SimpleApp = TabNavigator({
    Search: {screen: Ingredients},
    Submit: { screen: SubmitRecipe },
    Login: { screen: LoginPage },
  }, options
);

export const LoginNavigator = TabNavigator({
    Login: {screen: LoginPage},
    Signup: { screen: SignUpPage },
  }, options
);

class AppWithNavigationState extends React.Component {

  async componentWillMount() {

      try {
        const credentials = await AsyncStorage.getItem('credentials');
        console.log(credentials)
        if (credentials !== null){
          this.props.dispatch(startUp(JSON.parse(credentials)))
        }
      } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
      }
  }

  render() {
    return (
    <DarkContainer>
      {  this.props.token && <SimpleApp navigation={addNavigationHelpers({ dispatch: this.props.dispatch, state: this.props.appNav, })} />  }
      { !this.props.token &&
        <LoginNavigator navigation={addNavigationHelpers({
              dispatch: this.props.dispatch,
              state: this.props.loginNav,
            })}
          />
      }
    </DarkContainer>
    );
  }
}

const mapStateToProps = state => {
  const { appNav, loginNav, session } = state
  const { token } = session
  return { appNav, loginNav, token}
}

export default connect(mapStateToProps)(AppWithNavigationState)
