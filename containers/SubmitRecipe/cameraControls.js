import React from 'react'
import Expo from 'expo';
import { Field, FieldArray, reduxForm } from 'redux-form'
import styles from '../../styles/styles';
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native';
import { sendSubmit, pictureTaken, uploadImage } from '../../actions/submit'
import { connect } from 'react-redux'
import { Button, Input, Form, Item, Container, Content, Label, Header, Icon, Text, Grid, Col, IconRight, ListItem, H1, H2, H3, Spinner, Picker, Footer, FooterTab, Right, Left, InputGroup, Body, List
 } from 'native-base'
import CameraButtons from '../../components/CameraButtons'
import {renderInput} from './renderInput'
import {renderIngredientPicker, renderNumberPicker} from './renderPickers'

export const takeImage = async () => {
  let result = await Expo.ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [16,9]
  });
  if (!result.cancelled) {
    dispatch(pictureTaken(result.uri));
  }
}
export const pickImage = async () => {
  let result = await Expo.ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [16,9]
  });
  if (!result.cancelled) {
    dispatch(pictureTaken(result.uri));
  }
}
