import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import { Button, Input, Form, Item, Container, Content, Label, Header, Icon, Text, Grid, Col, IconRight, ListItem, H1, H2, H3, Spinner, Picker, Footer, FooterTab, Right, Radio
 } from 'native-base'

const WizardFormSecondPage = (props) => {
  const { handleSubmit, previousPage, nextPage } = props

  return (
    <Container style={{backgroundColor: 'rgba(30,30,30,1)',}}>
      <Content style={{padding: 16}}>
      <Field name="email" type="email" component={renderField} label="Email"/>
      <Text>Sex</Text>
        <Button onPress={previousPage}><Text>Previous</Text></Button>
        <Button><Text>Next</Text></Button>
    </Content>
    <Footer>
      <FooterTab>
        <Button danger onPress={previousPage}><Text style={{color: 'white', fontSize: 20}}>Previous</Text></Button>
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
})(WizardFormSecondPage)

const renderRadio = (props) => {
  return (
    <ListItem>
      <Radio selected={false} />
      <Text>{props.label}</Text>
    </ListItem>
  )
}
