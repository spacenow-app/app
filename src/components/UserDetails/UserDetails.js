import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'components/Link'
import Avatar from '../Avatar'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 10px;
`

const TopStyled = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 15px;
  align-items: center;
  @media (max-width: 680px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    text-align: center;
  }
`

const UserContainer = styled.div`
  line-height: 30px;
`

const BottomStyled = styled.div`
  font-family: 'Montserrat-SemiBold';
  line-height: 25px;
  margin-top: 10px;
  @media (max-width: 680px) {
    text-align: center;
  }
`

const TextDefaultStyled = styled.span`
  display: block;
  color: #1c3942;
`

const TextName = styled(TextDefaultStyled)`
  font-family: Montserrat-Bold;
  font-size: 18px;
  line-height: 28px;
`

const TextCity = styled(TextDefaultStyled)`
  color: #707070;
`

const TextClaim = styled(Link)`
  font-size: 11px;
  color: #172439;
  text-decoration: underline;

  :hover {
    color: #172439;
    text-decoration: underline;
  }
`

const TextJoined = styled(TextDefaultStyled)`
  color: #172439;
  font-size: 10px;
`

const TextBottom = styled.span`
  color: #172439;
  font-size: 12px;
`

const TextTitleClaim = styled(TextDefaultStyled)`
  line-height: 0.5;
  margin-top: 10px;
`

const UserDetails = props => (
  <WrapperStyled>
    <TopStyled>
      <Avatar small image={props.imageProfile} />
      <UserContainer>
        {props.provider !== 'generic' && <TextName>{props.hostname}</TextName>}
        {props.address && props.provider !== 'generic' && <TextCity>{props.address}</TextCity>}
        {props.provider === 'generic' && <TextTitleClaim>Is this your space?</TextTitleClaim>}
        {props.provider === 'generic' && (
          <TextClaim to="#" onClick={props.onClaim}>
            Click here to claim
          </TextClaim>
        )}
      </UserContainer>
    </TopStyled>
    {props.joined && (
      <BottomStyled>
        <TextJoined>{`Joined in ${props.joined}`}</TextJoined>
      </BottomStyled>
    )}
    {props.text && <TextBottom>{props.text}</TextBottom>}
  </WrapperStyled>
)

UserDetails.defaultProps = {
  imageProfile: null,
  provider: 'spacenow'
}

UserDetails.propTypes = {
  hostname: PropTypes.string.isRequired,
  address: PropTypes.string,
  joined: PropTypes.string,
  imageProfile: PropTypes.string,
  text: PropTypes.string,
  provider: PropTypes.string,
  onClaim: PropTypes.func,
  right: PropTypes.bool
}

export default UserDetails
