import React from 'react'
import styled from 'styled-components'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'

import Title from 'components/Title'
import Tag from 'components/Tag'
import Image from 'components/Image'
import Label from 'components/Label'
import Button from 'components/Button'
import Dropdown from 'components/Dropdown'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 250px auto auto;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    'image body body'
    'image footer footer';
  grid-column-gap: 20px;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  max-height: 200px;
  box-shadow: rgb(203, 203, 203) 5px 5px 10px 0px;
  transition: box-shadow ease 0.3s;
  &&: hover {
    box-shadow: rgb(203, 203, 203) 10px 10px 20px 0px;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'image'
      'body'
      'footer';
    max-height: fit-content;
  }
`

const ImageStyled = styled(Image)`
  grid-area: image;
  @media (max-width: 576px) {
    width: 100%;

    > svg {
      width: 100%;
    }
  }
`

const BodyStyled = styled.div`
  grid-area: body;
  display: grid;
  padding: 20px 10px 0 10px;

  grid-auto-flow: row;
`

const TitleStyled = styled(Title)``

const PriceStyled = styled(Title)``

const TagStyled = styled(Tag)``

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
  font-size: 12px;
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
  grid-gap: inherit;
  width: 100%;
  @media (max-width: 576px) {
    grid-auto-flow: column;
    padding: 10px 20px 20px 10px;
    grid-gap: 5px;
  }
`

const DropdownStyled = styled(Dropdown)`
  grid-area: body;
  justify-self: end;
  padding: 20px 20px 0 0;

  &&& button {
    background: transparent;
    border: 1px solid #6adc91;
    color: #6adc91;
    > span {
      color: #6adc91;
    }
  }

  &&&.show button {
    background: transparent;
    border: 1px solid #6adc91;
    color: #6adc91;
    > span {
      color: #6adc91;
    }
  }

  &&&:hover button,
  &&&:focus button,
  &&&:active button {
    background-color: transparent;
  }

  > button {
    padding: 5px 15px;
  }
`

const ToolTipStyled = styled(Tooltip)``

const CardHorizontal = ({ ...props }) => {
  return <Wrapper {...props}>{props.children}</Wrapper>
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
