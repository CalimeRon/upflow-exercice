import { Row } from './types';

export const tableLimit = 100;

export const apiEndpoint = process.env.REACT_APP_API_ENDPOINT as string;

export const dropdownValues = [10, 50, 100];

export const mandatoryCells = ['lastName', 'firstName'];

export const newRow: Row = {
  lastName: '',
  firstName: '',
  flatEarther: false,
  wallet: 0,
};

export const errorRow: Required<Row> = {
  id: 0,
  lastName: 'ERROR',
  firstName: 'ERROR',
  flatEarther: false,
  wallet: 0,
  createdAt: "2021-10-31T19:35:33.237Z",
  updatedAt: "2021-11-03T22:12:10.588Z"
};
