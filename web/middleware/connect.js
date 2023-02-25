import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

sqlite3.verbose()
const DB_PATH = `${process.cwd()}/database.sqlite`;
// you would have to import / invoke this in another file
export default async function openDb() {
    return open({
        filename: DB_PATH,
        driver: sqlite3.Database
    })
}