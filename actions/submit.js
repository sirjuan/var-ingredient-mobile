
import { getHeaders } from './headers'
export const REQUEST_SUBMIT = 'REQUEST_SUBMIT'
export const RECEIVE_SUBMIT = 'RECEIVE_SUBMIT'
export const TAKE_PICTURE = 'TAKE_PICTURE'

export const pictureTaken = uri => ({ type: TAKE_PICTURE, uri })
export const requestSubmit = recipe => ({ type: REQUEST_SUBMIT, recipe })
export const confirmSubmit = (recipe, json) => ({ type: RECEIVE_SUBMIT, recipe })

export const submitRecipe = () => (dispatch, getState) => {
  dispatch(requestSubmit())

  const recipe = getState().form.recipeForm.values
  let image = getState().submit.imageUri

  const filename = image.split('/').pop();
    // Infer the type of the image
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : `image`;

  const photo = {
    uri: image,
    type,
    name: filename
  };

  const formData = new FormData();
  formData.append('image', photo);
  formData.append('recipe', JSON.stringify(recipe))

  const header = dispatch(getHeaders())

  const config = {
    method: "POST",
    body: formData,
    header
  }
  fetch("https://var-ingredient.joehub.fi/api/recipe", config)
    .then(response => response.json())
    .then(response => dispatch(confirmSubmit(recipe)))
    .catch(error => console.log(error))
}
