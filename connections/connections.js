const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Bdtj5020',
    database: 'employee_db',
    port: 5432
});

module.exports = pool;