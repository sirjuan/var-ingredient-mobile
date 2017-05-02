import   React from 'react'
import   Expo from 'expo';
import { Field, FieldArray, reduxForm } from 'redux-form'
import   styles from '../../styles/styles';
import { View, Image, Text } from 'react-native';
import { sendSubmit, pictureTaken, submitRecipe} from '../../actions/submit'
import { connect } from 'react-redux'
import { Button, Container, Content, Footer, FooterTab, Grid, Col,  Spinner } from 'native-base'
import   CameraButtons from '../../components/CameraButtons'
import { renderInput, renderInstructions, renderIngredients, renderNumberPicker, renderIngredientPicker } from './formRenderers'
import { MyText, H3, H2} from '../../components/text'
import { DarkContainer, MyContent} from '../../components/nativebase-hacks'
import validate from './validate'

const SubmitRecipe = props => {

  const { handleSubmit, isSubmiting, submitted, dispatch, imageUri, ingredients } = props

  const onSubmit = (values, dispatch) => {
    dispatch(submitRecipe(values, imageUri));
  }

  const takeImage = async () => {
    let result = await Expo.ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16,9]
    });
    if (!result.cancelled) {
      dispatch(pictureTaken(result.uri));
    }
  }
  const pickImage = async () =>  {
    let result = await Expo.ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16,9]
    });
    if (!result.cancelled) {
      dispatch(pictureTaken(result.uri));
    }
  }

  const meals = [1,2,3,4,5,6]
  const cookingTime = [15,30,45,60]

  return (
    <DarkContainer>
      <MyContent>

        {  submitted && <H3>Thank you for submitting new recipe!</H3>}

        { !submitted &&
        <View style={{marginBottom: 50}}>

          { imageUri && <Image source={{ uri: imageUri }} style={{width: '100%', height: 200}} /> }
          <CameraButtons take = { takeImage } pick = { pickImage } />

          <Field name="name" label="Name" component={renderInput}  />
          <Field name="description" label="Description" component={renderInput}  />
          <FieldArray name="ingredients" ingredients={ingredients} component={renderIngredients}/>
          <FieldArray name="instructions" component={renderInstructions}/>

          <Grid>
            <Col>
              <H3># of meals</H3>
              <Field label="Select number" name='numOfMeals' type='number' children={meals} mode="dropdown" component={renderNumberPicker} />
            </Col>
            <Col>
              <H3>Cooking Time</H3>
              <Field label="Select time" name='cookingTime' type='number' children={cookingTime} mode="dropdown" component={renderNumberPicker}/>
            </Col>
          </Grid>

        </View>
        }

      </MyContent>

      <Footer>
        <FooterTab>
          {!isSubmiting && <Button success onPress={handleSubmit(onSubmit)}><H2>SUBMIT</H2></Button>}
          { isSubmiting && <Button disabled><MyText>Submitting... </MyText><Spinner /></Button>}
        </FooterTab>
      </Footer>
    </DarkContainer>
    );
  }

  const mapStateToProps = state => {
    const { submit, status } = state
    const { imageUri, isSubmiting, submitted } = submit
    const { ingredients } = status
    return { imageUri, isSubmiting, submitted, ingredients }
  }

const SubmitRecipeDecorated = reduxForm({ form: 'recipeForm', validate })(SubmitRecipe);
export default connect(mapStateToProps)(SubmitRecipeDecorated);
