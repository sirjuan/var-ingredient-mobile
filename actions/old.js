export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_ALL_POSTS_WITH_PAGINATION = 'REQUEST_ALL_POSTS_WITH_PAGINATION'
export const RECEIVE_ALL_POSTS_WITH_PAGINATION = 'RECEIVE_ALL_POSTS_WITH_PAGINATION'
export const SEARCH_RECIPE = 'SEARCH_RECIPE'
export const INVALIDATE_RECIPE = 'INVALIDATE_RECIPE'

export const searchByIngredient = ingredient => ({
  type: SEARCH_RECIPE,
  ingredient
})

export const invalidateRecipe = ingredient => ({
  type: INVALIDATE_RECIPE,
  ingredient
})

export const requestPosts = ingredient => ({
  type: REQUEST_POSTS,
  ingredient
})

export const receivePosts = (ingredient, json) => ({
  type: RECEIVE_POSTS,
  ingredient,
  posts: json.map(child => child),
  receivedAt: Date.now()
})

export const requestAllPostsWithPagination = (all, page, limit) => ({
  type: REQUEST_ALL_POSTS_WITH_PAGINATION,
  all, page, limit
})

export const receiveAllPostsWithPagination = (all, page, limit, json) => ({
  type: RECEIVE_ALL_POSTS_WITH_PAGINATION,
  all, page, limit,
  posts: json.map(child => child),
  receivedAt: Date.now()
})

const findIngredient = str => dispatch => {
  dispatch(requestIngredient(str));
  return fetch(`https://var-ingredient.joehub.fi/api/recipe?ingredients=${ingredient}`)
    .then(response => response.json())
    .then(json => dispatch(receiveIngredient(ingredient, json)))
    .catch(error => console.log(error))
}

const fetchRecipesByIngredients = ingredient => dispatch => {
  dispatch(requestPosts(ingredient))

  return fetch(`https://var-ingredient.joehub.fi/api/recipe?ingredients=${ingredient}`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(ingredient, json)))
    .catch(error => console.log(error))
}

const fetchPosts = ingredient => dispatch => {
  dispatch(requestPosts(ingredient))
  return fetch(`https://shrouded-stream-45631.herokuapp.com/api/recipes/ingredients/${ingredient}`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(ingredient, json)))
    .catch(error => console.log(error))
}

const shouldFetchPosts = (state, ingredient) => {
  const posts = state.postsByRecipe[ingredient]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = ingredient => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), ingredient)) {
    return dispatch(fetchPosts(ingredient))
  }
}

export const fetchAllPostsWithPagination = (all) => (dispatch, getState) => {
  dispatch(requestAllPostsWithPagination(all))
  const { page, limit, items } = getState().postsByPagination.all
  return fetch(`https://shrouded-stream-45631.herokuapp.com/api/recipes/page/${page}/limit/${limit}`)
    .then(response => response.json())
    .then(json => {
      const incrementPage = page + 1
      dispatch(receiveAllPostsWithPagination(all, incrementPage, limit, json))})
    .catch(error => console.log(error))
}

const shouldFetchPostsWithPagination = (state, all) => {
  const posts = state.postsByPagination.all
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsWithPaginationIfNeeded = all => (dispatch, getState) => {
  if (shouldFetchPostsWithPagination(getState(), all)) {
    return dispatch(fetchAllPostsWithPagination(all))
  }
}
