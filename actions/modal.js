export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'SHOW_MODAL'

export const showModal = (recipe) => ({
  type: SHOW_MODAL,
  recipe
})

export const hideModal = () => ({
  type: HIDE_MODAL,
})
