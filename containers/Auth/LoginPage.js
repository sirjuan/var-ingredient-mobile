import   React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Text, View } from 'react-native';
import Expo from 'expo'
import { userLogin, userLogout, fLogin } from '../../actions/session'
import { connect } from 'react-redux'
import { Button, Footer, FooterTab, Spinner, Icon } from 'native-base'
import { renderInput } from './formRenderers'
import { MyText, H1, H2} from '../../components/text'
import { DarkContainer, MyContent} from '../../components/nativebase-hacks'
import validate from './validate'

const LoginPage = props => {
  const { handleSubmit, failed, isLogging, dispatch, token } = props

  const login = () => dispatch(userLogin())
  const logout = () => dispatch(userLogout())

  const faceLogin = async () => {
    const appId = '272929786484880'
    const options = { permissions: ['public_profile'], behavior: 'native' }
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(appId,options);
    if (type === 'success') {
      fetch(`https://graph.facebook.com/me?access_token=${token}`)
        .then(response => response.json())
        .then(json => dispatch(fLogin(json.id)))
    }
  }

  return (
    <DarkContainer>
      <MyContent>
        {!token &&
        <View>
          <H1 style={{alignSelf: 'center',}}>Log In</H1>
          { failed && <Text style={{fontSize:16, alignSelf: 'center',color: '#d9534f'}}>Incorrect E-mail or password.</Text> }
          <Field name="email" type='email' label="E-Mail" component={renderInput}  />
          <Field name="password"  secureTextEntry={true} type="password" label="Password" component={renderInput} />
        </View> }
      </MyContent>
      <Footer>
        <FooterTab>
          { !token && (isLogging
            ? <Button disabled><MyText>Logging in... </MyText><Spinner /></Button>
            : <Button success onPress={handleSubmit(login)}><H2>LOGIN</H2></Button> )}
          { token && <Button success onPress={logout}><H2>LOGOUT</H2></Button>}
        </FooterTab>
        {!token && !isLogging &&
        <FooterTab>
          <Button onPress={faceLogin} iconLeft><H2><Icon name='logo-facebook' />  LOGIN</H2></Button>
        </FooterTab> }
      </Footer>
    </DarkContainer>
  );
}

const mapStateToProps = state => {
  const { failed, isLogging, token } = state.session
  return { failed, isLogging, token }
}

const LoginPageDecorated = reduxForm({ form: 'login', validate })(LoginPage);
export default connect(mapStateToProps)(LoginPageDecorated);
