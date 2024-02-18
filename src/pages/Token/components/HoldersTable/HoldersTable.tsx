import { FC, useState, useCallback } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getPaginatedTokenHoldersList } from 'api'
import { Pagination } from 'ui/Pagination/Pagination'
import { shortenAddress } from 'utils/shortenAddress'
import * as S from './style'

// const TOTAL_PAGES_MOCK = 6

const ITEMS_ON_PAGE = 10

type HoldersTableProps = {
  totalSupply: number
  supplied: number
}

export const HoldersTable: FC<HoldersTableProps> = (props) => {
  const { supplied } = props

  const { id: tick } = useParams()

  const [currentPage, setCurrentPage] = useState<number>(1)

  const {
    data: holdersList,
    isLoading: isHoldersLoading,
    isSuccess: isHoldersLoaded,
  } = useQuery(
    ['holders-list', currentPage],
    () =>
      getPaginatedTokenHoldersList(tick as string, {
        count: ITEMS_ON_PAGE,
        offset: currentPage === 1 ? 0 : currentPage * ITEMS_ON_PAGE,
      }),
    {
      enabled: !!tick,
    }
  )

  const handleChangePage = useCallback((page: number) => {
    setCurrentPage(page + 1)
  }, [])

  return (
    <S.Wrapper>
      <S.Table>
        <S.RowHeader>
          <S.HeadLabel>Rank</S.HeadLabel>
          <S.HeadLabel>Address</S.HeadLabel>
          <S.HeadLabel>%</S.HeadLabel>
          <S.HeadLabel>Token Value</S.HeadLabel>
        </S.RowHeader>
        {isHoldersLoading && <S.Loader />}
        {isHoldersLoaded && (
          <div>
            {holdersList.results.map(({ balance, holder }, idx) => {
              const holderBalancePercent = ((balance / supplied) * 100).toFixed(
                2
              )

              const currentIndex = (currentPage - 1) * ITEMS_ON_PAGE + idx + 1

              return (
                <S.TableRow key={idx}>
                  <S.TableData>{currentIndex}</S.TableData>
                  <S.TableData>{shortenAddress(holder)}</S.TableData>
                  <S.TableData>{holderBalancePercent}</S.TableData>
                  <S.TableData>{balance}</S.TableData>
                </S.TableRow>
              )
            })}
          </div>
        )}
      </S.Table>

      {isHoldersLoaded && holdersList.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          onChange={handleChangePage}
          totalPages={holdersList.totalPages - 1}
        />
      )}
    </S.Wrapper>
  )
}
