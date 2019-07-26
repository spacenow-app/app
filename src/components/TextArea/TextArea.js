import styled from 'styled-components'

const TextAreaStyled = styled.textarea`
  font-family: 'Montserrat-Regular';
  font-size: 14px;
  color: #646464;
  padding: 20px;
  width: 100%;
  min-height: 150px;
  border-radius: 15px;
  border: 1px solid #e2e2e2;

  :focus {
    outline: 0px;
    box-shadow: 0 0 0 0.2rem rgba(106, 220, 145, 0.5);
    border-color: #6adc91;
  }
`

export default TextAreaStyled
