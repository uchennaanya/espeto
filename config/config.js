require('dotenv').config();
module.exports = {
    development: {
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        host: process.env.PGHOST,
        dialect: 'postgres',
        logging: false,
        ssl: true,
        dialectOptions: {
            require: true,
            rejectUnauthorized: false
        },
        test: {
            username: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            database: process.env.PGDATABASE_TEST,
            host: process.env.PGHOST,
            dialect: 'postgres',
            logging: false,
        },
        production: {
            username: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            database: process.env.PGDATABASE,
            host: process.env.PGHOST,
            dialect: 'postgres',
            ssl: true,
            dialectOptions: {
                ssl: true,
                rejectUnauthorized: true
            }
        }
    }
}
