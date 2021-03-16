const db = require('../../db/db');


/**
 * Executes a MySql query to get data from the most recent time-spent forms
 * (Up to last seven, if there are only a 3 entries, then only 3 entries will pop up)
 * Returns an array of objects
 */
async function getDataFromLastSevenDays() {

    const conn = await db.getConnection();
    
    try {

        const q = "SELECT date_created,sleep,travel,exercise,on_phone,on_computer,games,somethingelse FROM time_spent ORDER BY date_created DESC LIMIT 7"
        return await db.runQuery(conn, q, []);

    }
    finally {
        conn.release();
    }

}



/**
 * Returns result of query to get data between certain ranges
 * @param {Array} range 
 */
async function getDataByRange(range) {

    const conn = await await db.getConnection();

    try {

        const q = "SELECT date_created,sleep,travel,exercise,on_phone,on_computer,games,somethingelse FROM time_spent WHERE (date_created>=? AND date_created<=?)";//ORDER BY date_created DESC LIMIT 7"
        return await db.runQuery(conn, q, range);

    }
    finally {
        conn.release();
    }
}




/**
 * Executes a MySql query and returns its results 
 * @param {String} date - ex: "2020-08-22"
 * Returns an array of objects
 */
async function getDataByDate(date) {

    const conn = await db.getConnection();
    
    try {

        const q = "SELECT sleep,travel,exercise,on_phone,on_computer,games,somethingelse FROM time_spent WHERE (date_created = ?)"
        return await db.runQuery(conn, q, date);
    }
    finally {
        conn.release();
    }

}

// async function getDataFromToday(todaysDate) {

//     const conn = await db.getConnection();
    
//     try {

//         const q = "SELECT sleep,travel,exercise,on_phone,on_computer,games,somethingelse FROM time_spent WHERE (date_created = ?)"
//         return await db.runQuery(conn, q, todaysDate);

//     }
//     finally {
//         conn.release();
//     }

// }


module.exports = {
    getDataFromLastSevenDays,
    getDataByRange,
    getDataByDate,
}