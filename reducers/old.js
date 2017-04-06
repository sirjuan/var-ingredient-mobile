import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import {ingredients, recipesByIngredients} from './ingredients'
import {
  SEARCH_RECIPE, INVALIDATE_RECIPE,
  REQUEST_POSTS, RECEIVE_POSTS,
  REQUEST_ALL_POSTS_WITH_PAGINATION,
  RECEIVE_ALL_POSTS_WITH_PAGINATION
} from '../actions/old'

export const searchRecipe = (state = '', action) => {
  switch (action.type) {
    case SEARCH_RECIPE:
      return action.ingredient
    default:
      return state
  }
}
const posts = (state = {
  text: 'What ingredients do you have?',
  hasFocus: true,
  isFetching: false,
  didInvalidate: false,
  items: [],
}, action) => {
  switch (action.type) {
    case INVALIDATE_RECIPE:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

export const postsByRecipe = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_RECIPE:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.ingredient]: posts(state[action.ingredient], action)
      }
    default:
      return state
  }
}

const postsWithPagination = (state = {
  isFetching: false,
  page: 1,
  limit: 2,
  items: [],
}, action) => {
  switch (action.type) {
    case REQUEST_ALL_POSTS_WITH_PAGINATION:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_ALL_POSTS_WITH_PAGINATION:
      return {
        ...state,
        isFetching: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

export const postsByPagination = (state = { }, action) => {
  switch (action.type) {
    case RECEIVE_ALL_POSTS_WITH_PAGINATION:
    case REQUEST_ALL_POSTS_WITH_PAGINATION:
      return {
        ...state,
        [action.all]: postsWithPagination(state[action.all], action)
      }

    default:
      return state
  }
}
