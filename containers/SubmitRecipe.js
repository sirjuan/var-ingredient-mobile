import React from 'react'
import Expo from 'expo';
import { Field, FieldArray, reduxForm } from 'redux-form'
import styles from '../styles/styles';
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native';
import { sendSubmit, pictureTaken, uploadImage } from '../actions/submit'
import { connect } from 'react-redux'
import { Button, Input, Form, Item, Container, Content, Label, Header, Icon, Text, Grid, Col, IconRight, ListItem, H1, H2, H3, Spinner, Picker, Footer, FooterTab, Right
 } from 'native-base'


const SubmitRecipe = props => {
  const { handleSubmit, isSubmiting, submitted, dispatch, localImage, databaseId } = props

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
      aspect: [4,3]
    });
    if (!result.cancelled) {
      dispatch(pictureTaken(result.uri));
    }
  }
  submitImage = () => {
    dispatch(uploadImage(localImage));
  }

  const onSubmit = (values, dispatch) => {
    dispatch(sendSubmit(values, localImage));
  }
  return (


        <Container style={{backgroundColor: 'rgba(30,30,30,1)',}}>

          <Content style={{padding: 16}}>
            { !submitted && <View>
              {localImage && <TouchableHighlight onPress={this.submitImage} >
                <Image source={{uri: localImage}} style={{width: '100%', height: 200}} />
              </TouchableHighlight> }

              <Grid>
                  <Col style={{padding: 8}}>
                    <Button light block transparent onPress={this.takeImage}>
                      <Icon ios='ios-camera-outline' android="md-camera" />
                      <Text>Take picture</Text>
                    </Button>
                  </Col>
                  <Col style={{padding: 8}}>
                    <Button light block transparent onPress={this.pickImage}>
                      <Icon ios='ios-photos-outline' android="md-photos" />
                      <Text>Pick from gallery</Text>

                    </Button>
                  </Col>
              </Grid>

              <Field name="name" label="Recipe name:" component={renderInput}  />


              <Field name="instructions" label="Instructions" component={renderInput} />
            <H3 style={{marginTop: 24, color: 'white'}}>Ingredients</H3>
            <FieldArray name="ingredients" component={renderIngredients}/>
            <H3 style={{marginTop: 24, color: 'white'}}>How many meals?</H3>

        </View>



      }

            {submitted && <H1>Thank you for submitting new recipe!</H1>}







          </Content>
          <Footer >
              <FooterTab>
                {!isSubmiting && <Button style={{marginBottom: 32}} success block onPress={handleSubmit(onSubmit)}><Text>Submit</Text></Button>}
                  { isSubmiting && <Button backgroundColor='rgba(30,30,30,1)'><Spinner /></Button>}
              </FooterTab>
          </Footer>
        </Container>

    );
  }

  const renderInput = ({ input, label, meta: { touched, error }, ...custom }) => (
    <Item floatingLabel style={{width: '100%'}}>
      <Label>{label}</Label>
      <Input style={{color: 'white'}} onChangeText={(value) => input.onChange(value)} {...input}/>
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

        <Field
          name={`${ingredient}.name`}
          component={renderInput}
          label="Ingredient"/>
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


  const mapStateToProps = state => {
    const { submit } = state
    const { localImage, databaseId, isSubmiting, submitted } = submit
    return { localImage, databaseId, isSubmiting, submitted }
  }

const SubmitRecipeDecorated = reduxForm({ form: 'RecipeForm', })(SubmitRecipe);
export default connect(mapStateToProps)(SubmitRecipeDecorated);
