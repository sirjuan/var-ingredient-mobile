
import React from 'react';
import {View} from 'react-native'
import { Button, Icon, Text, List, ListItem, Right } from 'native-base'
import ListCategoryIngredients from './ListCategoryIngredients'
import { connect } from 'react-redux'
import {fetchIngredientsByCategory, toggleCategory} from '../actions/ingredients'

const ListCategories = (props) => {
  const { userIngredients, categories, add, remove, ingredientsByCategory, dispatch } = props

  const _toggle = (category) => {
    dispatch(fetchIngredientsByCategory(category))
    dispatch(toggleCategory(category.name))
  }

  return (
    <List style={{backgroundColor: 'white', paddingLeft: 0, marginLeft: 16, marginRight: 16, marginBottom: 16 }}>
      { categories.map((category, index) => {
        const ingredients = ingredientsByCategory[category.name]
        return (
          <View key={index}>
          <ListItem onPress={() => _toggle(category)} style={{height: 50, marginLeft: 0, paddingLeft: 16, backgroundColor: '#00695C'}}>
            <Text style={{color: 'white'}}>{category.name}</Text>
            <Right>
              <Button transparent onPress={() => _toggle(category)}>
              { ingredients && ingredients.open &&
                <Icon ios='ios-arrow-dropup' android="md-arrow-dropup"  style={{color: 'white'}}/>
              }
              { !ingredients &&
                <Icon ios='ios-arrow-dropdown' android="md-arrow-dropdown"  style={{color: 'white'}}/>
              }
              { ingredients && !ingredients.open &&
                <Icon ios='ios-arrow-dropdown' android="md-arrow-dropdown" style={{color: 'white'}} />
              }
              </Button>
            </Right>
          </ListItem>
          <ListCategoryIngredients
            add={add}
            remove={remove}
            ingredients={ingredients}
            userIngredients={userIngredients}
          />
        </View>
        )})
      }
    </List>
  )
}

const mapStateToProps = state => {
  const { ingredientsByCategory } = state
  return { ingredientsByCategory }
}

export default connect(mapStateToProps)(ListCategories)
