import React from 'react'
import { View } from 'react-native'
import { Container, Content } from 'native-base'
// Import redux stuff
import { connect } from 'react-redux'
import { toggleSearch, fetchRecipes } from '../actions/ingredients'

import { addIngredient, removeUserIngredient, postUserIngredient } from '../actions/session'
// Import components
import Logo from '../components/Logo'
import RecipeList from '../components/RecipeList'
import RecipeModal from '../components/Recipe/RecipeModal'
import ListCategories from '../components/ListCategories'
import ListOwnIngredients from '../components/ListOwnIngredients'
import SearchBarIngredients from '../components/SearchBarIngredients'


 const Ingredients = props => {
  const { userIngredients, dispatch, recipes, categories, open, appNav } = props

  add = i => dispatch(postUserIngredient(i))

  remove = i => {
    dispatch(removeUserIngredient(i))
    dispatch(fetchRecipes())
  }

  const toggle = () => {
    dispatch(toggleSearch())
    dispatch(fetchRecipes())
  }

  return (
    <Container style={{backgroundColor: 'rgba(30,30,30,1)',}}>
      <RecipeModal />
      <SearchBarIngredients
        open={open}
        toggle={toggle}
      />
      <Content>
        { !open && !userIngredients.length && <Logo /> }
        { open
          ?
          <ListCategories
            categories={categories}
            userIngredients={userIngredients}
            add={(i) => this.add(i)}
            remove={(i) => this.remove(i)} />
          :
          <View>
            <ListOwnIngredients
              userIngredients = {userIngredients}
              remove={(ingredient) => this.remove(ingredient)}
            />
            <RecipeList recipes={recipes} dispatch={dispatch} navigation={appNav}/>
          </View> }
      </Content>
    </Container>
  );
}

const mapStateToProps = state => {
  const { status, session, recipeReducer, ingredientsByCategory, appNav } = state
  const { categories } = status
  const { open } = ingredientsByCategory
  const { ingredients: userIngredients } = session
  const { recipes } = recipeReducer
  return { userIngredients, recipes, categories, open}
}

export default connect(mapStateToProps)(Ingredients)
