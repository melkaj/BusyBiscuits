const db = require('../../db/db');

async function getDataFromToday(todaysDate) {

    const conn = await db.getConnection();
    
    try {

        const q = "SELECT sleep,travel,exercise,on_phone,on_computer,games,somethingelse FROM time_spent WHERE (date_created = ?)"
        return await db.runQuery(conn, q, todaysDate);

    }
    finally {
        conn.release();
    }

}

module.exports = {
    getDataFromToday,
}