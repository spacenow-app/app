import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Wrapper, Grid, Cell, Link, Title, Text, Box } from 'components'
import pin from './pin.png'
import facebook from './facebook.png'
import linedin from './linkedin.png'
import youtube from './youtube.png'
import twitter from './twitter.png'

const ImgStyled = styled.img``

const Footer = ({ value, disabled, ...props }) => {
  return (
    <Wrapper py="100px">
      <Grid columns={`repeat(5, auto)`} columnGap="20px">
        <Cell width={1}>
          <ImgStyled src={pin} width="70px" />
        </Cell>
        <Cell>
          <Grid columns={1} rows={5}>
            <Cell width={1} height={2}>
              <Title title="HOST" type="h6" noMargin />
            </Cell>
            <Cell width={1} height={1}>
              <Link to="#" color="#a7aebb">
                About hosting
              </Link>
            </Cell>
            <Cell width={1} height={1}>
              <Link to={`/listing/intro`} color="#a7aebb">
                List a space
              </Link>
            </Cell>
            <Cell width={1} height={1}>
              <Link to="https://spacenow.com/event-space-sydney/" color="#a7aebb">
                Request space
              </Link>
            </Cell>
          </Grid>
        </Cell>
        <Cell>
          <Grid columns={1} rows={5}>
            <Cell width={1} height={2}>
              <Title title="COMPANY" type="h6" noMargin />
            </Cell>
            <Cell width={1} height={1}>
              <Link to="https://spacenow.com/about/" color="#a7aebb">
                About
              </Link>
            </Cell>
            <Cell width={1} height={1}>
              <Link to="https://spacenow.com/help/" color="#a7aebb">
                FAQ'S
              </Link>
            </Cell>
            <Cell width={1} height={1}>
              <Link to="https://spacenow.com/contact-us/" color="#a7aebb">
                Contact us
              </Link>
            </Cell>
            <Cell width={1} height={1}>
              <Link to="https://spacenow.com/blog/" color="#a7aebb">
                Blog
              </Link>
            </Cell>
          </Grid>
        </Cell>
        <Cell>
          <Grid columns={1} rows={5}>
            <Cell width={1} height={2}>
              <Title title="FURTHER INFORMATION" type="h6" noMargin whiteSpace="nowrap" />
            </Cell>
            <Cell width={1} height={1}>
              <Link to="https://spacenow.com/terms-conditions/" color="#a7aebb">
                T&C'Ss
              </Link>
            </Cell>
            <Cell width={1} height={1}>
              <Link to="https://spacenow.com/privacy-policy/" color="#a7aebb">
                Privacy Policy
              </Link>
            </Cell>
            <Cell width={1} height={1}>
              <Link to="https://spacenow.com/licenceagreement/" color="#a7aebb">
                Licence Agreement
              </Link>
            </Cell>
          </Grid>
        </Cell>
        <Cell>
          <Grid columns={1} rows={5}>
            <Cell width={1} height={2}>
              <Title title="FOLLOW US" type="h6" noMargin />
            </Cell>
            <Cell width={1} height={1}>
              <Box>
                <Link>
                  <ImgStyled src={facebook} height="32px" />
                </Link>
              </Box>
            </Cell>
            <Cell width={1} height={1}></Cell>
            <Cell width={1} height={1}>
              <Text>Spacenow 2019</Text>
            </Cell>
          </Grid>
        </Cell>
      </Grid>
    </Wrapper>
  )
}

Footer.defaultProps = {}

Footer.propTypes = {}

export default Footer
