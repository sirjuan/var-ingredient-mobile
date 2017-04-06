
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import styles from '../styles/styles';

    function SearchRecipes(props) {
      return (
        <View style={[styles.container, !props.hasFocus && styles.inputPassive]}>
          <Text style={[styles.h1, styles.blue]}>What ingredients do you have in your cabinet?</Text>
          <TextInput
              style={styles.searchBox}
              placeholder={props.text}
              placeholderTextColor='black'
              onChangeText={(text) => props.onChange({text})}
              underlineColorAndroid='transparent'
              onFocus={() => props.setFocus(true)}
            />
        </View>
      );
    }

export default SearchRecipes;
