import React, { useState } from 'react'
import { Wrapper, Box, Title, StepButtons, Radio } from 'components'

const SpaceTypePage = ({ listing, ...props }) => {
  const [ckPropertType, setCkPropertyType] = useState(listing.listingData.listingType)

  const _handleRadioChange = (e, { value, name, disabled }) => {
    if (disabled) return
    setCkPropertyType(value)
    const listingData = {
      listingType: value
    }
    props.setFatherValues({ listingData: { ...listing.listingData, ...listingData } })
  }

  return (
    <Wrapper>
      <Box display="grid" gridGap="30px">
        <Title type="h3" title="Property type" subtitle="Which best describes your space?" subTitleMargin={10} />
        <Box display="grid" gridTemplateColumns={{ _: 'auto 1fr' }} gridGap="10px">
          <Radio
            value="Established space or business"
            checked={ckPropertType === 'Established space or business'}
            handleChange={_handleRadioChange}
          />
          <Title
            type="h6"
            title="Established space or business"
            subtitle="The space has managed bookings and systems in place for hire and extras like catering."
            subTitleMargin={12}
            mediumBold
            noMargin
          />
        </Box>
        <Box display="grid" gridTemplateColumns={{ _: 'auto 1fr' }} gridGap="10px">
          <Radio
            value="Private property"
            checked={ckPropertType === 'Private property'}
            handleChange={_handleRadioChange}
          />
          <Title
            type="h6"
            title="Private property"
            subtitle="The space is privately owned but is perfect for people to hire and use for events or creative uses like location shoots or production companies to hire."
            subTitleMargin={12}
            mediumBold
            noMargin
          />
        </Box>
        <Box display="grid" gridTemplateColumns={{ _: 'auto 1fr' }} gridGap="10px">
          <Radio
            value="Shared or sublet"
            checked={ckPropertType === 'Shared or sublet'}
            handleChange={_handleRadioChange}
          />
          <Title
            type="h6"
            title="Shared or sublet"
            subtitle="You have a lease on the space and wish to share or sublease."
            subTitleMargin={12}
            mediumBold
            noMargin
          />
        </Box>
      </Box>
      <StepButtons
        prev={{
          disabled: false,
          onClick: () => props.history.push(`/listing-process/setup-process/${listing.id}/location`)
        }}
        next={{
          // disabled: !location,
          onClick: () => props.history.push('category')
          // isLoading: isLoadingCreating
        }}
      />
    </Wrapper>
  )
}

export default SpaceTypePage
