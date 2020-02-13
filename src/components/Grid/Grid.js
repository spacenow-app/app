import PropTypes from 'prop-types'
import styled from 'styled-components'

const autoRows = ({ minRowHeight = '20px' }) => `minmax(${minRowHeight}, auto)`

const frGetter = value => (typeof value === 'number' ? `repeat(${value}, 1fr)` : value)

const gapValue = ({ gap = '8px' }) => gap

const flowValue = ({ flow = 'row' }) => flow

const formatAreas = areas => areas.map(area => `"${area}"`).join(' ')

const Grid = styled.div`
  display: grid;
  height: ${({ height = 'auto' }) => height};
  grid-auto-flow: ${flowValue};
  grid-auto-rows: ${autoRows};
  ${({ rows }) => rows && `grid-template-rows: ${frGetter(rows)}`};
  grid-template-columns: ${({ columns }) => frGetter(columns)};
  grid-gap: ${gapValue};
  ${({ alignSelf }) => alignSelf && `align-self: ${alignSelf}`};
  ${({ columnGap }) => columnGap && `column-gap: ${columnGap}`};
  ${({ rowGap }) => rowGap && `row-gap: ${rowGap}`};
  ${({ areas }) => areas && `grid-template-areas: ${formatAreas(areas)}`};
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent}`};
  ${({ alignContent }) => alignContent && `align-content: ${alignContent}`};
  ${({ alignItems }) => alignItems && `align-items: ${alignItems}`};
`

Grid.defaultProps = {
  columns: 12
}

Grid.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gap: PropTypes.string,
  columnGap: PropTypes.string,
  rowGap: PropTypes.string,
  height: PropTypes.string,
  minRowHeight: PropTypes.string,
  flow: PropTypes.string,
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  areas: PropTypes.arrayOf(PropTypes.string),
  justifyContent: PropTypes.string,
  alignContent: PropTypes.string,
  alignSelf: PropTypes.string,
  alignItems: PropTypes.string
}

export default Grid
