
import React from 'react';
import { View } from 'react-native';
import { Text, ListItem } from 'native-base'

const ListRecipesInstructions = ({instructions}) => (
  <View>{
    instructions.map((instruction, index) => (
      <ListItem key={index}>
        <Text>
          {instruction}
        </Text>
      </ListItem>
     ))
  }</View>
)

export default ListRecipesInstructions;
