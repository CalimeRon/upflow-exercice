import {
  uniqueNamesGenerator,
  Config,
  animals,
  adjectives,
  names,
  NumberDictionary,
} from 'unique-names-generator';
import { Row } from '../../shared/types';

const firstNameConfig: Config = {
  dictionaries: [names],
  separator: ' ',
  length: 1,
  style: 'capital',
};

const lastNameConfig: Config = {
  dictionaries: [adjectives, animals],
  separator: '-',
  length: 2,
  style: 'capital',
};

export const createEntries = (count: number): Row[] => {
  const entries: Row[] = [];
  for (let i = 0; i < count; i++) {
    const lastName: string = uniqueNamesGenerator(lastNameConfig);
    const firstName: string = uniqueNamesGenerator(firstNameConfig);
    const flatEarther: boolean = Math.round(Math.random()) ? true : false;
    const wallet: number = Number(NumberDictionary.generate({ min: 1, max: 1000000 })[0]);
    entries.push({
      lastName: lastName,
      firstName: firstName,
      flatEarther: flatEarther,
      wallet: wallet,
    });
  }
  return entries;
};
