
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, Item, Header, Icon, Text } from 'native-base'
import styles from '../styles/styles';

    function SearchBar(props) {
      return (
        <Header searchBar rounded style={{backgroundColor: 'rgba(30,30,30,1)',}}>
          <Item>
            <Icon name="search" />
            <Input
                    placeholder={props.text}
                    onChangeText={(text) => props.onChange({text})}
                    onFocus={() => props.setFocus(true)}
            />
            <Icon active name="pizza" />
          </Item>
        </Header>

    );
    }

export default SearchBar;
