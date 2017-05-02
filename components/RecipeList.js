
import React from 'react';
import { View} from 'react-native';
import Recipe from './Recipe'
import { Button, Input, Form, Item, Container, Content, Label, Header, Icon, Text, Grid, Col, IconRight, ListItem, H1, H2, H3, Spinner, Card, CardItem, Left, Body, List
 } from 'native-base'

const RecipeList = (props) => (
  <List>
    {
      props.recipes.map((recipe, index) => (
        <Recipe key={index} recipe={recipe} dispatch={props.dispatch} navigation={props.navigation}/>
      ))
    }
  </List>
)

export default RecipeList;
