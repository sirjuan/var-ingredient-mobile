import   React from 'react'
import   Expo from 'expo';
import { Field, FieldArray, reduxForm } from 'redux-form'
import   styles from '../../styles/styles';
import { View, Image } from 'react-native';
import { sendSubmit, pictureTaken, uploadImage} from '../../actions/submit'
import { connect } from 'react-redux'
import { Button, Container, Content, Footer, FooterTab, Grid, Col } from 'native-base'
import   CameraButtons from '../../components/CameraButtons'
import { renderInput, renderInstructions, renderIngredients, renderNumberPicker, renderIngredientPicker } from './renderInput'
import { MyText, H1, H2} from '../../components/text'
import { DarkContainer, MyContent} from '../../components/nativebase-hacks'

const SubmitRecipe = props => {

  const { handleSubmit, isSubmiting, submitted, dispatch, imageUri, allIngredients } = props

  submitImage = () => {
    dispatch(uploadImage(imageUri));
  }

  const onSubmit = (values, dispatch) => {
    dispatch(sendSubmit(values, imageUri));
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

  const meals = ['1','2','3','4','5','6']
  const cookingTime = ['15','30','45','60']

  return (
    <DarkContainer>
      <MyContent>

        {  submitted && <H1>Thank you for submitting new recipe!</H1>}

        { !submitted &&
        <View style={{marginBottom: 50}}>

          { imageUri && <Image source={{ uri: imageUri }} style={{width: '100%', height: 200}} /> }
          <CameraButtons take = { takeImage } pick = { pickImage } />

          <H1>Recipe name</H1>
          <Field name="name" label="Recipe name:" component={renderInput}  />

          <H1>Ingredients</H1>
          <FieldArray name="ingredients" ingredients={allIngredients} component={renderIngredients}/>

          <H1>Instructions</H1>
          <FieldArray name="instructions" component={renderInstructions}/>

          <Grid>
            <Col>
              <H1># of meals</H1>
              <Field label="Select ingredient" name='mealCount' children={meals} mode="dropdown" component={renderNumberPicker} />
            </Col>
            <Col>
              <H1>Cooking Time</H1>
              <Field label="Select ingredient" name='mealCount' children={cookingTime} mode="dropdown" component={renderNumberPicker}/>
            </Col>
          </Grid>





        </View>
        }

      </MyContent>

      <Footer>
        <FooterTab>
          {!isSubmiting && <Button success onPress={handleSubmit(onSubmit)}><H2>SUBMIT</H2></Button>}
          { isSubmiting && <Button disabled><MyText>Submitting... <Spinner /></MyText></Button>}
        </FooterTab>
      </Footer>
    </DarkContainer>
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
