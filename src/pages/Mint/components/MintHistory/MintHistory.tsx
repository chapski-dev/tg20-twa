import React, { useState } from 'react'
import { Container } from 'ui/Container/Container'
import { Pagination } from 'ui/Pagination/Pagination'
import * as S from './MintHistory.style'

const ITEMS_ON_PAGE = 10

export const MintHistory = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const handleChangePage = (page: number) => setCurrentPage(page + 1);

  return (
    <>
      <S.Wrapper>
        <Container>
          <S.Header children="Mint History"/>
        </Container>
        <S.TableRow>
          <S.TableCell children="Repeat" />
          <S.TableCell children="TXN" />
          <S.TableCell children="Status" />
          <S.TableCell children="Token Value" />
        </S.TableRow>
        {hisotyData.map((el, i) => (
          <S.TableRow $even={i % 2 === 0} >
            <S.TableCell children={el.repeat_times} />
            <S.TableCell children={el.txn} />
            <S.TableCell children={el.status} $status={el.status as any} />
            <S.TableCell children={el.token_value} />
          </S.TableRow>
        ))}
      <S.PaginationContainer>
        {hisotyData.length / ITEMS_ON_PAGE > 1 && (
          <Pagination
            currentPage={currentPage}
            onChange={handleChangePage}
            totalPages={hisotyData.length / ITEMS_ON_PAGE}
          />
        )}
      </S.PaginationContainer>
      </S.Wrapper>
    </>
  )
}
const hisotyData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, i) => ({
  repeat_times: 1,
  txn: '32e8..d6f1',
  status: i % 2 === 0 ? 'success' : i % 5 === 0 ? "faild" : "pending",
  token_value: 11521776,
}))
