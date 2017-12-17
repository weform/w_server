import $ from 'jquery'

/* modal */
export const openModal = (Component, effect) => {
  $('body').addClass('open-modal-layer')

  return ({ type: 'OPEN_MODAL', Component, effect })
}

export const closeModal = () => {
  $('body').removeClass('open-modal-layer')

  return ({ type: 'CLOSE_MODAL' })
}
