import React from 'react'
import styled from 'styled-components'
import { Wrapper, Title, Grid, Cell, TimeTable, Map } from 'components'

import GraphCancelattionImage from 'pages/Listing/SpacePage/CancellationTab/graph_cancellation.png'

const Slider = styled.div`
  height: 550px;
  width: 100%;
  border: 1px solid;
`

const ImageStyled = styled.img`
  width: 100%;
`

const PreviewPage = () => {
  return (
    <Wrapper>
      <Title type="h2" title="Just one more thing, review your space!" />
      <Slider />
      <div>
        <div>Category</div>
        <div>Sub Category</div>
        <div>Type Booking</div>
      </div>
      <Title type="h3" title="Desk 01 - Alexandria Office Headquarters" subtitle="Sydney, Australia" />
      <span>$100.00 Daily</span>
      <Title type="h4" title="Highlights" />

      <Title type="h4" title="Access Information" />

      <Title type="h4" title="Description" />
      <p>
        Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
        dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper
        suscipit lobortis nisl ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, cons ectetuer adipiscing
        elit, sed diam nonummy nibh euismod
      </p>
      <Title type="h4" title="Amenities" subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />

      <Title type="h4" title="Space Rules" subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elite" />

      <Title type="h4" title="Availability" />
      <TimeTable />

      <Title type="h4" title="Location" />
      <Map />

      <Grid columns={1}>
        <Cell>
          <Title type="h4" title="Cancellation Policy" />
        </Cell>
        <Cell>
          <Grid columns={12}>
            <Cell width={4}>
              <Title
                noMargin
                type="h4"
                title="No Cancellation"
                subTitleSize={16}
                subtitle="Guest cannot cancel their booking. Note: This may affect the number of bookings received."
              />
            </Cell>
            <Cell width={8}>
              <ImageStyled alt="Cancellation Policy" src={GraphCancelattionImage} />
            </Cell>
          </Grid>
        </Cell>
      </Grid>
    </Wrapper>
  )
}

export default PreviewPage
