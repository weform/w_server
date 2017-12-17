// modal reducer
const initialAccoutnState = {
  ...gon.__INITIAL_STATE__.currentUser
}

const currentUser = (state = initialAccoutnState, action) => {
  const { type, ...other } = action

  switch (type) {
    case 'UPDATE_CURRENT_USER':
      return {
        ...other
      }
    default:
      return state
  }
}

export default currentUser
