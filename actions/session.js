import axios from 'axios'
import Expo from 'expo'
import { getHeaders } from './headers'
import { AsyncStorage } from 'react-native'
import { fetchRecipes, fetchCategories, fetchIngredients } from './ingredients'

export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const LOGGING = 'LOGGING'
export const SIGNING_UP = 'SIGNING_UP'
export const SIGNED_UP = 'SIGNED_UP'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const USER_INGREDIENTS = 'USER_INGREDIENTS'
export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'

export const addIngredient = ingredient => ({ type: ADD_INGREDIENT, ingredient })
export const removeIngredient = ingredient => ({ type: REMOVE_INGREDIENT, ingredient })
export const logout = () => ({ type: LOG_OUT })
const doLogin = user => ({ type: LOG_IN, user })
const userIngredients = (ingredients) => ({ type: USER_INGREDIENTS, ingredients })
const loggingIn = () => ({ type: LOGGING })
const loginFail = () => ({ type: LOGIN_FAIL })
const signingUp = () => ({ type: SIGNING_UP })
const signedUp = () => ({ type: SIGNED_UP })

const host_url = 'https://var-ingredient.joehub.fi'

export const userSignup = () => (dispatch, getState) => {
  dispatch(signingUp())
  const { email, password } = getState().form.login.values
  const url = host_url + '/api/user/v2'
  axios.post(url, { email: email, password: password })
    .then(() => dispatch(signedUp()))
    .catch((error) => console.log(error));
}

export const userLogin = () => (dispatch, getState) => {
  dispatch(loggingIn())
  const { email, password } = getState().form.login.values
  const url = host_url + '/auth/login'
  axios.post(url, { email: email, password: password })
    .then((response) => dispatch(startUp(response.data.user)))
    .then(() => dispatch(_setToken()))
    .catch((error) => {
      console.log('Login error: ' + error.message)
      dispatch(loginFail())
    })
}

export const fLogin = (id) => (dispatch, getState) => {
  dispatch(loggingIn())
  const url = host_url + '/auth/facebook/login'
  axios.post(url, { id: id })
    .then((response) => dispatch(startUp(response.data.user)))
    .then(() => dispatch(_setToken()))
    .catch((error) => {
      console.log('Facebook Login Error: ' + error.message)
      dispatch(loginFail())
    })
}

export const userLogout = () => dispatch => {
  _removetoken()
  dispatch(logout())
  const header = dispatch(getHeaders())
  const url = host_url + '/auth/logout'
  axios.get(url, header).catch(error => console.log(error.message))
}

export const postUserIngredient = (ingredient) => (dispatch, getState) => {
  dispatch(addIngredient(ingredient))
  const header = dispatch(getHeaders())
  const options = {
    method: 'post',
    url: host_url + '/api/user/' + getState().session._id + '/ingredient',
    data: ingredient,
    header
  }
  axios(options).catch(error => {
    dispatch(removeIngredient(ingredient))
    console.log(error.message)
  })
}

export const removeUserIngredient = (ingredient) => (dispatch, getState) => {
  dispatch(removeIngredient(ingredient))
  const header = dispatch(getHeaders())
  const options = {
    method: 'delete',
    url: host_url + '/api/user/' + getState().session._id + '/ingredient/' + ingredient._id,
    header
  }
  axios(options).catch(error => {
    dispatch(addIngredient(ingredient))
    console.log(error.message)
  })
}

export const getUserIngredients = () => (dispatch, getState) => {
  const header = dispatch(getHeaders())
  const url = host_url + '/api/user/' + getState().session._id + '/ingredients'
  axios.get(url, header)
    .then(response => dispatch(doLogin(response.data))) // User details
    .then(() => dispatch(fetchRecipes()))
    .catch(error => console.log(error.message));
}

export const startUp = user => dispatch => {
  dispatch(doLogin(user))
  dispatch(getUserIngredients())
  dispatch(fetchCategories())
  dispatch(fetchIngredients())
}

const _removetoken = async () => {
  await AsyncStorage.removeItem('credentials');
}

const _setToken = () => (dispatch, getState) => {
  const user = getState().session
  try { AsyncStorage.setItem('credentials', JSON.stringify(user)) }
  catch (error) { console.log(error.message) }
}
