
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'native-base'

const style = {
  justifyContent: 'center',
  marginTop: 6,
  marginRight: 3,
  padding: 8,
  height: 24,
  borderRadius: 2,
  backgroundColor: '#5cb85c',
}

const ListOwnIngredients = (props) => (
  <View style={{
    paddingHorizontal: 16,
    backgroundColor: 'rgba(30,30,30,1)',
    flexDirection:'row',
    flexWrap: 'wrap', }} >
    { props.userIngredients.map((ingredient, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => { props.remove(ingredient) }}
        style={style} >
        <Text style={{ padding: 0, margin: 0, }}>
          {ingredient.name} &times;
        </Text>
      </TouchableOpacity>
      ))
    }
  </View>
)

export default ListOwnIngredients
