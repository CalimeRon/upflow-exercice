import { useEffect, useState } from 'react';
import styles from './TableNavigation.module.scss';

interface Props {
  page: number;
  maxPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  checkOffset: (page: number) => void;
}

function TableNavigation({ page, maxPage, setPage, checkOffset }: Props): JSX.Element {
  const [tempPage, setTempPage] = useState(page);

  useEffect(() => {
    setTempPage(page);
  }, [page])

  const goToPage = (page: number): void => {
    console.log('in gotopage, page= ', page, 'tempPage ', tempPage);
    setPage(page);
    setTempPage(page);
    checkOffset(page);
  };

  const handleInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    goToPage(Math.min(tempPage, maxPage));
  };

  return (
    <div className={styles.container}>
      <button className={styles.navigationBtn} name='firstPage' onClick={(e) => goToPage(1)}>
        {' '}
        {'<<'}{' '}
      </button>
      <button
        className={styles.navigationBtn}
        name='previousPage'
        onClick={() => goToPage(Math.max(1, page - 1))}
      >
        {' '}
        {'<'}{' '}
      </button>
      <form onSubmit={(e) => handleInput(e)}>
        <input
          className={styles.input}
          type='text'
          value={tempPage}
          onChange={(e) => setTempPage(Math.min(Number(e.target.value)))}
        />
      </form>
      <button
        className={styles.navigationBtn}
        name='nextPage'
        onClick={() => goToPage(Math.min(maxPage, page + 1))}
      >
        {' '}
        {'>'}{' '}
      </button>
      <button className={styles.navigationBtn} name='lastPage' onClick={() => goToPage(maxPage)}>
        {' '}
        {'>>'}{' '}
      </button>
    </div>
  );
}

export default TableNavigation;
