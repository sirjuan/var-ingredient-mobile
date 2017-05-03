
import React from 'react';
import { Button, Item, Header, Icon, Text, Right } from 'native-base'

const SearchBarIngredients = (props) => (
  <Header searchBar rounded style={{backgroundColor: 'rgba(30,30,30,1)',}}>
    <Item onPress={props.toggle}>
      <Icon name="search" />
      <Text>What ingredients do you have?</Text>
      <Right>
        { props.open
          ? ( <Button success onPress={props.toggle} style={{height: 39, marginTop: 1, borderBottomRightRadius: 4, borderTopRightRadius: 4}}>
                <Icon ios='ios-checkmark' android="md-checkmark" />
              </Button> )
          : <Icon ios="ios-pizza" android="md-pizza" style={{fontSize: 24, color: '#455A64', marginRight: 12}} /> }
      </Right>

    </Item>
  </Header>
)

export default SearchBarIngredients
