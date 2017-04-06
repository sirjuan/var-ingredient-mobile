
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Input, Item, Header, Icon, Text, List, ListItem, Right } from 'native-base'
import styles from '../styles/styles';

const ListOwnIngredients = (props) => {
  return (
    <View style={{
      paddingHorizontal: 16,
      backgroundColor: 'rgba(30,30,30,1)',
      flexDirection:'row',
      flexWrap: 'wrap', }} >
  {
    props.ownIngredients.map((ingredient, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => { props.remove(ingredient) }}
          style={{
            justifyContent: 'center',
            marginTop: 6,
            marginRight: 3,
            padding: 8,
            height: 24,
            borderRadius: 2,
            backgroundColor: '#5cb85c',
          }} >
          <Text style={{ padding: 0, margin: 0, }}>
            {ingredient}&nbsp;&times;
          </Text>
        </TouchableOpacity>

      )
    })
  }
</View>
  )
}

export default ListOwnIngredients
