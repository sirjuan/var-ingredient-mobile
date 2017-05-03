
import React from 'react';
import Recipe from './Recipe'
import { List } from 'native-base'

const RecipeList = (props) => (
  <List>
    { props.recipes.map((recipe, index) => (
      <Recipe key={index} recipe={recipe} dispatch={props.dispatch} navigation={props.navigation}/>
    )) }
  </List>
)

export default RecipeList;
