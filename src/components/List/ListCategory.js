import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Icon } from 'components'
import { checkPropTypes } from 'prop-types'

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 130px));
  grid-column-gap: 10px;
  justify-content: center;

  ${props =>
    props.circular &&
    css`
      grid-template-columns: repeat(auto-fit, minmax(90px, 90px));
      grid-column-gap: 30px;
    `}
`

const ListItem = styled.div`
  display: grid;
  justify-self: center;
  text-align: center;
  width: 100%;

  ${props =>
    !props.circular &&
    css`
      background-color: #f7f7f7;
      width: 130px;
      height: 130px;
      border-radius: 8px;

      :hover {
        background-color: #6adc91;
        cursor: pointer;
      }
    `}
  ${props =>
    !props.circular &&
    props.active &&
    css`
      background-color: #6adc91;
    `}
`

const IconContainer = styled.div`
  border: 1px solid #e2e2e2;
  width: 90px;
  height: 90px;
  border-radius: 100%;
  display: grid;
  justify-self: center;

  ${props =>
    props.active &&
    css`
      background-color: #6adc91;
      border: none;
    `}

  :hover {
    background-color: #6adc91;
    cursor: pointer;
    border: none;
  }
`

const IconStyled = styled(Icon)`
  width: 50px;
  justify-self: center;
  align-self: center;
  fill: #172439;
`

const TitleStyled = styled.span`
  justify-self: center;
  align-self: start;
  color: #172439;
  font-family: 'Montserrat-Medium';
  font-size: 14px;

  ${props =>
    props.circular &&
    css`
      margin-top: 15px;
    `}
`

const ListCategory = ({ circular, data, handleItemClick, itemSelected }) => {
  useEffect(() => {}, [data, itemSelected])

  const _parseIconName = (isSub, name) => {
    let prefix = 'category-'
    if (isSub) prefix = 'sub-category-'
    return prefix + name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
  }

  if (!data || !data.length) {
    return null
  }

  return (
    <List circular={circular}>
      {data.map(item => (
        <ListItem
          key={item.id}
          circular={circular}
          onClick={e => handleItemClick(e, item)}
          active={itemSelected && item.id === itemSelected.id}
        >
          {circular ? (
            <>
              <IconContainer active={itemSelected && item.id === itemSelected.id}>
                <IconStyled name={_parseIconName(circular, item.otherItemName)} fill="#172439" />
              </IconContainer>
              <TitleStyled circular>{item.itemName}</TitleStyled>
            </>
          ) : (
            <>
              <IconStyled name={_parseIconName(circular, item.otherItemName)} fill="#172439" />
              <TitleStyled>{item.itemName}</TitleStyled>
            </>
          )}
        </ListItem>
      ))}
    </List>
  )
}

ListCategory.propsType = {}

ListCategory.defaultProps = {
  circular: false,
  itemSelected: false,
  handleItemClick: () => {}
}

export default ListCategory
