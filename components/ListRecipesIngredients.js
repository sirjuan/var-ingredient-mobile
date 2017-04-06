
import React from 'react';
import { StyleSheet, View } from 'react-native';
import styles from '../styles/styles';
import { Button, Input, Form, Item, Container, Content, Label, Header, Icon, Text, Grid, Col, IconRight, ListItem, H1, H2, H3, Spinner, Card, CardItem, Left, Body
 } from 'native-base'

const ListRecipesIngredients = ({recipe}) => {
  const ingredientList = recipe.ingredients.map((ingredient, index) => {
  return (


                   <ListItem key={index}>
                     <Text>
                       {ingredient.quantity} {ingredient.name}
                     </Text>
                   </ListItem>
   )
  })

  return <View>{ingredientList}</View>
}

export default ListRecipesIngredients;
