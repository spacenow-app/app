import React from 'react'
import styled from 'styled-components'
import { Box, Grid, Cell, Link, Title, Text } from 'components'
import pin from './pin.png'
import facebook from './facebook.png'
import linkedin from './linkedin.png'
import youtube from './youtube.png'
import twitter from './twitter.png'

const ImgStyled = styled.img``
const GridStyled = styled(Grid)`
  @media only screen and (max-width: 991px) {
    grid-template-columns: repeat(3, auto);
  }

  @media only screen and (max-width: 640px) {
    grid-template-columns: repeat(1, auto);
    justify-content: center;
    & * {
      text-align: center;
    }
  }
`

const AStyled = styled.a`
  color: #a7aebb;

  :hover {
    text-decoration: none;
    color: #a7aebb;
  }
`

const Footer = ({ value, disabled, ...props }) => {
  return (
    <Box py="80px">
      <GridStyled columns={`repeat(5, auto)`} columnGap="20px" rowGap="60px">
        <Cell width={1}>
          <ImgStyled src={pin} width="70px" />
        </Cell>
        <Cell>
          <Grid columns={1} rows={5}>
            <Cell width={1} height={2}>
              <Title title="HOST" type="h6" noMargin />
            </Cell>
            <Cell width={1} height={1}>
              <AStyled href="#">About hosting</AStyled>
            </Cell>
            <Cell width={1} height={1}>
              <Link to={`/listing/intro`} color="#a7aebb">
                List a space
              </Link>
            </Cell>
            <Cell width={1} height={1}>
              <AStyled href="https://spacenow.com/event-space-sydney/">Request space</AStyled>
            </Cell>
          </Grid>
        </Cell>
        <Cell>
          <Grid columns={1} rows={5}>
            <Cell width={1} height={2}>
              <Title title="COMPANY" type="h6" noMargin />
            </Cell>
            <Cell width={1} height={1}>
              <AStyled href="https://spacenow.com/about/">About</AStyled>
            </Cell>
            <Cell width={1} height={1}>
              <AStyled href="https://spacenow.com/help/">FAQ'S</AStyled>
            </Cell>
            <Cell width={1} height={1}>
              <AStyled href="https://spacenow.com/contact-us/">Contact us</AStyled>
            </Cell>
            <Cell width={1} height={1}>
              <AStyled href="https://spacenow.com/blog/">Blog</AStyled>
            </Cell>
          </Grid>
        </Cell>
        <Cell>
          <Grid columns={1} rows={5}>
            <Cell width={1} height={2}>
              <Title title="FURTHER INFORMATION" type="h6" noMargin whiteSpace="nowrap" />
            </Cell>
            <Cell width={1} height={1}>
              <AStyled href="https://spacenow.com/terms-conditions/">T&C'Ss</AStyled>
            </Cell>
            <Cell width={1} height={1}>
              <AStyled href="https://spacenow.com/privacy-policy/">Privacy Policy</AStyled>
            </Cell>
            <Cell width={1} height={1}>
              <AStyled href="https://spacenow.com/licenceagreement/">Licence Agreement</AStyled>
            </Cell>
          </Grid>
        </Cell>
        <Cell>
          <Grid columns={1} rows={5}>
            <Cell width={1} height={2}>
              <Title title="FOLLOW US" type="h6" noMargin />
            </Cell>
            <Cell width={1} height={1}>
              <Grid columns={`repeat(4, auto)`}>
                <Cell>
                  <AStyled href="https://www.facebook.com/spacenowaustralia/">
                    <ImgStyled src={facebook} height="32px" />
                  </AStyled>
                </Cell>
                <Cell>
                  <AStyled href="https://www.linkedin.com/company/spacenow/">
                    <ImgStyled src={linkedin} height="32px" />
                  </AStyled>
                </Cell>
                <Cell>
                  <AStyled href="https://www.youtube.com/channel/UCIq-FZwLqPS81bASw2EksTA">
                    <ImgStyled src={youtube} height="32px" />
                  </AStyled>
                </Cell>
                <Cell>
                  <AStyled href="https://twitter.com/spacenow_aus">
                    <ImgStyled src={twitter} height="32px" />
                  </AStyled>
                </Cell>
              </Grid>
            </Cell>
            <Cell width={1} height={1}></Cell>
            <Cell width={1} height={1}>
              <Text color="#707070">©Spacenow 2019</Text>
            </Cell>
          </Grid>
        </Cell>
      </GridStyled>
    </Box>
  )
}

Footer.defaultProps = {}

Footer.propTypes = {}

export default Footer
