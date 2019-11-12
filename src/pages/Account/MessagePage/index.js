import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { Title, Grid, Cell, Loader, MessageCard, BackgroundImage, Dropdown, Pagination } from 'components'
import { onGetMessagesByUser } from 'redux/ducks/message'

const ContainerPagination = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: center;
`

const MessagePage = ({ match, location, history, ...props }) => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.account.get)

  const { array: messages } = useSelector(state => state.message.list)
  const { isLoading: isMessageLoading } = useSelector(state => state.message)
  const [userType, setUserType] = useState('guest')
  const [pageIndex, setPageIndex] = useState(0)

  const pageSize = 10

  useEffect(() => {
    user && dispatch(onGetMessagesByUser({ id: user.id, type: userType, pageIndex: 0, pageSize }))
  }, [dispatch, user, userType])

  const _handleChange = type => {
    setUserType(type)
    setPageIndex(0)
    dispatch(onGetMessagesByUser({ id: user.id, type, pageIndex: 0, pageSize }))
  }

  const _onPageChanged = page => {
    setPageIndex(page - 1)
    dispatch(onGetMessagesByUser({ id: user.id, type: userType, pageIndex: page - 1, pageSize }))
  }

  return (
    <>
      <Grid column="12">
        <Cell width={8}>
          <Title type="h3" title="Messages" />
        </Cell>
        <Cell width={4} middle justifySelf="end">
          <Dropdown alignRight size="sm" style={{ margin: '30px 0' }}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {userType}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => _handleChange('guest')}>Guest</Dropdown.Item>
              <Dropdown.Item onClick={() => _handleChange('host')}>Host</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Cell>
      </Grid>

      {isMessageLoading ? (
        <Loader />
      ) : (
        <>
          {!messages || messages.rows.length === 0 ? (
            <BackgroundImage text="We didn't find any messages :(" />
          ) : (
            messages.rows.map(item => (
              <MessageCard
                key={item.id}
                item={item}
                userType={userType}
                userId={user.id}
                history={history}
                dispatch={dispatch}
              />
            ))
          )}
        </>
      )}
      {messages && messages.count / pageSize > 1 && (
        <ContainerPagination>
          <Pagination
            totalPages={messages.count / pageSize}
            totalRecords={messages.count}
            onPageChanged={_onPageChanged}
            pageIndex={pageIndex}
          />
        </ContainerPagination>
      )}
    </>
  )
}

MessagePage.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired
}

export default MessagePage
