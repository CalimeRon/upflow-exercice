import { useState } from 'react';
import { mandatoryCells } from '../../shared/constants';
import { Row } from '../../shared/types';
import styles from './TextInput.module.scss';

interface Props {
  recordCell?: (column: keyof Row) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>, column: keyof Row) => void;
  value: string;
  column: keyof Row;
  newRow: boolean;
  rowKey?: number;
}

function TextInput({
  onInputChange,
  recordCell = () => '',
  value,
  column,
  newRow,
  rowKey,
}: Props): JSX.Element {
  const [errorMessage, setErrorMessage] = useState(false);

  const assessCell = () => {
    if (column) {
      if (value === '' && mandatoryCells.includes(column)) setErrorMessage(true);
      else {
        setErrorMessage(false);
        if (recordCell) recordCell(column);
      }
    }
  };

  return (
    <div className={styles.inputContainer}>
        <form onSubmit={() => assessCell}>
          <input
            type='text'
            data-testid={newRow ? `newRow${column}` : `${column}-${rowKey}`}
            value={value}
            onChange={(e) => onInputChange(e, column as keyof Row)}
            onBlur={() => assessCell()}
          />
        </form>
        {errorMessage ? (
          <div className={styles.required}> * This field is required</div>
        ) : (
          <div>{''}</div>
        )}
    </div>
  );
}

export default TextInput;
