import React from 'react'
import styled from 'styled-components'
import { Title, StepButtons, Select, Box, Input, Icon, Text, Grid, Cell, Checkbox } from 'components'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 20px;

  @media (max-width: 680px) {
    grid-row-gap: 15px;
  }
`

const SectionStyled = styled.div``

const GridStyled = styled(Grid)`
  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`

const PriceTab = props => {
  return (
    <WrapperStyled>
      <SectionStyled>
        <Title
          type="h3"
          title="Let your guests book right away"
          subtitle="Allow your guests to book instantly or ask them to send a request first."
          subTitleMargin="10px"
        />
      </SectionStyled>
      <SectionStyled>
        <Box borderBottom="1px solid #CBCBCB">
          <Icon name="category-venue" width="44px" />
          <Text verticalAlign="bottom">Event space</Text>
        </Box>
      </SectionStyled>
      <SectionStyled>
        <Box>
          <GridStyled columns={4}>
            <Cell width={1}>
              <Input placeholder="$" label="Hourly rate" />
            </Cell>
            <Cell width={1}>
              <Select label="Minimum hours">
                <option>Select</option>
              </Select>
            </Cell>
            <Cell width={1}>
              <Input placeholder="$" label="Full day rate" />
            </Cell>
            <Cell width={1}>
              <Input placeholder="$" label="Peak day rate" />
            </Cell>
          </GridStyled>
        </Box>
      </SectionStyled>
      <SectionStyled>
        <GridStyled columns={3}>
          <Cell width={1}>
            <Checkbox label="Price includes GST" />
          </Cell>
          <Cell width={2}>
            <Checkbox label="Show as starting price (From $x..)" checked />
          </Cell>
        </GridStyled>
      </SectionStyled>
      <br />
      <SectionStyled>
        <Box borderBottom="1px solid #CBCBCB">
          <Icon name="category-venue" width="44px" />
          <Text verticalAlign="bottom">Creative space</Text>
        </Box>
      </SectionStyled>
      <SectionStyled>
        <Box>
          <GridStyled columns={4}>
            <Cell width={1}>
              <Input placeholder="$" label="Hourly rate" />
            </Cell>
            <Cell width={1}>
              <Select label="Minimum hours">
                <option>Select</option>
              </Select>
            </Cell>
            <Cell width={1}>
              <Input placeholder="$" label="Full day rate" />
            </Cell>
            <Cell width={1}>
              <Input placeholder="$" label="Peak day rate" />
            </Cell>
          </GridStyled>
        </Box>
      </SectionStyled>
      <SectionStyled>
        <GridStyled columns={3}>
          <Cell width={1}>
            <Checkbox label="Price includes GST" />
          </Cell>
          <Cell width={2}>
            <Checkbox label="Show as starting price (From $x..)" checked />
          </Cell>
        </GridStyled>
      </SectionStyled>

      <StepButtons
        prev={{ disabled: false, onClick: () => props.history.replace('/listing-process/space/357/media') }}
        next={{
          onClick: () => props.history.replace('/listing-process/space/357/access')
        }}
      />
    </WrapperStyled>
  )
}

export default PriceTab
