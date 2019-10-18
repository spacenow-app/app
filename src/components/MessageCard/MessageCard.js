import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Text, Icon, UserDetails, Grid, Cell, Link } from 'components'
import { onReadMessage } from 'redux/ducks/message'

const CardContainerGrid = styled(Grid)`
  height: 144px;
  background: #ffffff 0% 0% no-repeat padding-box;
  /* border: 1px solid #ececec; */
  box-shadow: 0 0 5px 1px #eee;
  border-radius: 6px;
  opacity: 1;
  man-width: 400px;
  margin: 30px 0;
  padding: 28px 32px;
  cursor: pointer;

  :hover {
    box-shadow: 0 0 5px 1px #ddd;
  }
`

const MessageCard = ({ item, userType, history, dispatch, ...props }) => {
  const _onClick = async id => {
    await dispatch(onReadMessage(id))
    history.push(`message/${id}`)
  }

  return (
    <CardContainerGrid key={item.id} alignContent="center" column={12} onClick={() => _onClick(item.id)}>
      <Cell width={5}>
        <UserDetails
          hostname={userType === 'host' ? item.guest.profile.displayName : item.host.profile.displayName}
          // address={userType === 'host'}
        />
      </Cell>
      <Cell width={6}>
        <Grid columns="85px auto">
          <Text fontFamily="bold" fontSize="12px">
            Conversation
          </Text>
          {item.unreadItems !== 0 && (
            <Box backgroundColor="#6ADC91" borderRadius="50%" width="17px" height="17px" textAlign="center">
              <Text fontFamily="bold" fontSize="9px" color="white" verticalAlign="text-top">
                {item.unreadItems}
              </Text>
            </Box>
          )}
        </Grid>

        {item.messageItems && item.messageItems[0] && (
          <Box mt="17px">
            <Box fontSize="12px" lineHeight="1.35" overflow="hidden" height="45px">
              {item.messageItems[0].content}
            </Box>
          </Box>
        )}
      </Cell>
      {/* <Cell width={2}>
        <Link>Save Chat</Link>
        <br />
        <Link>Archive</Link>
      </Cell> */}
    </CardContainerGrid>
  )
}

MessageCard.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  dispatch: PropTypes.instanceOf(Object).isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    guest: PropTypes.shape({
      profile: PropTypes.shape({
        displayName: PropTypes.string.isRequired
      })
    }),
    host: PropTypes.shape({
      profile: PropTypes.shape({
        displayName: PropTypes.string.isRequired
      })
    }),
    unreadItems: PropTypes.number.isRequired,
    messageItems: PropTypes.array
  }).isRequired,
  userType: PropTypes.string.isRequired
}

export default MessageCard
