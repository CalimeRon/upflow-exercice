export interface Row  {
  id?: number;
  lastName: string;
  firstName: string;
  flatEarther: boolean;
  wallet: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface SortState {
  column: keyof Row;
  direction: 'ASC' | 'DESC'
}
