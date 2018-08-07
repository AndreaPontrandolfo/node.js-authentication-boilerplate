const db = require('../db/connection');

const findUserById = (id) => {
    const query = `
    SELECT *
    FROM users
    WHERE id=$1
    `
    return db.oneOrNone(query, [id])
}

const verifyUser = (email) => {
    const query = `
    SELECT *
    FROM users
    WHERE email=$1
    `
    return db.oneOrNone(query, [email])
}

module.exports = {findUserById, verifyUser};