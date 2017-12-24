// modal reducer
const initialModalState = {
  type: 'hide',
  effect: 'fade',
  Component: null
}

export const modal = (state = initialModalState, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state, type: 'show', effect: action.effect, Component: action.Component
      }
    case 'CLOSE_MODAL':
      return { ...state, type: 'hide' }
    default:
      return state
  }
}
