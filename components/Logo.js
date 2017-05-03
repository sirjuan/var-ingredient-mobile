import React from 'react';
import { View, Image } from 'react-native';

const Logo = () => (
  <View style={{height: 300, paddingTop: 0, alignItems: 'center'}}>
      <Image
        source={require('../assets/logo.png')}
        resizeMode={Image.resizeMode.contain}
        style={{flex: 1, width: '80%'}} />
  </View>
)

export default Logo;
