
import styles from './App.module.scss';
import TableContainer from '../TableContainer/TableContainer';

function App(): JSX.Element {
  return (
    <div className={styles.app}>
      <TableContainer />
    </div>
  );
}

export default App;
