import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import { View } from 'react-native'
import renderField from './renderField'
import { Button, Input, Form, Item, Container, Content, Label, Header, Icon, Text, Grid, Col, IconRight, ListItem, H1, H2, H3, Spinner, Picker, Footer, FooterTab, Right, CheckBox
 } from 'native-base'
const colors = [ 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet' ]

const WizardFormThirdPage = (props) => {
  console.log(props)
  const { handleSubmit, pristine, previousPage, submitting, onSubmit, ingredients } = props
  console.log(ingredients)






  const renderIngredientList = ({ input, label, meta: { touched, error }, children, ...custom }) => (
<View>
      <Picker style ={{color: 'white'}} {...input} selectedValue={input.value} onValueChange={(value, index) => input.onChange(value)} children={children} {...custom} >


          {ingredients.map((ingredient) => ( <Item key={ingredient.name} label={ingredient.name} value={ingredient._id} /> ) )}
        </Picker>


        {touched && error && <Text>{error}</Text>}
      </View>
  )
  return (
    <Container style={{backgroundColor: 'rgba(30,30,30,1)',}}>
      <Content style={{padding: 16}}>
        <Text style={{color: 'white'}}>Favorite Color</Text>
        <Field name="ingredient.name" mode="dropdown" component={renderIngredientList}/>
        <Field name="ingredient.quantity" type="text" component={renderField} label="Quantity"/>
        <ListItem>
          <CheckBox checked={false} />
          <Text>Discussion with Client</Text>
        </ListItem>



    </Content>
    <Footer>
      <FooterTab>
        <Button danger onPress={previousPage}><Text style={{color: 'white', fontSize: 20}}>Previous</Text></Button>
      </FooterTab>
      <FooterTab>
        <Button success onPress={onSubmit} ><Text style={{color: 'white', fontSize: 20}}>Next</Text></Button>
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
})(WizardFormThirdPage)
