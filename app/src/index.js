const express = require('express')
const db = require('./db')
const app = express()
const port = 3000

app.use(express.json())

const initdb = () => {
    const conn = new db();
    conn.createifnontexists();
}

initdb();

app.get('/', async (req,res) => {
    
    conn = new db()

    let p = await conn.getresult('SELECT name FROM people')

    let resp_aux = []

    await p.map( ( async peep => {
        resp_aux.push(`<li>${peep.name}</li>`);
    }))

    res.send('<h1>Full Cycle</h1><p><ul>' + resp_aux.join('') + '<ul>')
})

app.post('/people', (req, res) => {
    console.log("req.body", req.body)

    if (req.body instanceof Object) {
            
        let sql_aux = []
    
        if (Array.isArray(req.body) && req.body.length > 0) {
            req.body.map( obj => {
                sql_aux.push(`('${obj.name}') `)
            })
        } else if (req.body && req.body.name) {
            sql_aux.push(` ('${req.body.name}') `)
        } else {
            console.log("Objeto inválido!")
            return res.status(400).send("Objeto inválido!");
        }
    
        const sql = 'INSERT INTO people (name) VALUES ' + sql_aux.join(',');
        conn = new db()
        conn.insert(sql)
    }
    
    return res.send('OK')
})

app.get('/people', async (req, res) => {
    
    conn = new db()
    p = await conn.getresult('SELECT id, name FROM people')
    
    return res.send(p)
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})