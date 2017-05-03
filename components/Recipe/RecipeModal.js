import React from 'react';
import { hideModal } from '../../actions/modal'
import { connect } from 'react-redux'
import { Modal, View, Image} from 'react-native'
import { Text, ListItem, CardItem, Content } from 'native-base'
import ListRecipesIngredients from './ListRecipesIngredients';
import ListRecipesInstructions from './ListRecipesInstructions'

const RecipeModal = (props) => {

  const { modalVisible, recipe, dispatch } = props
  const src = recipe && 'http://res.cloudinary.com/dicyn7jds/image/upload/' + recipe.image.versionId + '/' + recipe.image._id + '.' + recipe.image.imageType

  const hide = () => dispatch(hideModal())

  return (
    <View>
      {recipe && <Modal animationType={"slide"} transparent={false} visible={modalVisible} onRequestClose={hide} >
          <Content>
            <Image style={{height: 200 }} resizeMode={Image.resizeMode.cover} source={{uri: src}} />
            <CardItem>
              <Text style={{fontSize: 18}}>{recipe.name}</Text>
            </CardItem>
            <CardItem>
              <Text>{recipe.numOfMeals} meals / {recipe.cookingTime} minutes</Text>
            </CardItem>
            <ListItem>
              <Text style={{fontSize: 16}}>{recipe.description}</Text>
            </ListItem>
            <ListRecipesIngredients ingredients={recipe.ingredients} />
            <ListRecipesInstructions instructions={recipe.instructions} />
          </Content>
        </Modal>}
      </View>
    )
  }

  const mapStateToProps = state => {
    const { recipeReducer } = state
    const { modalRecipe:recipe, modalVisible } = recipeReducer
    return { recipe, modalVisible }
  }

  export default connect(mapStateToProps)(RecipeModal)
