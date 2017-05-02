
import React from 'react';
import { View } from 'react-native';
import { Text, ListItem } from 'native-base'

const ListRecipesIngredients = ({ingredients}) => (
  <View>{
    ingredients.map((ingredient, index) => (
       <ListItem key={index}>
         <Text>
           {ingredient.quantity} {ingredient.name}
         </Text>
       </ListItem>
     ))
  }</View>
)

export default ListRecipesIngredients;
