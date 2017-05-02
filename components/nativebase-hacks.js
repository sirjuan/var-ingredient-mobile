import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Container, Content, Footer, FooterTab, Picker, Input, Item, Label } from 'native-base'

export const DarkContainer = ({children, iStyle, ...props}) => {
  const containerStyle = {
    backgroundColor: 'rgba(30,30,30,1)',
    ...iStyle
  }
  return (
    <Container {...props} style={containerStyle} >
      {children}
    </Container>
  );
}

export const MyContent = ({children, style, ...props}) => {
  const contentStyle = {
    padding: 10,
    ...style
  }
  return (
    <Content {...props} style={contentStyle} >
      {children}
    </Content>
  );
}
export const MyPicker = ({children, style, ...props}) => {
  return (
<View style={{backgroundColor: 'rgba(50,50,50,0.5)', margin: 2,}}>
  <Picker {...props} style={{color: 'white',}} >
    {children}
  </Picker>

</View>

  );
}

export const MyInput = ({children, inputStyle, ...props}) => {
  const componentStyle = {

      ...inputStyle,
  }
  console.log(componentStyle)
  const {label, error, touched} = props
  return (
    <Item floatingLabel last style={componentStyle}>
        {touched && error
          ? <Label style={{color: 'red'}}>{label}</Label>
          : <Label style={{color: 'white'}}>{label}</Label>}
        <Input style={{backgroundColor: 'rgba(50,50,50,0.5)',color: 'white'}} {...props}  >
          {children}
        </Input>
    </Item>





  );
}

export const styles = StyleSheet.create({
  default: {
    color: 'white',
  },
  h1: {
    fontSize: 30,
  },
  h2: {
    fontSize: 20,
  },
  searchBox: {
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  darkBackground: {
    backgroundColor: 'rgba(30,30,30,1)',
  },

});
