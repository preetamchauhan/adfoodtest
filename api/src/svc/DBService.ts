import {createConnection} from 'mysql2';

export const conn = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'adfoodio'
}); 

// conn.connect(function(err: Error) {
//   if (err) throw err;
//   console.log('Database is connected successfully !');
// });

