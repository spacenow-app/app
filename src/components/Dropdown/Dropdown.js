import styled from 'styled-components'
import { Dropdown as DropdownExternal } from 'react-bootstrap'

const Dropdown = styled(DropdownExternal)`
  &&&.show button {
    background-color: #6ADC91;
  }
  > div {
    border-radius: 10px;
  }  

  & button {
    background-color: #6ADC91;
    border: none;
    border-radius: 30px;
    display: flex;
    padding: 10px 25px;

    &::after {
      margin-top: 7px;
    }

    & span {
      color: #ffffff;
    }
  }
  &&&:hover button, &&&:focus button, &&&:active button {
    background-color: #6ADC91;
  }
  & a {
    font-size: 14px;
  }
`

export default Dropdown