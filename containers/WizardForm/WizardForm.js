import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import WizardFormFirstPage from './WizardFormFirstPage'
import WizardFormSecondPage from './WizardFormSecondPage'
import WizardFormThirdPage from './WizardFormThirdPage'

import { View } from 'react-native'
import { Button, Input, Form, Item, Container, Content, Label, Header, Icon, Text, Grid, Col, IconRight, ListItem, H1, H2, H3, Spinner, Picker, Footer, FooterTab, Right
 } from 'native-base'

 const WizardForm = props => {
   const { page, dispatch, onSubmit, ingredients } = props

   nextPage = () => {
     dispatch(changePage(page + 1))
   }

  previousPage = () => {
    dispatch(changePage(page - 1))
  }

  console.log('joo')
  console.log(page)
    return (<Container style={{backgroundColor: 'rgba(30,30,30,1)',}}>
        {page === 1 && <WizardFormFirstPage nextPage={this.nextPage}/> }
        {page === 2 && <WizardFormSecondPage previousPage={this.previousPage} nextPage={this.nextPage}/>}
        {page === 3 && <WizardFormThirdPage previousPage={this.previousPage} onSubmit={onSubmit} ingredients={ingredients} />}
      </Container>
    )

}

WizardForm.propTypes = {

}

const mapStateToProps = state => {
  const { wizardPage, ingredients } = state
  const { page } = wizardPage
  const { all } = ingredients
  return { page, ingredients: all }
}

export default connect(mapStateToProps)(WizardForm);

export const wizardPage = (state = { page: 1 }, action) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.page
      }
    default:
      return state
  }
}

const CHANGE_PAGE = 'CHANGE_PAGE'

const changePage = page => ({
  type: CHANGE_PAGE,
  page
})
