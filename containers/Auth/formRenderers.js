
import   React from 'react';
import { View, Text } from 'react-native';
import { MyInput } from '../../components/nativebase-hacks'

export const renderInput = ({ input, label, meta: { touched, error, warning }, ...custom }) => (
  <View>
    <MyInput
      placeholder={label}
      onChangeText={(value) => input.onChange(value)} {...input}
      inputStyle={{marginTop: 20, width: '80%', alignSelf: 'center',}}
      {...custom} />
    {touched && (error && <Text style={{color: '#d9534f', alignSelf: 'center'}}>{error}</Text> )}
    {touched && (!error && <Text style={{color: '#5cb85c', alignSelf: 'center'}}>Passed validation</Text> )}
  </View>
)
