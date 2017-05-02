
import React from 'react';
import { Text, ListItem, Body, Thumbnail } from 'native-base'
import { showModal } from '../../actions/modal'

const Recipe = (props) => {

  const { recipe, dispatch, navigation } = props
  const src = 'http://res.cloudinary.com/dicyn7jds/image/upload/' + recipe.image.versionId + '/' + recipe.image._id + '.' + recipe.image.imageType

  const _toggleVisible = () => dispatch(showModal(recipe))

  return (


    <ListItem onPress={_toggleVisible}>
        <Thumbnail square size={80} source={{uri: src}} />
        <Body>
            <Text style={{color: 'white'}}>{recipe.name}</Text>
            <Text note>Cooking time: {recipe.cookingTime} minutes</Text>
        </Body>
    </ListItem>
  )
}

export default Recipe;
