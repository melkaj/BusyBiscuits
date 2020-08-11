const db = require('../../db/db');

async function login(email) {

    try {

        const conn = await db.getConnection();

    }
    finally {

    }

}

module.exports = {
    login,
}