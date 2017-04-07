import React from 'react'
import Expo from 'expo';
import { Field, FieldArray, reduxForm } from 'redux-form'
import styles from '../styles/styles';
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native';
import { sendSubmit, pictureTaken, uploadImage } from '../actions/submit'
import { connect } from 'react-redux'
import { Button, Input, Form, Item, Container, Content, Label, Header, Icon, Text, Grid, Col, IconRight, ListItem, H1, H2, H3, Spinner, Picker, Footer, FooterTab, Right
 } from 'native-base'
import CameraButtons from '../components/CameraButtons'


const SubmitRecipe = props => {
  const { handleSubmit, isSubmiting, submitted, dispatch, imageUri, allIngredients } = props
  console.log(allIngredients)
  takeImage = async () => {
    let result = await Expo.ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16,9]
    });
    if (!result.cancelled) {
      dispatch(pictureTaken(result.uri));
    }
  }
  pickImage = async () => {
    let result = await Expo.ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16,9]
    });
    if (!result.cancelled) {
      dispatch(pictureTaken(result.uri));
    }
  }
  submitImage = () => {
    dispatch(uploadImage(imageUri));
  }

  const onSubmit = (values, dispatch) => {
    dispatch(sendSubmit(values, imageUri));
  }
  const renderInput = ({ input, label, type, meta: { touched, error }, ...custom }) => (
    <Item floatingLabel style={{width: '100%'}}>
      <Label>{label}</Label>
      {console.log(input)}
      {console.log(type)}

      <Input style={{color: 'white'}}  type={type} onChangeText={(value) => input.onChange(value)} {...input}/>
    </Item>
  );

  const renderIngredients = ({ fields }) => (
    <View>
      {fields.map((ingredient, index) =>
      <View style={{marginTop: 16}} key={index}>
        <Grid style={{marginTop: 16}}>
            <Col>
              <Text style={{color: 'white'}}>Ingredient #{index + 1}</Text>
            </Col>
            <Col>
              <Button transparent danger small block iconRight onPress={() => fields.remove(index)}>
              <Text>Remove</Text>
            <Icon name='close' />
              </Button>
            </Col>
        </Grid>
        <Field label="Select ingredient" name={`${ingredient}.name`}  mode="dropdown" component={renderIngredientList}/>
        <Field
          name={`${ingredient}.quantity`}
          component={renderInput}
          label="Quantity"/>
        </View>
      )}
      <Button style={{marginTop: 16, marginBottom: 16}} success transparent block onPress={() => fields.push({})}>
        <Icon ios='ios-add' android="md-add" />
        <Text>Add ingredient</Text>
      </Button>
    </View>
  )
  const renderInstructions = ({ fields }) => (
    <View>
      {fields.map((instruction, index) =>
      <View style={{marginTop: 16}} key={index}>
        <Grid style={{marginTop: 16}}>
            <Col>
              <Text style={{color: 'white'}}></Text>
            </Col>
            <Col>
              <Button transparent danger small block iconRight onPress={() => fields.remove(index)}>
              <Text>Remove</Text>
            <Icon name='close' />
              </Button>
            </Col>
        </Grid>
        <Field
          name={`${instruction}.line`}
          type="text"
          component={renderInput}
          label="Instruction"/>
        </View>
      )}
      <Button style={{marginTop: 16, marginBottom: 16}} success transparent block onPress={() => fields.push({})}>
        <Icon ios='ios-add' android="md-add" />
        <Text>Add instruction</Text>
      </Button>
    </View>
  )
  const renderIngredientList = ({ input, label, meta: { touched, error }, children, ...custom }) => (
    <View>
      <Picker
        style ={{color: 'white'}}
        {...input}
        selectedValue={input.value}
        onValueChange={(value, index) => input.onChange(value)}
        children={children}
        {...custom} >
        {allIngredients.map((ingredient) => ( <Item key={ingredient.name} label={ingredient.name} value={ingredient._id} /> ) )}
      </Picker>
      {touched && error && <Text>{error}</Text>}
    </View>
  )

  return (
    <Container style={{backgroundColor: 'rgba(30,30,30,1)',}}>
      <Content style={{padding: 16}}>
        {  submitted && <H1>Thank you for submitting new recipe!</H1>}
        { !submitted &&
        <View>
          { imageUri && <Image source={{ uri: imageUri }} style={{width: '100%', height: 200}} /> }
          <CameraButtons take = { this.takeImage } pick = { this.pickImage } />
          <Field name="name" label="Recipe name:" component={renderInput}  />
          <H3 style={{marginTop: 24, color: 'white'}}>Ingredients</H3>
          <FieldArray name="ingredients" component={renderIngredients}/>
          <H3 style={{marginTop: 24, color: 'white'}}>Instructions</H3>
          <FieldArray name="instructions" component={renderInstructions}/>
          <H3 style={{marginTop: 24, color: 'white'}}>How many meals?</H3>
        </View>
        }
      </Content>
      <Footer success>
        <FooterTab success>
          {!isSubmiting &&
            <Button full success onPress={handleSubmit(onSubmit)}>
              <Text style={{fontSize: 20, color: 'white'}}>SUBMIT</Text>
            </Button>}
          { isSubmiting && <Button disabled><Text>Submitting... <Spinner /></Text></Button>}
        </FooterTab>
    </Footer>
  </Container>

    );
  }

  const mapStateToProps = state => {
    const { submit, ingredients } = state
    const { imageUri, isSubmiting, submitted } = submit
    const { all } = ingredients
    return { imageUri, isSubmiting, submitted, allIngredients: all }
  }

const SubmitRecipeDecorated = reduxForm({ form: 'RecipeForm', })(SubmitRecipe);
export default connect(mapStateToProps)(SubmitRecipeDecorated);
