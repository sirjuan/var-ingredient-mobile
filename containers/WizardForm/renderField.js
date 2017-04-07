import React from 'react'
import { Button, Input, Form, Item, Container, Content, Label, Header, Icon, Text, Grid, Col, IconRight, ListItem, H1, H2, H3, Spinner, Picker, Footer, FooterTab, Right
 } from 'native-base'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <Item floatingLabel style={{width: '100%'}}>
    <Label>{label}</Label>
    <Input
      style={{color: 'white'}}
      onChangeText={(value) => input.onChange(value)}
      type={type}
    
    />
    {touched && error && <Text>{error}</Text>}
  </Item>
);

export default renderField
