/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import PropTypes from 'prop-types'

const PUNCTUATION_LIST = ['.', ',', '!', '?', "'", '{', '}', '(', ')', '[', ']', '/']

const trimText = (text, min = 80, ideal = 100, max = 200) => {
  if (max < min || ideal > max || ideal < min) {
    throw new Error(
      'The minimum length must be less than the maximum, and the ideal must be between the minimum and maximum.'
    )
  }
  if (text.length < ideal) {
    return [text, '']
  }
  let pointerOne = ideal
  let pointerTwo = ideal
  let firstSpace
  let resultIdx
  const setSpace = idx => {
    if (spaceMatch(text[idx])) {
      firstSpace = firstSpace || idx
    }
  }
  while (pointerOne < max || pointerTwo > min) {
    if (checkMatch(pointerOne, text, max, min)) {
      resultIdx = pointerOne + 1
      break
    } else if (checkMatch(pointerTwo, text, max, min)) {
      resultIdx = pointerTwo + 1
      break
    } else {
      setSpace(pointerOne)
      setSpace(pointerTwo)
    }
    pointerOne += 1
    pointerTwo -= 1
  }
  if (resultIdx === undefined) {
    if (firstSpace && firstSpace >= min && firstSpace <= max) {
      resultIdx = firstSpace
    } else if (ideal - min < max - ideal) {
      resultIdx = min
    } else {
      resultIdx = max
    }
  }
  return [text.slice(0, resultIdx), text.slice(resultIdx).trim()]
}

const spaceMatch = character => {
  if (character === ' ') {
    return true
  }
  return false
}

const punctuationMatch = (idx, text) => {
  const punctuationIdx = PUNCTUATION_LIST.indexOf(text[idx])
  if (punctuationIdx >= 0 && spaceMatch(text[idx + 1])) {
    return true
  }
  return false
}

const checkMatch = (idx, text, max, min) => {
  if (idx < max && idx > min && punctuationMatch(idx, text)) {
    return true
  }
  return false
}

const swapLastPunctuation = value => {
  let text = value
  const lastCharIsPunctuation = PUNCTUATION_LIST.indexOf(text[text.length - 1])
  if (lastCharIsPunctuation >= 0) {
    text = `${text.substring(0, text.length - 1)}...`
  }
  return text
}

export default class ReadMoreComponent extends React.Component {
  constructor(props) {
    super(props)
    const args = [this.props.text, this.props.min, this.props.ideal, this.props.max]
    const [primaryText, secondaryText] = trimText(...args)
    this.state = { displaySecondary: false, primaryText, secondaryText, readMoreText: this.props.readMoreText }
  }

  setStatus() {
    const display = !this.state.displaySecondary
    this.setState({ displaySecondary: display })
  }

  render() {
    let displayText
    if (!this.state.secondaryText) {
      displayText = (
        <div className="display-text-group">
          <span className="displayed-text">{`${this.state.primaryText} ${this.state.secondaryText}`}</span>
        </div>
      )
    } else if (this.state.displaySecondary) {
      displayText = (
        <div className="display-text-group">
          <span className="displayed-text" onClick={this.setStatus.bind(this)}>
            {`${this.state.primaryText} ${this.state.secondaryText}`}
          </span>
        </div>
      )
    } else {
      displayText = (
        <div className="display-text-group">
          <span className="displayed-text">
            {swapLastPunctuation(this.state.primaryText)}
            <span style={{ display: 'none' }}>{this.state.secondaryText}</span>
            <br/>
            <div className="read-more-button" onClick={this.setStatus.bind(this)}>
              {this.state.readMoreText}
            </div>
          </span>
        </div>
      )
    }
    return displayText
  }
}

ReadMoreComponent.propTypes = {
  text: PropTypes.string.isRequired,
  min: PropTypes.number,
  ideal: PropTypes.number,
  max: PropTypes.number,
  readMoreText: PropTypes.string
}

ReadMoreComponent.defaultProps = {
  readMoreText: 'read more'
}
