import { ScalingSquaresSpinner } from 'react-epic-spinners';
import styles from './Loader.module.scss';

const Loader = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <ScalingSquaresSpinner size={200} color='#747e8a' className={styles.loader} />
    </div>
  );
};


export default Loader;