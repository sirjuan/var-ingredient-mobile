export const REQUEST_SUBMIT = 'REQUEST_SUBMIT'
export const RECEIVE_SUBMIT = 'RECEIVE_SUBMIT'
export const TAKE_PICTURE = 'TAKE_PICTURE'
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE'

export const pictureTaken = uri => ({
  type: TAKE_PICTURE,
  uri
})

export const uploadPicture = id => ({
  type: UPLOAD_PICTURE,
  id
})

export const requestSubmit = recipe => ({
  type: REQUEST_SUBMIT,
  recipe
})

export const confirmSubmit = (recipe, json) => ({
  type: RECEIVE_SUBMIT,
  recipe,
})

export const sendSubmit = (recipe, image) => dispatch => {
  dispatch(requestSubmit())
  const photo = {
    uri: image,
    type: 'image/jpeg',
    name: 'image.jpg'
  };
  const formData = new FormData();
  formData.append('photo', photo);
  fetch("https://shrouded-stream-45631.herokuapp.com/api/images/upload", {
    method: "POST",
    body: formData
  }).then(response => response.json())
  .then(json => {
    dispatch(uploadPicture(json.public_id))
    recipe.imageId = json.public_id;
    return fetch(`https://shrouded-stream-45631.herokuapp.com/api/recipes/`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipe)
    })
      .then(response => dispatch(confirmSubmit(recipe)))
      .catch(error => console.log(error))
  })
  .catch(error => console.log("error: " + error))
}

const submitRecipe = (recipe) => {

}
