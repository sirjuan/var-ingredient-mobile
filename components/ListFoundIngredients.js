
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, Item, Header, Icon, Text, List, ListItem, Right } from 'native-base'
import styles from '../styles/styles';

const ListFoundIngredients = (props) => {
  return (
    <List style={{backgroundColor: 'white'}}>
      {
        props.ingredients.map((ingredient, index) => {
          return (
            <ListItem key={index}>
              <Text>{ingredient.name}</Text>
              <Right>
                    { props.list.indexOf(ingredient.name) < 0 &&
                      <Button transparent success onPress={() => { props.add(ingredient.name) }}>
                        <Icon ios='ios-add-circle' android="md-add-circle" />
                      </Button> }
                    { props.list.indexOf(ingredient.name) >= 0 &&
                      <Button transparent danger onPress={() => { props.remove(ingredient.name) }}>
                        <Icon ios='ios-remove-circle' android="md-remove-circle" />
                      </Button> }
              </Right>
            </ListItem>
          )
        })
      }
    </List>
  )
}

export default ListFoundIngredients
