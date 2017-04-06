
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, Item, Header, Icon, Text, List, ListItem, Right } from 'native-base'
import styles from '../styles/styles';

const SearchBarIngredients = (props) => {
  return (
    <Header searchBar rounded style={{backgroundColor: 'rgba(30,30,30,1)',}}>
      <Item>
        <Icon name="search" />
        <Input
            placeholder='What ingredients do you have?'
            onChangeText = {(i) => props.onChange(i) }
            returnKeyType = 'search'
            value = {props.input}
        />
        { props.input.length === 0 && <Icon active name="pizza" />}
        { props.input.length > 0 &&
          <Button success onPress={props.clear}>
            <Icon ios='ios-checkmark' android="md-checkmark" />
          </Button>
        }
      </Item>
    </Header>
  )
}

export default SearchBarIngredients
