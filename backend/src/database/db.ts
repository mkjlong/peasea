// backend/src/database/db.ts
import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, 'sets.db'); // or 'decisions.db', etc.
export const setsDB = new Database(path.join(__dirname, 'sets.db'));
export const decisionsDB = new Database(path.join(__dirname, 'decisions.db'));
