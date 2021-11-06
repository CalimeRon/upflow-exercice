import { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { postRow } from '../../services/apiServices';
import { mandatoryCells, newRow } from '../../shared/constants';
import { Row } from '../../shared/types';
import TextInput from '../TextInput/TextInput';
import styles from './NewRowElement.module.scss';

interface Props {
  data: Required<Row>[];
  setData: React.Dispatch<React.SetStateAction<Required<Row>[]>>;
  dbCount: number;
  setDbCount: React.Dispatch<React.SetStateAction<number>>;
}

function NewRowElement({ data, setData, dbCount, setDbCount }: Props): JSX.Element {
  const [currentRow, setCurrentRow] = useState<Row>(newRow);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const emptyMandatoryCells = mandatoryCells.reduce((prev, curr) => {
    if (currentRow[curr as keyof Row] === '') prev += 1;
    return prev;
  }, 0);

  useEffect(() => {
    if (!emptyMandatoryCells) setDisableSubmit(false);
    else setDisableSubmit(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRow]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, column: keyof Row): void => {
    if (e.target.type === 'checkbox') {
      setCurrentRow({ ...currentRow, [column]: !currentRow.flatEarther });
    } else setCurrentRow({ ...currentRow, [column]: e.target.value });
  };

  const recordRow = async (
    e: React.FormEvent<HTMLTableRowElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.preventDefault();
    if (!emptyMandatoryCells) {
      const response = await postRow(currentRow);
      updateDataAndResetRow(response);
    }
  };

  const updateDataAndResetRow = (response: Required<Row>) => {
    const newData: Required<Row>[] = [...data];
    newData.unshift(response);
    setData(newData);
    setDbCount(dbCount++);
    setCurrentRow(newRow);
  };

  return (
    <tr className={styles.row} onSubmit={(e) => recordRow(e)}>
      <td className={styles.cell}></td>
      <td className={styles.cell}>
        <TextInput
          onInputChange={onInputChange}
          column={'lastName'}
          value={currentRow.lastName}
          newRow={true}
        />
      </td>
      <td className={styles.cell}>
        <TextInput
          onInputChange={onInputChange}
          column={'firstName'}
          value={currentRow.firstName}
          newRow={true}
        />
      </td>
      <td className={styles.cell}>
        <div className={styles.checkbox}>
          <input
            onChange={(e) => onInputChange(e, 'flatEarther')}
            data-testid='checkbox-newRow'
            type='checkbox'
            checked={currentRow.flatEarther}
          />
        </div>
      </td>
      <td className={styles.cell}>
        <div className={styles.wallet}>
          <NumberFormat
            onValueChange={(value) => setCurrentRow({ ...currentRow, wallet: Number(value.value) })}
            value={currentRow.wallet}
            displayType={'input'}
            thousandSeparator={true}
            suffix={'€'}
            data-testid='wallet-newRow'
            className={styles.walletInput}
          />
        </div>
      </td>
      <td className={`${styles.cell}`}>
        <button className={styles.rowBtn} disabled={disableSubmit} onClick={(e) => recordRow(e)}>
          Add row
        </button>
      </td>
    </tr>
  );
}

export default NewRowElement;
