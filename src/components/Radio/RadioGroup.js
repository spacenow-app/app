import React from 'react'
import { Grid, Cell } from 'styled-css-grid'

const RadioGroup = ({ children }) => {
  return (
    <Grid columns="repeat(auto-fit,minmax(120px,1fr))" columnGap={20}>
      {children}
    </Grid>
  )
}

export default RadioGroup
