import ReactPaginate from 'react-paginate'
import styled from 'styled-components'

export const Paginate = styled(ReactPaginate).attrs({
  // You can redefine classes here, if you want.
  activeClassName: 'active', // default to "selected"
})`
  /* margin-bottom: 2rem; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  margin: 0;
  padding: 0;
  /* max-width: 250px; */
  height: 28px;
  margin: 0 auto;
  gap: 5px;

  li a {
    border-radius: 7px;
    padding: 6px 10px;
    background-color: ${({ theme }) => theme.color.bgSecondary};
    border: solid 1px solid ${({ theme }) => theme.color.hint};
    color: ${({ theme }) => theme.color.text};
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: ${({ theme }) => theme.color.btn};
    border-color: transparent;
    color: ${({ theme }) => theme.color.btnText};
    min-width: 32px;
  }
  li.disabled a {
    color: ${({ theme }) => theme.color.hint};
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }

  .previous,
  .next {
    a {
      background: transparent;
      color: ${({ theme }) => theme.color.text};
    }
  }

  .break {
    color: ${({ theme }) => theme.color.hint};
  }
`
