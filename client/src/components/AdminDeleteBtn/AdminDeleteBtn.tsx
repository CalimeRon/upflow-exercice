import { deleteAllRows } from '../../services/apiServices';
import { Row } from '../../shared/types';
import styles from './AdminDeleteBtn.module.scss';

interface Props {
  setData: React.Dispatch<React.SetStateAction<Required<Row>[]>>;
  setDbCount: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function AdminDeleteBtn({ setData, setDbCount, setPage }: Props): JSX.Element | null {
  const deleteRows = async () => {
    if (window.confirm('Are you sure you want to delete all the entries?')) {
      await deleteAllRows();
      setData([]);
      setDbCount(0);
      setPage(1);
    }
  };

  return (
    <button className={styles.Btn} onClick={() => deleteRows()}>
      ADMIN: Delete rows
    </button>
  );
}

export default AdminDeleteBtn;
