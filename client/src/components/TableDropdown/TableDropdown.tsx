import { dropdownValues } from '../../shared/constants';
import styles from './TableDropdown.module.scss';

interface Props {
  displayCount: number;
  setDisplayCount: React.Dispatch<React.SetStateAction<number>>;
  checkOffset: (page: number) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function TableDropdown({
  displayCount,
  setDisplayCount,
  checkOffset,
  setPage,
}: Props): JSX.Element {
  const dropdownOptions = dropdownValues.map((option) => {
    return (
      <option key={option} value={option}>
        {option}{' '}
      </option>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.title}>Display per page...</div>
      <select
        value={displayCount}
        onChange={(e) => {
          setPage(1);
          setDisplayCount(Number(e.target.value));
          checkOffset(1);
        }}
        className={styles.dropdown}
        name='displayCount'
      >
        {dropdownOptions}
      </select>
    </div>
  );
}

export default TableDropdown;
