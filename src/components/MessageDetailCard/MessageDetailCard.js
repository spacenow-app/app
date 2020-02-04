import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Text, Grid, Cell, Avatar, Checkbox } from 'components'
import { format } from 'date-fns'

const CardContainer = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  /* border: 1px solid #ececec; */
  box-shadow: 0 0 5px 1px #eee;
  border-radius: 6px;
  opacity: 1;
  man-width: 400px;
  margin: 20px 0;
  padding: 28px 32px;
`

const CellStyled = styled(Cell)`
  display: grid;
  align-items: center;
`

const _formatPeriod = (period, bookingType) => {
  let bookingPeriod
  switch (bookingType) {
    case 'daily':
      bookingPeriod = period > 1 ? 'Days' : 'Day'
      return `${period} ${bookingPeriod}`
    case 'weekly':
      bookingPeriod = period > 1 ? 'Weeks' : 'Week'
      return `${period} ${bookingPeriod}`
    case 'monthly':
      bookingPeriod = period > 1 ? 'Months' : 'Month'
      return `${period} ${bookingPeriod}`
    default:
      return `${period} Days`
  }
}

const MessageDetailCard = ({ item, user, count, index, messageParent, ...props }) => {
  console.log('item', item)
  return (
    <Grid column={12}>
      {(user.id === item.sent.id && (
        <CellStyled width={1}>
          <Avatar small image={user.profile.picture} />
        </CellStyled>
      )) || <Cell width={1} />}
      <Cell width={10}>
        <CardContainer key={item.id} alignContent="center" column={12}>
          {index !== count - 1 && (
            <>
              <Box>
                <Text fontSize="12px" fontFamily="bold">
                  {format(new Date(item.createdAt), 'dd MMM yyyy hh:mm aaaa')}
                </Text>
              </Box>
              <Box>
                <Text fontSize="12px">{item.content}</Text>
              </Box>
            </>
          )}
          {index === count - 1 && messageParent.messageHost.reason !== 'inspection' && (
            <>
              <Box fontSize="12px">
                <Box>
                  <Text fontFamily="bold">
                    {`Message from ${item.sent.profile.firstName} ${item.sent.profile.lastName}`}{' '}
                  </Text>
                </Box>
                <Box>
                  <Text>{format(new Date(item.createdAt), 'dd MMM yyyy hh:mm aaaa')}</Text>
                </Box>
              </Box>
              {messageParent && messageParent.messageHost && (
                <>
                  <Box fontSize="12px" mt="20px">
                    <Grid columns={12}>
                      <Cell width={6}>
                        <Box>
                          <Text fontFamily="bold">Requested time and date</Text>
                        </Box>
                        {messageParent.messageHost.bookingPeriod === 'hourly' &&
                          messageParent.messageHost.reservations.length > 0 && (
                            <Text>
                              {format(new Date(messageParent.messageHost.reservations[0]), 'dd MMM yyyy')}{' '}
                              {messageParent.messageHost.startTime} {' to '} {messageParent.messageHost.endTime}{' '}
                            </Text>
                          )}

                        {messageParent.messageHost.bookingPeriod !== 'hourly' &&
                          messageParent.messageHost.reservations.length > 0 && (
                            <>
                              <Text>{format(new Date(messageParent.messageHost.reservations[0]), 'dd MMM yyyy')} </Text>
                              <Text>
                                for {''}{' '}
                                {_formatPeriod(
                                  messageParent.messageHost.period,
                                  messageParent.messageHost.bookingPeriod
                                )}
                              </Text>
                            </>
                          )}
                      </Cell>
                      <Cell width={6}>
                        <Box>
                          <Text fontFamily="bold">Booking Flexibility</Text>
                        </Box>
                        <Checkbox
                          fontSize="12px"
                          checked={messageParent.messageHost.flexibleTime === 1}
                          label="Flexible with time and dates"
                          disabled
                        />
                      </Cell>
                    </Grid>
                  </Box>
                  {(messageParent.messageHost.reason || messageParent.messageHost.peopleQuantity) && (
                    <Box fontSize="12px" mt="20px">
                      <Grid columns={12}>
                        <Cell width={6}>
                          {messageParent.messageHost.peopleQuantity && (
                            <>
                              <Box>
                                <Text fontFamily="bold">How many people?</Text>
                              </Box>
                              <Text>{messageParent.messageHost.peopleQuantity}</Text>
                            </>
                          )}
                        </Cell>
                        <Cell width={6}>
                          {messageParent.messageHost.reason && (
                            <>
                              <Box>
                                <Text fontFamily="bold">What will you be using the space for?</Text>
                              </Box>
                              <Text>{messageParent.messageHost.reason}</Text>
                            </>
                          )}
                        </Cell>
                      </Grid>
                    </Box>
                  )}
                  {item.content && (
                    <Box fontSize="12px" mt="20px">
                      <Grid columns={12}>
                        <Cell width={12}>
                          <Box>
                            <Text fontFamily="bold">Message</Text>
                          </Box>
                          <Text>{item.content}</Text>
                        </Cell>
                      </Grid>
                    </Box>
                  )}
                </>
              )}
            </>
          )}

          {index === count - 1 && messageParent.messageHost.reason === 'inspection' && (
            <>
              <Box fontSize="12px">
                <Box>
                  <Text fontFamily="bold">
                    {`Message from ${item.sent.profile.firstName} ${item.sent.profile.lastName}`}{' '}
                  </Text>
                </Box>
                <Box>
                  <Text>{format(new Date(item.createdAt), 'dd MMM yyyy hh:mm aaaa')}</Text>
                </Box>
              </Box>
              {messageParent && messageParent.messageHost && (
                <>
                  <Box fontSize="12px" mt="20px">
                    <Grid columns={12}>
                      <Cell width={6}>
                        <Box>
                          <Text fontFamily="bold">Requested time and date</Text>
                        </Box>
                        {messageParent.messageHost.bookingPeriod === 'hourly' &&
                          messageParent.messageHost.reservations.length > 0 && (
                            <Text>
                              {format(new Date(messageParent.messageHost.reservations[0]), 'dd MMM yyyy')}{' '}
                              {messageParent.messageHost.startTime} {' to '} {messageParent.messageHost.endTime}{' '}
                            </Text>
                          )}
                      </Cell>
                    </Grid>
                  </Box>
                </>
              )}
            </>
          )}
        </CardContainer>
      </Cell>
      {user.id !== item.sent.id && (
        <CellStyled width={1}>
          <Avatar small image={item.sent.profile.picture} />
        </CellStyled>
      )}
    </Grid>
  )
}

MessageDetailCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    sent: PropTypes.shape({
      id: PropTypes.string,
      profile: PropTypes.shape({
        picture: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired
      })
    }),
    createdAt: PropTypes.any.isRequired
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    profile: PropTypes.shape({
      picture: PropTypes.string.isRequired
    })
  }),
  count: PropTypes.number,
  index: PropTypes.number,
  messageParent: PropTypes.shape({})
}

export default MessageDetailCard
