/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { onGetUserDocuments, onDeleteDocument, onUploadDocument } from 'redux/ducks/account';
import { Button, Loader, BackgroundImage, Grid, Cell, Title, Image, Wrapper, Icon, Document } from 'components'

const CadStyled = styled.div`
  display: grid;
  > div {
    grid-column-start: 1;
    grid-row-start: 1;
  }
  > button {
    grid-column-start: 1;
    grid-row-start: 1;
    align-self: end;
    justify-self: end;
    z-index: 2;
  }
`

const _handleOnDelete = (dispatch) => (userId, id) => {
  dispatch(onDeleteDocument(userId, id))
}

const DocumentCard = (dispatch, item, index) => {
  return (
    <CadStyled key={index}>
      <Image src={item.fileName} type={item.fileType} width="100%" />
      <Button icon={<Icon width="15px" fill="#ffffff" name="bin" />} style={{ width: '40px', height: '40px' }} onClick={() => _handleOnDelete(dispatch)(item.userId, item.id)} />
    </CadStyled>
  )
}

const DocumentVerificationPage = () => {
  const dispatch = useDispatch();

  const { user: { id } } = useSelector(state => state.account.get)
  const { isLoading, get: { documents } } = useSelector(state => state.account)

  useEffect(() => {
    dispatch(onGetUserDocuments(id))
  }, [dispatch, id])

  const _addDocument = useCallback(
    acceptedFiles => {
      acceptedFiles.map(async file => {
        await dispatch(onUploadDocument(id, file))
      })
    }, [dispatch, id])

  if (isLoading) return <Loader text="Loading documents process" />

  return (
    <Wrapper>
      <Helmet title="Your Documents - Spacenow" />
      <Grid column="12">
        <Cell width={8}>
          <Title type="h4" title="Your Documents" />
        </Cell>
        <Cell width={4} middle justifySelf="end">
          {(!documents || documents.count === 0) && <Document isButton onDrop={_addDocument} />}
        </Cell>
      </Grid>

      {!documents || documents.count === 0 ? (
        <BackgroundImage text="We didn't find any document :(" />
      ) : (
          <Grid columns={3}>
            {[].concat(documents.rows).map((item, index) => DocumentCard(dispatch, item, index))}
            <Document onDrop={_addDocument} />
          </Grid>
        )}
    </Wrapper>
  )
}

export default DocumentVerificationPage
