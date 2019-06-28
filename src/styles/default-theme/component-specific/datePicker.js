import { palette } from '../foundational-styles'

export default {
  inputBackgroundColor: palette.greyscale.four,
  inputTextColor: palette.default.quartenary,
  hover: {
    backgroundColor: palette.default.primary,
    textColor: palette.default.white
  },
  active: {
    backgroundColor: palette.default.secondary,
    textColor: palette.default.white
  },
  selected: {
    backgroundColor: palette.default.primary,
    textColor: palette.default.white,
    borderColor: palette.default.primary
  }
}
