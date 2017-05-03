import   React from 'react'
import { View } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { userSignup } from '../../actions/session'
import { connect } from 'react-redux'
import { Button, Footer, FooterTab, Spinner } from 'native-base'
import { renderInput } from './formRenderers'
import { MyText, H1, H2} from '../../components/text'
import { DarkContainer, MyContent} from '../../components/nativebase-hacks'
import validate from './validate'

const SignUpPage = props => {

  const { handleSubmit, signingUp, signedUp, dispatch } = props

  const signUp = () => (dispatch(userSignup()))

  return (
    <DarkContainer>
      <MyContent>
      { signedUp
        ? <H1>Thank you for signing up!</H1>
        : <View><H1 style={{alignSelf: 'center',}}>Sign Up</H1>
          <Field name="email" type='email' label="E-Mail" component={renderInput} />
          <Field name="password" secureTextEntry={true} type="password" label="Password" component={renderInput} /></View>
       }
       </MyContent>
      <Footer>
        <FooterTab>
          { signingUp ? <Button disabled><MyText>Signing up... </MyText><Spinner /></Button>
                      : <Button success onPress={handleSubmit(signUp)}><H2>SIGN UP</H2></Button> }
        </FooterTab>
      </Footer>
    </DarkContainer>
    );
}

const mapStateToProps = state => {
  const { signingUp, signedUp } = state.session
  return { signingUp, signedUp }
}

const SignUpPageDecorated = reduxForm({ form: 'login', validate })(SignUpPage)

export default connect(mapStateToProps)(SignUpPageDecorated)
