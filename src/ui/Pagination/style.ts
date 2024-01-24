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
  gap: 10px;

  li a {
    border-radius: 7px;
    padding: 4px 10px;
    background-color: ${({ theme }) => theme.color.bg};
    color: ${({ theme }) => theme.color.hint};
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
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }

  .previous,
  .next {
    display: none;
  }

  .break {
    color: ${({ theme }) => theme.color.hint};
  }
`
