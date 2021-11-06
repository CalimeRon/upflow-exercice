import React, { useEffect, useState } from 'react';
import AdminDeleteBtn from '../../components/AdminDeleteBtn/AdminDeleteBtn';
import Loader from '../../components/Loader/Loader';
import NewRowElement from '../../components/NewRowElement/NewRowElement';
import PopulateBtn from '../../components/Populatebtn/PopulateBtn';
import RowElement from '../../components/RowElement/RowElement';
import TableDropdown from '../../components/TableDropdown/TableDropdown';
import TableNavigation from '../../components/TableNavigation/TableNavigation';
import { getCount, getTable } from '../../services/apiServices';
import { dropdownValues, tableLimit } from '../../shared/constants';
import { Row, SortState } from '../../shared/types';
import styles from './TableContainer.module.scss';

const TableContainer = (): JSX.Element => {
  const [data, setData] = useState<Required<Row>[]>([]);
  const [sortState, setSortState] = useState<SortState>({
    column: 'id',
    direction: 'ASC',
  });
  const [page, setPage] = useState(1);
  const [displayCount, setDisplayCount] = useState(dropdownValues[2]);
  const [dbCount, setDbCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const maxPage = Math.max(Math.ceil(dbCount / displayCount), 1);

  useEffect(() => {
    const apiCountCall = async () => {
      const totalCount = await getCount();
      setDbCount(totalCount);
    };
    apiCountCall();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const apiTableCall = async () => {
      const response = await getTable(tableLimit, offset * tableLimit, sortState);
      setData(response);
      setIsLoading(false);
    };
    apiTableCall();
  }, [offset, sortState, dbCount]);

  useEffect(() => {
    checkOffset(page);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const distributeRows = data.map((row, index) => {
    const rowRank = index + offset * 100 + 1;
    const lowLimit = displayCount * (page - 1);
    const highLimit = displayCount * page;
    return rowRank <= highLimit && rowRank > lowLimit ? (
      <RowElement key={index} rowKey={index} rowElement={row} data={data} setData={setData} />
    ) : null;
  });

  const sortTable = (column: keyof Row): void => {
    column === sortState.column
      ? setSortState({ column: column, direction: sortState.direction === 'ASC' ? 'DESC' : 'ASC' })
      : setSortState({
          column: column,
          direction: 'ASC',
        });
  };

  const checkOffset = (page: number): void => {
    const newOffset = Math.floor(((page - 1) * displayCount) / tableLimit);
    if (newOffset !== offset) setOffset(newOffset);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={styles.tableElement}>
          <caption className={styles.caption}>Downflow Table</caption>
          <thead className={styles.headersContainer}>
            <tr>
              <th
                className={`${styles.idColumn}`}
                data-testid='sortId'
                onClick={() => sortTable('id')}
              >
                {sortState.column === 'id' ? (sortState.direction === 'ASC' ? '˄' : '˅') : ''}
              </th>
              <th className={styles.headers} onClick={() => sortTable('lastName')}>
                {`Last Name ${
                  sortState.column === 'lastName' ? (sortState.direction === 'ASC' ? '˄' : '˅') : ''
                }`}
              </th>
              <th className={styles.headers} onClick={() => sortTable('firstName')}>
                {`First Name ${
                  sortState.column === 'firstName'
                    ? sortState.direction === 'ASC'
                      ? '˄'
                      : '˅'
                    : ''
                }`}
              </th>
              <th className={styles.headers} onClick={() => sortTable('flatEarther')}>
                {`Flat Earther? ${
                  sortState.column === 'flatEarther'
                    ? sortState.direction === 'ASC'
                      ? '˄'
                      : '˅'
                    : ''
                }`}
              </th>
              <th className={styles.headers} onClick={() => sortTable('wallet')}>
                {`Wallet ${
                  sortState.column === 'wallet' ? (sortState.direction === 'ASC' ? '˄' : '˅') : ''
                }`}
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody className={styles.newRow}>
            <NewRowElement
              data={data}
              setData={setData}
              dbCount={dbCount}
              setDbCount={setDbCount}
            />
          </tbody>

          <tbody className={styles.existingRows}>{isLoading ? null : distributeRows}</tbody>
        </table>
        {isLoading ? <Loader /> : null}
      </div>
      <div className={styles.bottom}>
        <TableNavigation
          page={page}
          maxPage={maxPage}
          setPage={setPage}
          checkOffset={checkOffset}
        />
        <TableDropdown
          setPage={setPage}
          displayCount={displayCount}
          setDisplayCount={setDisplayCount}
          checkOffset={checkOffset}
        />
        <PopulateBtn dbCount={dbCount} setDbCount={setDbCount} data={data} setData={setData} />
        <AdminDeleteBtn setPage={setPage} setData={setData} setDbCount={setDbCount} />
      </div>
    </div>
  );
};

export default TableContainer;
