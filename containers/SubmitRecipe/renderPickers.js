
import React from 'react';
import { Picker, Item } from 'native-base'

export const renderIngredientPicker = ({ input, label, meta: { touched, error }, children, ...custom }) => (

  <Picker
    style ={{color: 'white'}}
    selectedValue={input.value}
    onValueChange={(value, index) => input.onChange(value)} >
      {children.map((ingredient) => (
        <Item key={ingredient.name} label={ingredient.name} value={ingredient._id} />
        )
      )}
  </Picker>
)

export const renderNumberPicker = ({ input, label, meta: { touched, error }, children, ...custom }) => (

    <Picker
      style ={{backgroundColor: 'white', color: 'white'}}
      selectedValue={input.value}
      onValueChange={(value, index) => input.onChange(value)} >
      {children.map((count) => ( <Item key={count} label={count} value={count} /> ) )}
    </Picker>

)
