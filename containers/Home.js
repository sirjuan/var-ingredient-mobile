import React, { PropTypes } from 'react'
import { View, ScrollView, Image } from 'react-native';
// Import redux stuff
import { connect } from 'react-redux'
import { searchByIngredient, fetchPostsIfNeeded, invalidateRecipe } from '../actions/old'
// Import components
import IngredientList from '../components/IngredientList';
import ListRecipes from '../components/ListRecipes';
import SearchRecipes from '../components/SearchRecipes';
import BackgroundImage from '../components/BackgroundImage';
import SearchBar from '../components/SearchBar';
import styles from '../styles/styles'
import { Button, Input, Form, Item, Container, Content, Label, Header, Icon, Text, Grid, Col, IconRight, ListItem, H1, H2, H3, Spinner
 } from 'native-base'

class Home extends React.Component {

  static propTypes = {
    searchRecipe: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, searchRecipe } = this.props
    dispatch(fetchPostsIfNeeded(searchRecipe))
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.searchRecipe !== this.props.searchRecipe) {
      const { dispatch, searchRecipe } = nextProps
      dispatch(fetchPostsIfNeeded(searchRecipe))
    }
  }
  handleChange = ingredient => {
    this.props.dispatch(searchByIngredient(ingredient.text))
  }
  setFocus(f) {
    // this.setState({ hasFocus: f });
  }
  render() {
    return (
      <Container style={{backgroundColor: 'rgba(30,30,30,1)',}}>
        <SearchBar
          onChange = {(search) => this.handleChange(search) }
          setFocus = {(f) => this.setFocus(f) }
          hasFocus = {this.props.hasFocus}
          text = {this.props.text}
        />
<Content>


          <ListRecipes recipes={this.props.posts}/>
        <View style={styles.inputPassive}>
            <Image
              source={require('../assets/logo.png')}
              resizeMode={Image.resizeMode.contain}
              style={{flex: 1, width: '80%'}}/>

          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { searchRecipe, postsByRecipe } = state

  const { hasFocus, text, isFetching, lastUpdated, items: posts } = postsByRecipe[searchRecipe] || {
    isFetching: true,
    items: []
  }
  return { searchRecipe, hasFocus, text, posts, isFetching, lastUpdated }
}

export default connect(mapStateToProps)(Home)
