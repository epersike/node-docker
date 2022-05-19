const mysql = require('mysql')

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

module.exports = class DB {
    getresult = async (sql) => {

        const connection = mysql.createConnection(config)

        let result = await new Promise((resolve, reject) => {
            connection.query(sql, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
        connection.end();

        return result
    }

    insert = async (sql) => {
        const connection = mysql.createConnection(config)
        connection.query(sql);
        connection.end();
    }
}