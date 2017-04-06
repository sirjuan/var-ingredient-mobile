import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import styles from '../styles/styles';

const Logo = () => (
  <View style={styles.inputPassive}>
      <Image
        source={require('../assets/logo.png')}
        resizeMode={Image.resizeMode.contain}
        style={{flex: 1, width: '80%'}} />
  </View>
);

export default Logo;
