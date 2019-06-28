// Types
export const Types = {}

// Initial State
const initialState = {
  isLoading: false
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

// Action Creators
export const example = (type, props) => dispatch => {
  dispatch({
    type: '',
    payload: {}
  })
}
