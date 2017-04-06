import React from 'react';
import Expo from 'expo';
import AppWithNavigationState from './containers/Navigation';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers/reducers'

const middleware = [ thunk ]

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore( reducer, applyMiddleware(...middleware) )

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { isReady: false, };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      });
    this.setState({isReady: true});
  }
  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Provider store={store}>
          <AppWithNavigationState />
      </Provider>
    );
  }
}
