import React from 'react'
import styled from 'styled-components'
import { Title, StepButtons, Input, TextArea, Checkbox, Grid, Cell, Select } from 'components'

const DetailTab = props => {
  return (
    <>
      <StepButtons
        prev={{ disabled: false, onClick: () => props.history.replace('/listing-process/space/357/feature') }}
        next={{
          // disabled: !location,
          onClick: () => props.history.replace('/listing-process/space/357/amenities')
          // isLoading: isLoadingCreating
        }}
      />
    </>
  )
}

export default DetailTab
