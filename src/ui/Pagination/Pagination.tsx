import { FC } from 'react'
import * as S from './style'

type PaginationProps = {
  onChange: (page: number) => void
  currentPage: number
  totalPages: number
}

export const Pagination: FC<PaginationProps> = (props) => {
  const { onChange, currentPage, totalPages } = props

  return (
    <S.Paginate
      forcePage={currentPage - 1}
      marginPagesDisplayed={1}
      nextLabel="Next"
      onPageChange={({ selected }) => onChange(selected)}
      pageCount={totalPages}
      pageRangeDisplayed={1}
      previousLabel="Prev"
    />

  )
}
