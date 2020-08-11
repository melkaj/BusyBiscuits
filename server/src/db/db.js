const mysql = require('mysql');

var database = process.env.SQL_DATABASE;

// Config options for the mysql pool
const config = {
    connectionLimit: 10,
    host: process.env.SQL_HOST || 'localhost',
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: database,
    port: process.env.SQL_PORT,
    connectionTimeout: 10000,
    acquireTimeout: 10000,
    waitForConnections: true,
    dateStrings: true,
};

// Connection pool
const _pool = mysql.createPool(config);

/**
 * Returns the pool
 */
function getPool() {
    return _pool;
}

/**
 * Returns a connection from the pool
 */
function getConnection() {
    return new Promise( (resolve, reject) => {
       _pool.getConnection( (err, connection) => {
           if ( err )       reject( err );
           else             resolve( connection );
       }) 
    })
}

/**
 * Returns a promise. 
 *      Resolve will hold the result of the query
 *      Reject will hold the error 
 * 
 * @param { Conncetion } connection     Database connection object
 * @param { String } query              SQL Query to run
 * @param { Array } values              Values to be passed to the query
 */
function runQuery(connection, query, values = []) {
    return new Promise( (resolve, reject) => {
        connection.query(query, values, (err, results, fields) => {
            if ( err )      reject( err );
            else            resolve( results );
        })
    })
}

module.exports = {
    getPool,
    getConnection,
    runQuery,
}