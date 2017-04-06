import React, { PropTypes } from 'react'
import { View, ScrollView } from 'react-native';
// Import redux stuff
import { connect } from 'react-redux'
import { fetchPostsWithPaginationIfNeeded} from '../actions/old'
// Import components
import ListRecipes from '../components/ListRecipes';
import BackgroundImage from '../components/BackgroundImage';
import { Container } from 'native-base'

class AllRecipes extends React.Component {

  componentDidMount() {
    const { dispatch, searchRecipe } = this.props
    dispatch(fetchPostsWithPaginationIfNeeded('all'))

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.postsByPagination !== this.props.postsByPagination) {
      const { dispatch } = nextProps
      dispatch(fetchPostsWithPaginationIfNeeded('all'))
    }
  }
  render() {
    return (
      <Container>
          <BackgroundImage />
          {this.props.posts && <ListRecipes recipes={this.props.posts}/>}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { postsByPagination } = state
  const { isFetching, lastUpdated, items: posts } = postsByPagination.all || {
    isFetching: true,
    items: [],
    page: 1,
    limit: 2
  }
  return { posts, isFetching, lastUpdated }
}

export default connect(mapStateToProps)(AllRecipes)
