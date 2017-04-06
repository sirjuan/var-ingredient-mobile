import React from 'react';
import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';

var {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  scroll: {

  },
  
  container: {
    flex:0,
    alignItems: 'center',
    paddingTop: 50,

  },
  inputPassive: {
    height: 300,
    paddingTop: 0,
alignItems: 'center'
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: height,
    resizeMode: 'cover', // or 'stretch'
    zIndex: -1,
    },
  blue: {
    color: 'aliceblue',
  },
  h1: {
    fontSize: 30,
    textAlign: 'center',
  },
  searchBox: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    color: 'black',
    padding: 10,
    fontSize: 24,
    width: 250,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    padding: 10,
    fontSize: 20,
    marginBottom: 150,
  },
  listElement: {
    fontSize: 20,
  },
  recipeList: {
    padding: 10,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'rgba(1,1,1,0.5)',
  },
  submitForm: {
    backgroundColor: 'rgba(255,255,255,0.8)',


  }

});

export default styles;
