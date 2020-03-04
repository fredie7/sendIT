import { Pool } from 'pg';
import dotenv from 'dotenv';
// import logger from '../../services/logger';

dotenv.config();
// const db = new Pool({ connectionString: 'postgresql://postgres@localhost:5432/sendit' });
// console.log(db);
// db.on('connect', () => {
//   console.log('connected to the database');
// });
// export { connectionString };
export default db;
