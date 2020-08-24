const db = require('../../db/db');

async function submitForm(form) {

    const conn = await db.getConnection();
    
    try {

        const q = "INSERT INTO time_spent (date_created,email,sleep,travel,exercise,on_phone,on_computer,games,somethingelse,other) VALUES (?,?,?,?,?,?,?,?,?,?)"
        return await db.runQuery(conn, q, form);

    }
    finally {
        conn.release();
    }

}

module.exports = {
    submitForm,
}