import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
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
  color: #707070v;
`

const TextJoined = styled(TextDefaultStyled)`
  color: #172439;
  font-size: 10px;
`

const TextBottom = styled.span`
  color: #172439;
  font-size: 12px;
`

const UserDetails = props => (
  <WrapperStyled>
    <TopStyled>
      <Avatar small image={props.imageProfile} />
      <UserContainer>
        <TextName>{props.hostname}</TextName>
        {props.address && <TextCity>{props.address}</TextCity>}
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
  imageProfile: null
}

UserDetails.propTypes = {
  hostname: PropTypes.string.isRequired,
  address: PropTypes.string,
  joined: PropTypes.string,
  imageProfile: PropTypes.string,
  text: PropTypes.string
}

export default UserDetails
