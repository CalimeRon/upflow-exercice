import { useEffect} from 'react';
import { postManyRows } from '../../services/apiServices';
import { tableLimit } from '../../shared/constants';
import { Row } from '../../shared/types';
import { createEntries } from './helpers';
import styles from './PopulateBtn.module.scss';

interface Props {
  dbCount: number;
  data: Required<Row>[];
  setData: React.Dispatch<React.SetStateAction<Required<Row>[]>>;
  setDbCount: React.Dispatch<React.SetStateAction<number>>;
}

function PopulateBtn({ dbCount, data, setData, setDbCount }: Props): JSX.Element | null {
  const populateMock = async () => {
    const entries = createEntries(1000);
    const insertedData = await postManyRows(entries);
    const delta = tableLimit - data.length;
    const newEntriesDisplay = insertedData.filter((row, index) => index < delta);
    setData([...data, ...newEntriesDisplay]);
    setDbCount(dbCount + insertedData.length);
  };

  useEffect(() => {
  }, [dbCount]);

  return (
    <button className={styles.Btn} onClick={() => populateMock()}>
      ADMIN: Add 1000 rows
    </button>
  ); 
}

export default PopulateBtn;
