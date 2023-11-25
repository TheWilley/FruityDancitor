// db.ts
import Dexie, { Table } from 'dexie';
import { Modifications } from '../global/types.ts';

export interface Frame {
  id?: number;
  base64: string;
  modifications: Modifications;
}

export class Database extends Dexie {
  frames!: Table<Frame>;

  constructor() {
    super('database');
    this.version(1).stores({
      frames: '++id, base64, modifications',
    });
  }
}

export const db = new Database();
