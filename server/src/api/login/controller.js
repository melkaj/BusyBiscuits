const db = require('../../db/db');

async function login(email) {

    try {

        const conn = await db.getConnection();

    }
    finally {
        conn.release();
    }

}

module.exports = {
    login,
}