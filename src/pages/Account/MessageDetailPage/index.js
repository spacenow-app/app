import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { Title, Grid, Cell, Loader, MessageDetailCard, Input, Button, Box } from 'components'

import { onGetMessage, onCreateMessageItem } from 'redux/ducks/message'

const MessageDetailPage = ({ match, location, history, ...props }) => {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.account.get)
  const { object: message, isLoading: isMessageLoading } = useSelector(state => state.message.get)
  const [content, setContent] = useState('')

  useEffect(() => {
    match && match.params && dispatch(onGetMessage(match.params.id))
  }, [dispatch, match])

  const _onSubmit = () => {
    const values = {
      content,
      sentBy: user.id,
      messageId: message.id,
      isRead: 1
    }
    match && match.params && dispatch(onCreateMessageItem(values))
    setContent('')
  }

  const _onchange = e => {
    setContent(e.target.value)
  }

  const _handleKeyDown = e => {
    if (e.key === 'Enter' && content !== '') {
      _onSubmit()
    }
  }

  return (
    <>
      <Grid column="12">
        <Cell width={8}>
          <Title type="h3" title="Conversation" />
        </Cell>
      </Grid>
      <Input onChange={_onchange} value={content} name="content" onKeyDown={_handleKeyDown} />
      <Box display="flex" justifyContent="flex-end">
        <Button my="20px" onClick={() => _onSubmit()} disabled={!content}>
          Send message
        </Button>
      </Box>

      {isMessageLoading ? (
        <Loader />
      ) : (
        <Box overflow="auto" height="400px">
          {message.messageItems.map(item => (
            <MessageDetailCard item={item} key={item.id} />
          ))}
        </Box>
      )}
    </>
  )
}

MessageDetailPage.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired
}

export default MessageDetailPage
