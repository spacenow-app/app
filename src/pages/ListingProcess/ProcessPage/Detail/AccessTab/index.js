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

const AccessTab = props => {
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
        <GridStyled columns={3}>
          <Cell width={1}>
            <Select>
              <option>Select guest booking</option>
            </Select>
          </Cell>
        </GridStyled>
      </SectionStyled>
      <SectionStyled>
        <p>
          TIP: If you want to let a guest book any free date instantly, <br />
          select the instant option.
        </p>
      </SectionStyled>
      <SectionStyled>
        <Title type="h3" title="What time can guests check-in between?" />
      </SectionStyled>
      <SectionStyled>
        <GridStyled columns={3}>
          <Cell width={1}>
            <GridStyled columns={2}>
              <Cell width={1}>
                <Select label="From">
                  <option>Start:</option>
                </Select>
              </Cell>
              <Cell width={1}>
                <Select label="To">
                  <option>To:</option>
                </Select>
              </Cell>
            </GridStyled>
          </Cell>
        </GridStyled>
      </SectionStyled>
      <SectionStyled>
        <Title type="h3" title="What time do guests need to check-out?" />
      </SectionStyled>
      <SectionStyled>
        <GridStyled columns={3}>
          <Cell width={1}>
            <GridStyled columns={2}>
              <Cell width={1}>
                <Select label="Check-out:">
                  <option>Check-out:</option>
                </Select>
              </Cell>
            </GridStyled>
          </Cell>
        </GridStyled>
      </SectionStyled>
      <SectionStyled>
        <Title
          type="h3"
          title="Access information"
          subtitle="Select the way guests will gain access to your space."
          subTitleMargin="10px"
        />
      </SectionStyled>
      <SectionStyled>
        <GridStyled columns={3}>
          <Cell width={1}>
            <GridStyled columns={1}>
              <Cell width={1}>
                <Select>
                  <option>Select category type</option>
                </Select>
              </Cell>
            </GridStyled>
          </Cell>
        </GridStyled>
      </SectionStyled>
      <StepButtons
        prev={{ disabled: false, onClick: () => props.history.replace('/listing-process/space/357/price') }}
        next={{
          onClick: () => props.history.replace('/listing-process/space/357/timetable')
        }}
      />
    </WrapperStyled>
  )
}

export default AccessTab
