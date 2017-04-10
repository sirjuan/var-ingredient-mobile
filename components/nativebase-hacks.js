import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Container, Content, Footer, FooterTab, Picker, Input } from 'native-base'

export const DarkContainer = ({children, style, ...props}) => {
  return (
    <Container {...props} style={{backgroundColor: 'rgba(30,30,30,1)'}} >
      {children}
    </Container>
  );
}

export const MyContent = ({children, style, ...props}) => {
  return (
    <Content {...props} style={{padding: 10 }} >
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

export const MyInput = ({children, style, ...props}) => {
  return (

      <Input {...props} style={{backgroundColor: 'rgba(50,50,50,0.5)', color: 'white'}} >
        {children}
      </Input>
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
