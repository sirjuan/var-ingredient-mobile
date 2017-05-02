
import   React from 'react';
import { View } from 'react-native';
import { Input, Icon, Button, InputGroup, List, ListItem, Left, Right, Body, Item } from 'native-base'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { MyText, H1, DangerText} from '../../components/text'
import { DarkContainer, MyContent, MyPicker, MyInput } from '../../components/nativebase-hacks'

 export const renderInput = ({ input, label, meta: { touched, error }, ...custom }) => (
   <View>
     <MyInput
       label={touched && error ? error : label}
       placeholderTextColor = {touched && error ? '#d9534f' : 'gray'}
       style={{color: 'white'}}
       onChangeText={(value) => input.onChange(value)} {...input}
     >

   </MyInput>
   {touched && (error && <MyText style={{color: '#d9534f', alignSelf: 'center'}}>{error}</MyText> )}
   {touched && (!error && <MyText style={{color: '#5cb85c', alignSelf: 'center'}}>Passed validation</MyText> )}
   </View>

 )

 export const renderInstructions = ({ fields }) => (

   <View style={{marginTop: 16}}>
     {fields.map((instruction, index) =>
       <InputGroup key={index} style={{paddingLeft:0}}>
         <Field  style={{marginLeft:0}} name={instruction} type="text" component={renderInput} label="Instruction"/>
         <Icon danger name='close' style={{fontSize: 16, color:'#d9534f', paddingLeft: 30, paddingRight: 20}} onPress={() => fields.remove(index)} />
       </InputGroup>
     )}
     <Button style={{marginTop: 16, marginBottom: 16}} success transparent block onPress={() => fields.push()}>
       <Icon ios='ios-add' android="md-add" />
       <MyText>Add instruction</MyText>
     </Button>
   </View>
 )

 export const renderIngredients = ({ fields, ingredients }) => (
   <List>
     {fields.map((ingredient, index) =>
       <ListItem key={index} style={{paddingBottom: 0, paddingTop: 0, marginLeft: 0 }}>
         <Left>
           <Field name={`${ingredient}.quantity`} component={renderInput} label="Quantity"/>
         </Left>
         <Body>
           <Field label="Select ingredient" name={`${ingredient}._id`} mode="dropdown" component={renderIngredientPicker} children={ingredients}/>
         </Body>
         <Right>
           <Icon name='close' onPress={() => fields.remove(index)} style={{color:'#d9534f'}} />
         </Right>
       </ListItem>
     )}
     <Button style={{marginTop: 16, marginBottom: 16}} success transparent block onPress={() => fields.push({})}>
       <Icon ios='ios-add' android="md-add" />
       <MyText>Add ingredient</MyText>
     </Button>
   </List>
 )

 export const renderIngredientPicker = ({ input, label, meta: { touched, error }, children, ...custom }) => (

   <MyPicker
     selectedValue={input.value}
     onValueChange={(value, index) => input.onChange(value)} >
       {children.map((ingredient) => (
         <Item key={ingredient._id} label={ingredient.name} value={ingredient._id} />
         )
       )}
   </MyPicker>
 )

 export const renderNumberPicker = ({ input, label, meta: { touched, error }, children, type, ...custom }) => (

     <MyPicker

       type={type}
       selectedValue={input.value}
       onValueChange={(value, index) => input.onChange(value)}
       defaultLabel="joo">
       {children.map((count) => ( <Item key={`${count}`} label={`${count}`} value={count} /> ) )}
     </MyPicker>

 )
