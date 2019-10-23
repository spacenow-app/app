import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Text, Grid, Cell, Avatar } from 'components'
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

const MessageDetailCard = ({ item, user, ...props }) => {
  return (
    <Grid column={12}>
      {(user.id === item.sent.id && (
        <CellStyled width={1}>
          <Avatar small image={user.profile.picture} />
        </CellStyled>
      )) || <Cell width={1} />}
      <Cell width={10}>
        <CardContainer key={item.id} alignContent="center" column={12}>
          <Box>
            <Text fontSize="12px" fontFamily="bold">
              {format(new Date(item.createdAt), 'dd MMM yyyy hh:mm aaaa')}
            </Text>
          </Box>
          <Box>
            <Text fontSize="12px">{item.content}</Text>
          </Box>
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
        picture: PropTypes.string.isRequired
      })
    }),
    createdAt: PropTypes.any.isRequired
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    profile: PropTypes.shape({
      picture: PropTypes.string.isRequired
    })
  })
}

export default MessageDetailCard
