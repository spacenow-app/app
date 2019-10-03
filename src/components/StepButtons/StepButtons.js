import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from 'components'

const Footer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  margin: 50px 0;

  @media (max-width: 680px) {
    margin: 20px 0;
  }
`
const Left = styled.div`
  justify-self: start;
`

const Right = styled.div`
  justify-self: end;
`

const StepButtons = ({ prev, next }) => {
  return (
    <Footer>
      <Left>
        {prev && (
          <Button outline disabled={prev.disabled} onClick={prev.onClick} isLoading={prev.isLoading}>
            {prev.title ? prev.title : 'Previous Step'}
          </Button>
        )}
      </Left>
      <Right>
        {next && (
          <Button disabled={next.disabled} onClick={next.onClick} isLoading={next.isLoading}>
            {next.title ? next.title : 'Next Step'}
          </Button>
        )}
      </Right>
    </Footer>
  )
}

StepButtons.propTypes = {
  prev: PropTypes.shape({
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    title: PropTypes.string,
    isLoading: PropTypes.bool
  }),
  next: PropTypes.shape({
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    title: PropTypes.string,
    isLoading: PropTypes.bool
  })
}

export default StepButtons
