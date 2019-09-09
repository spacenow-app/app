// /* eslint-disable no-console */
// import { gql } from 'apollo-boost'

// import { getClientWithAuth } from 'graphql/apolloClient'
// import errToMsg from 'utils/errToMsg'
// import { config } from 'variables'

// // Actions
// export const Types = {
// }

// // Initial State
// const initialState = {
//   isLoading: false,
// }

// const queryGetBookingState = gql`
//   query GetBookingState($bookingId: String!) {
//     GetBookingById(bookingId: $bookingId) {
//       bookingId
//       bookingState
//     }
//   }
// `;

// const queryGetBookingById = gql`
//   query GetBookingById($bookingId: String!) {
//     GetBookingById(bookingId: $bookingId) {
//       bookingId
//       quantity
//       currency
//       totalPrice
//       listingId
//       totalDays
//       basePrice
//       createdAt
//       sourceId
//       chargeId
//       hostServiceFee
//       bookingState
//       confirmationCode
//       bookingId
//       guestServiceFee
//       fees
//       hostId
//       paymentState
//       updatedAt
//       priceType
//       guestId
//       period
//       reservations
//     }
//   }
// `;

