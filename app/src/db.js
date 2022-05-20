const mysql = require('mysql')

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

module.exports = class DB {
    createifnontexists = async () => {
        const connection = mysql.createConnection(config);

        connection.connect( err => {
            if (err) {
                if (err.code == "ENOTFOUND") {
                    console.log("Host do banco de dados não encontrado, verifique sua conexão de rede!");
                    throw err;
                    
                } else if (err.code == "ER_BAD_DB_ERROR") {
                    console.log("Oh-ow! Banco de dados não existe! Criando...");

                    this.createdb();

                    return;
                }
            };
            console.log('Conectado com sucesso! [id: '+ connection.threadId + ']');
        })
        connection.end();
    }

    createdb = async () => {
        const createconn = mysql.createConnection({host: 'db', user: 'root',password: 'root'});
        createconn.query("CREATE DATABASE nodedb", (err, result) => {
            if (err) {
                console.log("Não foi possível criar o banco de dados:", err.stack);
                throw err;
            }

            console.log("Banco criado com sucesso!");
            
            this.createtables();

        });
        createconn.end();
    }

    createtables = () => {
        const createtableconn = mysql.createConnection(config);

        createtableconn.query("CREATE TABLE people (id int not null auto_increment, name varchar(255) not null, primary key(id))", (err, result) => {
            if (err) {
                console.log("Não foi possível criar as tabelas do banco de dados:", err.stack);
                throw err;
            }
            console.log("Tabelas criadas com sucesso!");
        })

        createtableconn.end();
    }

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