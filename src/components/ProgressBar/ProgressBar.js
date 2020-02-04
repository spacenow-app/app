import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Line } from 'rc-progress'
import { Text } from 'components'

const ContainerStyled = styled.div`
  margin-bottom: 35px;

  @media (max-width: 680px) {
    margin-bottom: 15px;
  }
`

const ProgressBar = ({ percent, stepNumber, stepName, ...props }) => {
  return (
    <ContainerStyled {...props}>
      <Line percent={percent} strokeColor="#6adc91" />
      <Text>{`${percent}% completed`}</Text>
    </ContainerStyled>
  )
}

ProgressBar.defaultProps = {
  percent: 0
}

ProgressBar.propTypes = {
  percent: PropTypes.number,
  stepNumber: PropTypes.string,
  stepName: PropTypes.string
}

export default ProgressBar
