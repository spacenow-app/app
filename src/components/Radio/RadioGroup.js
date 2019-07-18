import React from 'react'
import { Grid } from 'components'

const RadioGroup = ({ children }) => {
  return (
    <Grid columns="repeat(auto-fit,minmax(120px,1fr))" columnGap={20}>
      {children}
    </Grid>
  )
}

export default RadioGroup
