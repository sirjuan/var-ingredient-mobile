import { REQUEST_SUBMIT, RECEIVE_SUBMIT, TAKE_PICTURE } from '../actions/submit'

const submitRecipe = (state = {}, action) => {
  switch (action.type) {
    case TAKE_PICTURE:
    return {
      ...state,
      imageUri: action.uri
    }
    case RECEIVE_SUBMIT:
    return {
      ...state,
      isSubmiting: false,
      submitted: true
    }
    case REQUEST_SUBMIT:
      return {
        ...state,
        isSubmiting: true
      }
    default:
      return state
  }
}
export default submitRecipe
