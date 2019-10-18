import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Text } from 'components'
import { format } from 'date-fns'

const CardContainer = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  /* border: 1px solid #ececec; */
  box-shadow: 0 0 5px 1px #eee;
  border-radius: 6px;
  opacity: 1;
  man-width: 400px;
  margin: 30px 0;
  padding: 28px 32px;
`

const MessageDetailCard = ({ item, ...props }) => {
  return (
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
  )
}

MessageDetailCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.any.isRequired
  }).isRequired
}

export default MessageDetailCard
