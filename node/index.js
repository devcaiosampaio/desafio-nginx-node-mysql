const express = require('express')
const app = express()
const port = 3000 

const config = {
    host:'db',
    user:'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config);

// Função para inserir dados na tabela e retornar o registro inserido
function insertAndSelect(callback) {
    const sqlInsert = `INSERT INTO people(name) VALUES('Caio')`;
    connection.query(sqlInsert, function (error, results, fields) {
        if (error) throw error;
        const lastInsertId = results.insertId;
        const sqlSelect = `SELECT * FROM people WHERE id = ${lastInsertId}`;
        connection.query(sqlSelect, function (error, results, fields) {
            if (error) throw error;
            callback(results[0]); // Chamada de retorno com o registro inserido
        });
    });
}

app.get('/', (req, res) => {
    insertAndSelect(function (result) {
        res.send('<h1>Registro inserido: ' + result.name + '</h1>');
    });
});
app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})