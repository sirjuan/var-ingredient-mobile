import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'

import { Button, Input, Form, Item, Container, Content, Label, Header, Icon, Text, Grid, Col, IconRight, ListItem, H1, H2, H3, Spinner, Picker, Footer, FooterTab, Right
 } from 'native-base'

const WizardFormFirstPage = (props) => {
  const { handleSubmit, nextPage } = props
  return (
    <Container style={{backgroundColor: 'rgba(30,30,30,1)',}}>
      <Content style={{padding: 16}}>
      <Field name="firstName" type="text" component={renderField} label="First Name"/>
      <Field name="lastName" type="text" component={renderField} label="Last Name"/>

    </Content>
    <Footer>
      <FooterTab>
        <Button style={{backgroundColor: 'rgba(30,30,30,1)',}}></Button>
      </FooterTab>
      <FooterTab>
        <Button success onPress={nextPage} ><Text style={{color: 'white', fontSize: 20}}>Next</Text></Button>
      </FooterTab>
    </Footer>
  </Container>
  )
}

export default reduxForm({
  form: 'wizard',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
  validate
})(WizardFormFirstPage)
