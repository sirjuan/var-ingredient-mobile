import React, { PropTypes } from 'react'
import { View, Image, TouchableOpacity } from 'react-native';
import { Button, Container, Content, Header, Icon, Text, Item, Input,  List, ListItem, H3, Right, Footer, FooterTab
 } from 'native-base'
// Import redux stuff
import { connect } from 'react-redux'
import { searchIngredient, addIngredient, removeIngredient, clearInput, fetchRecipesIfNeeded } from '../actions/ingredients'
// Import components
import styles from '../styles/styles'
import Logo from '../components/Logo'
import RecipeList from '../components/RecipeList'
import ListFoundIngredients from '../components/ListFoundIngredients'
import ListOwnIngredients from '../components/ListOwnIngredients'
import SearchBarIngredients from '../components/SearchBarIngredients'

 const Ingredients = props => {
  const { found, list, dispatch, input, recipes } = props

  handleChange = i => {
    dispatch(searchIngredient(i))
  }
  add = (i) => {
    dispatch(addIngredient(i))
    dispatch(fetchRecipesIfNeeded())
  }
  remove = (i) => {
    dispatch(removeIngredient(i))
    dispatch(fetchRecipesIfNeeded())
  }
  clear = () => {
    dispatch(clearInput())
  }
  searchRecipes = () => {
    dispatch(fetchRecipesIfNeeded())
  }
  return (
    <Container style={{backgroundColor: 'rgba(30,30,30,1)',}}>
      <SearchBarIngredients
        input={input}
        clear={this.clear}
        onChange = {(i) => this.handleChange(i) }
      />
      <Content>
        { input.length === 0 && list.length === 0 && <Logo /> }
        { input.length > 0 &&
          <ListFoundIngredients
            ingredients={found}
            list={list}
            add={(ingredient) => this.add(ingredient)}
            remove={(ingredient) => this.remove(ingredient)}
          /> }
        { input.length === 0 && list.length > 0 &&
          <View>
            <ListOwnIngredients
              ownIngredients = {list}
              remove={(ingredient) => this.remove(ingredient)}
            />
            <RecipeList recipes={recipes} />
          </View>
        }
      </Content>
    </Container>
  );
}

const mapStateToProps = state => {
  const { ingredients, recipesByIngredients } = state
  const { found, list, input } = ingredients
  const { items: recipes } = recipesByIngredients[list] || {
    isFetching: true,
    items: []
  }
  return { found, list, input, recipes}
}

export default connect(mapStateToProps)(Ingredients)
