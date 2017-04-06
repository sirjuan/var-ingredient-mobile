
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import styles from '../styles/styles';
import ListRecipesIngredients from './ListRecipesIngredients';
import { Button, Input, Form, Item, Container, Content, Label, Header, Icon, Text, Grid, Col, IconRight, ListItem, H1, H2, H3, Spinner, Card, CardItem, Left, Body
 } from 'native-base'

const ListRecipes = ({recipes}) => {
  const returnRecipes = recipes.map((recipe, index) => {
    const src = 'https://res.cloudinary.com/hqztacsgj/image/upload/' + recipe.imageId + '.jpg'
    return (
        <Card key={index}>
          <CardItem cardBody >
             {recipe.imageId && <Image
               style={{flex: 1, height: 200 }}
               resizeMode={Image.resizeMode.cover}
               source={{uri: src}}
              />}
          </CardItem>
          <CardItem>
              <Text style={{fontSize: 24}}>{recipe.name}</Text>
          </CardItem>
          <ListRecipesIngredients recipe={recipe} />
          <CardItem content>
              <Text>{recipe.instructions}</Text>
          </CardItem>
        </Card>
      )
   })
   return ( <View style={{padding: 16}}>{returnRecipes}</View> )
}

export default ListRecipes;
