import styles from './RowElement.module.scss';
import React, { useEffect, useState } from 'react';
import { Row } from '../../shared/types';
import { deleteRow, updateRow } from '../../services/apiServices';
import TextInput from '../TextInput/TextInput';
import NumberFormat from 'react-number-format';

interface Props {
  rowElement: Required<Row>;
  data: Required<Row>[];
  setData: React.Dispatch<React.SetStateAction<Required<Row>[]>>;
  rowKey: number;
}

function RowElement({ rowElement, data, setData, rowKey }: Props): JSX.Element {
  const [currentRow, setCurrentRow] = useState<Required<Row>>({ ...rowElement });

  useEffect(() => {
    setCurrentRow({ ...rowElement });
  }, [rowElement]);

  const onInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    column: keyof Row
  ): Promise<void> => {
    setCurrentRow({ ...currentRow, [column]: e.target.value });
  };

  const onCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>, column: keyof Row) => {
    const newValue = e.target.checked;
    setCurrentRow({ ...currentRow, [column]: newValue });
    await updateRow(currentRow.id, column, newValue);
  };

  const recordCell = async (column: keyof Row): Promise<void> => {
    if (currentRow[column] === rowElement[column]) return;
    const { id } = currentRow;
    await updateRow(id, column, currentRow[column]);
  };

  const confirmDelete = async (): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this row?')) {
      await deleteRow(currentRow.id);
      const newData = data.filter((row) => row.id !== currentRow.id);
      setData(newData);
    }
  };

  return (
    <tr className={styles.row}>
      <td className={styles.cell}></td>
      <td className={styles.cell}>
        <TextInput
          onInputChange={onInputChange}
          recordCell={recordCell}
          column={'lastName'}
          value={currentRow.lastName}
          newRow={false}
          rowKey={rowKey}
        />
      </td>
      <td className={styles.cell}>
        <TextInput
          onInputChange={onInputChange}
          recordCell={recordCell}
          column={'firstName'}
          value={currentRow.firstName}
          newRow={false}
          rowKey={rowKey}
        />
      </td>
      <td className={styles.cell}>
        <div className={styles.checkbox}>
          <input
            onChange={(e) => onCheckboxChange(e, 'flatEarther')}
            data-testid={`checkbox-${rowKey}`}
            type='checkbox'
            checked={currentRow.flatEarther}
          />
        </div>
      </td>
      <td className={styles.cell}>
        <div className={styles.wallet}>
          <NumberFormat
            onValueChange={(value) => setCurrentRow({ ...currentRow, wallet: Number(value.value) })}
            onBlur={() => recordCell('wallet')}
            value={currentRow.wallet}
            displayType={'input'}
            thousandSeparator={true}
            suffix={'€'}
            data-testid={`wallet-${rowKey}`}
            className={styles.walletInput}
          />
        </div>
      </td>
      <td className={`${styles.cell} ${styles.rowBtnContainer}`}>
        <button
          className={styles.rowBtn}
          data-testid={`deleteBtn-${rowKey}`}
          onClick={() => confirmDelete()}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default RowElement;
