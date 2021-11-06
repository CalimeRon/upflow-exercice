import { Row, SortState } from '../shared/types';
import axios from 'axios';
import { apiEndpoint, errorRow } from '../shared/constants';

export async function getTable(
  pageSize: number,
  offset: number,
  sortState: SortState
): Promise<Required<Row>[]> {
  try {
    const params = {
      count: pageSize,
      offset: offset,
      column: sortState.column,
      direction: sortState.direction,
    };
    const response = await axios.get(`${apiEndpoint}/`, {
      params: params,
    });
    return response.data;
  } catch (oO) {
    console.log(oO);
  }
  return [];
}

export async function getCount(): Promise<number> {
  try {
    const response = await axios.get(`${apiEndpoint}/totalCount`);
    return response.data.totalCount;
  } catch (oO) {
    console.log(oO);
  }
  return 0;
}

export async function postRow(row: Row): Promise<Required<Row>> {
  try {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const body = row;
    const response = await axios.post(`${apiEndpoint}/row`, body, {
      headers: headers,
    });
    return response.data;
  } catch (oO) {
    console.log(oO);
  }
  return errorRow;
}

export async function updateRow(
  id: number,
  column: string,
  newValue: number | string | boolean | Date
): Promise<Row[]> {
  try {
    const params = { id: id, column: column };
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const body = { newValue };
    const response = await axios.put(`${apiEndpoint}/row`, body, {
      params: params,
      headers: headers,
    });
    return response.data;
  } catch (oO) {
    console.log(oO);
  }
  return [];
}

export async function deleteRow(id: number): Promise<void> {
  try {
    const params = { id: id };
    await axios.delete(`${apiEndpoint}/row`, { params: params });
  } catch (oO) {
    console.log(oO);
  }
}

export async function postManyRows (data: Row[]): Promise<Required<Row>[]> {
  try {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const body = data;
    const response = await axios.post(`${apiEndpoint}/manyRows`, body, {
      headers: headers,
    });
    return response.data;
  } catch (oO) {
    console.log(oO);
  }
  return [errorRow];
}


export async function deleteAllRows(): Promise<void> {
  try {
    await axios.delete(`${apiEndpoint}/allRows`);
  } catch (oO) {
    console.log(oO);
  }
}