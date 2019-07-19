import React from 'react'
import styled from 'styled-components'
import Carousel from 'react-images'
import { Wrapper, Title, Grid, Cell, TimeTable, Map, Tag, Box, Icon, Highlights } from 'components'

import GraphCancelattionImage from 'pages/Listing/SpacePage/CancellationTab/graph_cancellation.png'

const ImageStyled = styled.img`
  width: 100%;
`

const images = [
  {
    source:
      'https://images.unsplash.com/photo-1558981420-87aa9dad1c89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80'
  },
  {
    source:
      'https://images.unsplash.com/photo-1563387852576-964bc31b73af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2582&q=80'
  },
  {
    source:
      'https://images.unsplash.com/photo-1563387920443-6f3171e4793b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80'
  }
]

const timeTable = [
  {
    weekday: 1,
    allday: true,
    openHour: `${new Date()}`,
    closeHour: `${new Date()}`
  },
  {
    weekday: 2,
    allday: false,
    openHour: `${new Date()}`,
    closeHour: `${new Date()}`
  },
  {
    weekday: 3,
    allday: false,
    openHour: `${new Date()}`,
    closeHour: `${new Date()}`
  },

  {
    weekday: 5,
    allday: false,
    openHour: `${new Date()}`,
    closeHour: `${new Date()}`
  },

  {
    weekday: 7,
    allday: false,
    openHour: `${new Date()}`,
    closeHour: `${new Date()}`
  }
]

const PreviewPage = () => {
  return (
    <Wrapper>
      <Title type="h2" title="Just one more thing, review your space!" />
      <Carousel
        views={images}
        currentIndex={0}
        styles={{
          container: base => ({
            ...base,
            backgroundColor: '#fafafa',
            borderRadius: '15px'
          }),
          view: () => ({
            height: 500,
            width: '100%',
            borderRadius: '15px',
            '& > img': {
              borderRadius: '15px'
            }
          })
        }}
        components={{
          Footer: null
        }}
      />
      <Box my="40px">
        <Grid justifyContent="space-between" columnGap="10px" columns={2}>
          <Grid justifyContent="start" columns="160px 160px">
            <Cell>
              <Tag icon={<Icon name="category-coworking" />}>Category</Tag>
            </Cell>
            <Cell>
              <Tag icon={<Icon name="sub-category-business" />}>Sub Category</Tag>
            </Cell>
          </Grid>
          <Cell style={{ justifySelf: 'end' }}>
            <Tag>Type Booking</Tag>
          </Cell>
        </Grid>
      </Box>
      <Grid columns={4}>
        <Cell width={3}>
          <Title
            type="h3"
            title="Desk 01 - Alexandria Office Headquarters"
            subtitle="Sydney, Australia"
            subTitleSize={18}
            noMargin
          />
        </Cell>
        <Cell width={1} center>
          <Title type="h4" title="$100.00 Daily" noMargin right style={{ marginTop: '5px' }} />
        </Cell>
      </Grid>
      <Title type="h4" title="Highlights" />
      <Grid columns={5}>
        <Highlights title="Minimum term" name="3 days" icon="category-desk" />
        <Highlights title="Opening Days" name="Weekdays" icon="category-desk" />
        <Highlights title="Capacity" name="1 person" icon="category-desk" />
        <Highlights title="Size" name="120 sqm" icon="category-desk" />
        <Highlights title="Car Space" name="2 Uncovered" icon="category-desk" last />
      </Grid>

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
      <TimeTable data={timeTable} />

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
