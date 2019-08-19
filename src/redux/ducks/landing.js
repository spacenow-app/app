import { gql } from 'apollo-boost'
import { getClientWithAuth } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'

// Actions
export const Types = {
  GET_CAR_PRICE_ESTIMATION_REQUEST: 'GET_CAR_PRICE_ESTIMATION_REQUEST',
  GET_CAR_PRICE_ESTIMATION_SUCCESS: 'GET_CAR_PRICE_ESTIMATION_SUCCESS',
  GET_CAR_PRICE_ESTIMATION_FAILURE: 'GET_CAR_PRICE_ESTIMATION_FAILURE'
}

// Initial State
const initialState = {
  isLoading: false,
  carPriceEstimation: [],
  error: null
}

// GraphQL
const queryGetPricesEstimation = gql`
  query getPricesEstimation {
    getPricesEstimation {
      priceEstimationId
      state
      suburb
      postcode
      estimate
      term
    }
  }
`

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_CAR_PRICE_ESTIMATION_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.GET_CAR_PRICE_ESTIMATION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        carPriceEstimation: action.payload
      }
    }
    case Types.GET_CAR_PRICE_ESTIMATION_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    default:
      return state
  }
}

// Side Effects
export const getPricesEstimation = () => async dispatch => {
  dispatch({
    type: Types.GET_CAR_PRICE_ESTIMATION_REQUEST
  })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetPricesEstimation,
      fetchPolicy: 'network-only'
    })

    const arraySeparate = data.queryGetPricesEstimation.map((el, index) => {
      return {
        state: el.state,
        suburbs: data.queryGetPricesEstimation.filter(res => res.state === el.state)
      }
    })

    dispatch({
      type: Types.GET_CAR_PRICE_ESTIMATION_SUCCESS,
      payload: arraySeparate
    })
  } catch (err) {
    dispatch({
      type: Types.GET_CAR_PRICE_ESTIMATION_FAILURE,
      payload: errToMsg(err)
    })
  }
}
