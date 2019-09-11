import React from 'react'
import styled from 'styled-components'
import { Dropdown, Tooltip, OverlayTrigger } from 'react-bootstrap'

import Title from 'components/Title'
import Tag from 'components/Tag'
import Image from 'components/Image'
import Label from 'components/Label'
import Button from 'components/Button'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 250px auto auto;
  grid-template-rows: 1fr auto;
  grid-template-areas: 
    "image body body"
    "image footer footer";
  grid-column-gap: 20px;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  max-height: 200px;
  box-shadow: rgb(203, 203, 203) 5px 5px 10px 0px;
  transition: box-shadow ease .3s;
  &&: hover {
    box-shadow: rgb(203, 203, 203) 10px 10px 20px 0px;
  }

  @media(max-width: 576px) {
    grid-template-columns: 1fr;
    grid-template-areas: 
      "image"
      "body"
      "footer";
    max-height: fit-content;
  }

  `

const ImageStyled = styled(Image)`
  grid-area: image;
  @media(max-width: 576px) {
    width: 100%;
  }
`

const BodyStyled = styled.div`
  grid-area: body;
  display: grid;
  padding: 20px 10px 0 10px;
  
  grid-auto-flow: row;
`

const TitleStyled = styled(Title)`
`

const PriceStyled = styled(Title)`
`

const TagStyled = styled(Tag)`
`

const OverlayTriggerStyled = styled(OverlayTrigger)`
  border-radius: 5px;
`

const ExpireOnStyled = styled(Title)`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: max-content;
  grid-gap: 10px;
  align-items: center;
`

const LabelStyled = styled(Label)`
  justify-self: end;
`

const ButtonStyled = styled(Button)`
  justify-self: end;
`

const FooterStyled = styled.div`
  grid-area: footer;
  padding: 0 20px 20px 10px;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: max-content;
  grid-column-gap: inherit;
  @media(max-width: 576px) {
    grid-auto-flow: column;
    padding: 10px 20px 20px 10px;
  }
`

const DropdownStyled = styled(Dropdown)`
  grid-area: body;
  justify-self: end;
  padding: 20px;

  &&&.show button {
    background-color: transparent;
  }
  > div {
    border-radius: 10px;
  }  

  & button { 
    background-color: transparent;
    border: none;
    border-radius: 30px;
    padding: 10px 10px;

    & span {
      color: #6ADC91;
    }
  }
  &&&:hover button, &&&:focus button, &&&:active button {
    background-color: transparent;
  }
  & a {
    font-size: 14px;
  }

`

const ToolTipStyled = styled(Tooltip)`
`

const CardHorizontal = ({ ...props }) => {
  return (
    <Wrapper {...props}>
      {props.children}
    </Wrapper>
  )
}

CardHorizontal.Image = ImageStyled
CardHorizontal.Body = BodyStyled
CardHorizontal.Title = TitleStyled
CardHorizontal.Price = PriceStyled
CardHorizontal.Tag = TagStyled
CardHorizontal.ExpireOn = ExpireOnStyled
CardHorizontal.Label = LabelStyled
CardHorizontal.ToolTip = ToolTipStyled
CardHorizontal.OverlayTrigger = OverlayTriggerStyled
CardHorizontal.Dropdown = DropdownStyled
CardHorizontal.Button = ButtonStyled
CardHorizontal.Footer = FooterStyled

export default CardHorizontal
