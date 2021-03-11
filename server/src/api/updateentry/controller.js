const db = require('../../db/db');


/**
 * Executes a MySql query to get data from the most recent time-spent forms
 * (Up to last seven, if there are only a 3 entries, then only 3 entries will pop up)
 * Returns an array of objects
 */
 async function updateEntry(form) {

    const conn = await db.getConnection();
    
    try {

        const q = "UPDATE time_spent SET sleep=?,travel=?,exercise=?,on_phone=?,on_computer=?,games=?,somethingelse=? WHERE date_created=?"
        return await db.runQuery(conn, q, form);

    }
    finally {
        conn.release();
    }

}


module.exports = {
    updateEntry,
}