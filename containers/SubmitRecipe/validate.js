const validate = values => {
  const errors = {}
  if(!values.name) {
    errors.name = 'Required'
  }
  if (!values.ingredients || !values.ingredients.length) {
    errors.ingredients = { _error: 'At least one ingredient must be entered' }
  } else {
    const ingredientsArrayErrors = []
    values.ingredients.forEach((ingredient, ingredientIndex) => {
      const ingredientErrors = {}
      if (!ingredient || !ingredient.quantity) {
        ingredientErrors.quantity = 'Required'
        ingredientsArrayErrors[ingredientIndex] = ingredientErrors
      }
    })
    if(ingredientsArrayErrors.length) {
      errors.ingredients = ingredientsArrayErrors
    }

    if (!values.instructions || !values.instructions.length) {
      errors.instructions = { _error: 'At least one instruction must be entered' }
    }


  }
  return errors
}

export default validate
