import { palette } from '../foundational-styles'

export default {
  baseRadius: '37px',
  baseFontSize: '14px',
  fontSemibold: 600,
  size: {
    default: {
      width: '190px',
      height: '54px'
    },
    small: {
      width: '156px',
      height: '42px'
    },
    large: {
      width: '228px',
      height: '66px'
    }
  },
  default: {
    active: {
      backgroundColor: palette.default.primary,
      textColor: palette.default.white
    },
    inactive: {
      backgroundColor: palette.default.greyLight,
      textColor: palette.default.white
    },
    hover: {
      backgroundColor: palette.default.secondary,
      textColor: palette.default.white
    },
    focus: {
      backgroundColor: palette.default.tertiary,
      textColor: palette.default.white
    }
  },
  outline: {
    active: {
      backgroundColor: palette.default.white,
      textColor: palette.default.quartenary,
      borderColor: palette.default.quartenary
    },
    inactive: {
      backgroundColor: palette.default.white,
      textColor: palette.default.greyLight,
      borderColor: palette.default.greyLight
    },
    hover: {
      backgroundColor: palette.default.white,
      textColor: palette.default.primary,
      borderColor: palette.default.primary
    },
    focus: {
      backgroundColor: palette.default.primary,
      textColor: palette.default.white,
      borderColor: palette.default.primary
    }
  }
}
