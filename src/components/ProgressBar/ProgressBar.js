import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Line } from 'rc-progress'
import { Text, Grid } from 'components'

const ContainerStyled = styled.div``

const ProgressBar = ({ percent, stepNumber, stepName, ...props }) => {
  return (
    <ContainerStyled {...props}>
      {/* <Grid columns="1fr auto" alignItems="center" columnGap="30px"> */}
      <Line percent={percent} strokeColor="#6adc91" />
      {/* {stepNumber && stepName && <Text float="right">{`Step ${stepNumber}. ${stepName} `}</Text>} */}
      {/* </Grid> */}
      <Text>{`${percent}% completed`}</Text>
    </ContainerStyled>
  )
}

ProgressBar.defaultProps = {
  percent: '5'
}

ProgressBar.propTypes = {
  percent: PropTypes.string,
  stepNumber: PropTypes.string,
  stepName: PropTypes.string
}

export default ProgressBar
