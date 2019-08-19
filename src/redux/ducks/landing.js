import { gql } from 'apollo-boost'
import { getClientWithAuth } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'

// Actions
export const Types = {
  GET_OFFICE_PRICE_ESTIMATION_REQUEST: 'GET_OFFICE_PRICE_ESTIMATION_REQUEST',
  GET_OFFICE_PRICE_ESTIMATION_SUCCESS: 'GET_OFFICE_PRICE_ESTIMATION_SUCCESS',
  GET_OFFICE_PRICE_ESTIMATION_FAILURE: 'GET_OFFICE_PRICE_ESTIMATION_FAILURE',
  GET_CARPARK_PRICE_ESTIMATION_REQUEST: 'GET_CARPARK_PRICE_ESTIMATION_REQUEST',
  GET_CARPARK_PRICE_ESTIMATION_SUCCESS: 'GET_CARPARK_PRICE_ESTIMATION_SUCCESS',
  GET_CARPARK_PRICE_ESTIMATION_FAILURE: 'GET_CARPARK_PRICE_ESTIMATION_FAILURE'
}

// Initial State
const initialState = {
  isLoading: false,
  carPriceEstimation: [],
  officePriceEstimation: [],
  error: null
}

// GraphQL
const queryGetPricesEstimation = gql`
  query getPricesEstimation($type: String!) {
    getPricesEstimation(type: $type) {
      priceEstimationId
      state
      suburb
      postcode
      estimate
      term
      type
    }
  }
`

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_OFFICE_PRICE_ESTIMATION_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.GET_OFFICE_PRICE_ESTIMATION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        officePriceEstimation: action.payload
      }
    }
    case Types.GET_OFFICE_PRICE_ESTIMATION_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case Types.GET_CARPARK_PRICE_ESTIMATION_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.GET_CARPARK_PRICE_ESTIMATION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        carPriceEstimation: action.payload
      }
    }
    case Types.GET_CARPARK_PRICE_ESTIMATION_FAILURE: {
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
export const getOfficePricesEstimation = () => async dispatch => {
  dispatch({
    type: Types.GET_OFFICE_PRICE_ESTIMATION_REQUEST
  })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetPricesEstimation,
      fetchPolicy: 'network-only',
      variables: {
        type: 'office'
      }
    })

    const arraySeparate = data.getPricesEstimation.reduce((acumulator, currentValue, currentIndex, array) => {
      if (acumulator.find(res => res.state === currentValue.state)) {
        return acumulator
      }
      return [
        ...acumulator,
        {
          state: currentValue.state,
          suburbs: array.filter(res => res.state === currentValue.state)
        }
      ]
    }, [])

    dispatch({
      type: Types.GET_OFFICE_PRICE_ESTIMATION_SUCCESS,
      payload: arraySeparate
    })
  } catch (err) {
    dispatch({
      type: Types.GET_OFFICE_PRICE_ESTIMATION_FAILURE,
      payload: errToMsg(err)
    })
  }
}

export const getCarParkPricesEstimation = () => async dispatch => {
  dispatch({
    type: Types.GET_CARPARK_PRICE_ESTIMATION_REQUEST
  })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetPricesEstimation,
      fetchPolicy: 'network-only',
      variables: {
        type: 'carpark'
      }
    })

    const arraySeparate = data.getPricesEstimation.reduce((acumulator, currentValue, currentIndex, array) => {
      if (acumulator.find(res => res.state === currentValue.state)) {
        return acumulator
      }
      return [
        ...acumulator,
        {
          state: currentValue.state,
          suburbs: array.filter(res => res.state === currentValue.state)
        }
      ]
    }, [])

    dispatch({
      type: Types.GET_CARPARK_PRICE_ESTIMATION_SUCCESS,
      payload: arraySeparate
    })
  } catch (err) {
    dispatch({
      type: Types.GET_CARPARK_PRICE_ESTIMATION_FAILURE,
      payload: errToMsg(err)
    })
  }
}
