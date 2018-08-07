const db = require('../db/connection');

const createUser = (username, email, password) => {
    const query = `
    INSERT INTO users
    (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING *
    `
    console.log("Creating user...");
    return db.one(query, [username, email, password])
}

module.exports = {createUser};