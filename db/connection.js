/// Proper way to initialize and share the Database object

/// Loading and initializing the library:
const postgres = require('pg-promise')({
    /// Initialization Options
});

const databaseName = "youfeatured-db-3";

/// Preparing the connection details:
// - const connection = 'postgres://username:password@host:port/database';
const connection = `postgres://localhost:5432/${databaseName}`;

//// Rimpiazzare con Winston
console.log("Connecting to the db...");

/// Creating a new database instance from the connection details:
const db = postgres(connection);

module.exports = db;