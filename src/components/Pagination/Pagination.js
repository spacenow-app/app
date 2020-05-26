import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Pagination as PaginationImported } from 'react-bootstrap'
import _ from 'lodash'

const LEFT_PAGE = 'LEFT'
const RIGHT_PAGE = 'RIGHT'

const PaginationStyled = styled(PaginationImported)``

const PaginationItem = styled(PaginationImported.Item)`
  &&& {
    .page-link {
      margin-left: 0;
      color: #1c3942;
      background-color: #fff;
      border: none;
      width: 45px;
      height: 45px;
      align-items: center;
      justify-content: center;
      display: flex;

      ${props =>
        props.active &&
        css`
          z-index: 1;
          color: #fff;
          background-color: #6adc91;
          border-color: #6adc91;
          border-radius: 50%;
        `}
      :hover {
        z-index: 1;
        ${props =>
          !props.active &&
          css`
            color: #6adc91;
          `}
        border-radius: 50%;
      }
      :focus {
        z-index: 2;
        outline: none;
        box-shadow: none;
      }
    }
  }
`

const PaginationPrev = styled(PaginationImported.Prev)`
  &&& {
    .page-link {
      margin-left: 0;
      color: #6adc91;
      background-color: #fff;
      border: none;
      width: 45px;
      height: 45px;
      align-items: center;
      justify-content: center;
      display: flex;

      span {
        font-size: 25px;
      }

      :focus {
        z-index: 2;
        outline: none;
        box-shadow: none;
      }
    }
  }
`

const PaginationNext = styled(PaginationImported.Next)`
  &&& {
    .page-link {
      margin-left: 0;
      color: #6adc91;
      background-color: #fff;
      border: none;
      width: 45px;
      height: 45px;
      align-items: center;
      justify-content: center;
      display: flex;

      span {
        font-size: 25px;
      }

      :focus {
        z-index: 2;
        outline: none;
        box-shadow: none;
      }
    }
  }
`

const Pagination = ({
  totalRecords,
  totalPages,
  pageNeighbours,
  pageLimit,
  onPageChanged,
  pageIndex = null,
  ...props
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageNeighbour = Math.max(0, Math.min(pageNeighbours, 2))

  useEffect(() => {
    setCurrentPage(pageIndex + 1)
  }, [pageIndex])

  if (!totalRecords || totalPages === 1) return null

  const gotoPage = page => {
    setCurrentPage(page)
    onPageChanged(page)
  }

  const handleClick = page => e => {
    e.preventDefault()
    gotoPage(page)
  }

  const handleMoveLeft = e => {
    e.preventDefault()
    gotoPage(currentPage - 1)
  }

  const handleMoveRight = e => {
    e.preventDefault()
    gotoPage(currentPage + 1)
  }

  const fetchPageNumbers = () => {
    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = pageNeighbour * 2 + 3
    const totalBlocks = totalNumbers + 2

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbour)
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbour)
      let pages = _.range(startPage, endPage + 1)

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2
      const hasRightSpill = totalPages - endPage > 1
      const spillOffset = totalNumbers - (pages.length + 1)

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = _.range(startPage - spillOffset, startPage)
          pages = [LEFT_PAGE, ...extraPages, ...pages]
          break
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = _.range(endPage + 1, endPage + spillOffset)
          pages = [...pages, ...extraPages, RIGHT_PAGE]
          break
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
          break
        }
      }

      return [1, ...pages, totalPages]
    }

    return _.range(1, totalPages + 1)
  }

  const pages = fetchPageNumbers()

  return (
    <PaginationStyled {...props}>
      {pages.map(page => {
        if (page === LEFT_PAGE) {
          return <PaginationPrev key={page} onClick={handleMoveLeft} />
        }
        if (page === RIGHT_PAGE) {
          return <PaginationNext key={page} onClick={handleMoveRight} />
        }
        return (
          <PaginationItem key={page} active={currentPage === page} onClick={handleClick(page)}>
            {page}
          </PaginationItem>
        )
      })}
    </PaginationStyled>
  )
}

Pagination.defaultProps = {
  pageLimit: 10,
  pageNeighbours: 2
}

Pagination.propTypes = {
  children: PropTypes.element
}

export default Pagination
