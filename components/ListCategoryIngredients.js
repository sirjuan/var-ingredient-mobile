
import React from 'react';
import { View } from 'react-native'
import { Button, Icon, Text, ListItem, Right } from 'native-base'

const ListCategoryIngredients = (props) => {
  const { userIngredients, ingredients, add, remove } = props
  return (
    <View>
      {
        ingredients && ingredients.items && ingredients.open && ingredients.items.map((ingredient, index) => (
          <ListItem key={index}  style={{height: 50, marginLeft: 0, paddingLeft: 16}}>
            <Text>{ingredient.name}</Text>
            <Right>
            { userIngredients.map(i => i._id).indexOf(ingredient._id) < 0 &&
              <Button transparent success onPress={() => { add(ingredient) }}>
                <Icon ios='ios-add' android="md-add" />
              </Button> }
            { userIngredients.map(i => i._id).indexOf(ingredient._id) >= 0 &&
              <Button transparent danger onPress={() => { remove(ingredient) }}>
                <Icon ios='ios-remove' android="md-remove" />
              </Button> }
            </Right>
          </ListItem>
        ))
      }
    </View>
  )
}

export default ListCategoryIngredients
