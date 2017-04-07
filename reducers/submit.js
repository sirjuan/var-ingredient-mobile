import {
  REQUEST_SUBMIT, RECEIVE_SUBMIT,
  TAKE_PICTURE, UPLOAD_PICTURE,
} from '../actions/submit'

const submitRecipe = (state = {}, action) => {
  switch (action.type) {
    case TAKE_PICTURE:
    return {
      ...state,
      imageUri: action.uri
    }
    case UPLOAD_PICTURE:
    return {
      ...state,
      cloudinaryId: action.id
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
