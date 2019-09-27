const connection = require('../../config/database')

module.exports = {

    getAll: (req, res) => {
        connection.query('SELECT * FROM produto', (err, rows, fields) => {
            if(!err){
                res.status(200).send(rows)
            }else{
                res.status(500).json({errors: [err]})
            }
        })
    },

    get: (req, res) => {
        connection.query('SELECT * FROM produto WHERE id = ?', req.body.id, (err, rows, fields) => {
            if(!err){
                res.status(200).send(rows)
            }else{
                res.status(500).json({errors: [err]})
            }
        })
    },

    save: (req, res) => {
        console.log(req.body)
        connection.query('INSERT INTO produto SET ?', req.body, (err, rows, fields) => {
            if(!err){
                res.status(200).send(rows)
            }else{
                res.status(500).json({errors: [err]})
            }
        })
    },

    update: (req, res) => {
        const { id, nome, descricao, valor, idCategoria } = req.body
        connection.query(
            'UPDATE produto SET nome = ?, descricao = ?, valor = ?, idCategoria = ? WHERE id = ?', 
            [nome, descricao, valor, idCategoria, id], 
            function (err, rows, fields) {
                if(!err){
                    res.status(200).send(rows)
                }else{
                    res.status(500).json({errors: [err]})
                }
            }
        );
    },

    delete: (req, res) => {
        connection.query('DELETE FROM produto WHERE id = ?', req.body.id, (err, rows, fields) => {
            if(!err){
                res.status(200).send(rows)
            }else{
                res.status(500).json({errors: [err]})
            }
        })
    },

    count: (req, res) => {
        BillingCycle.countDocuments((error, value) => {
            if(error){
                res.status(500).json({errors: [error]})
            }else{
                res.json({value})
            }
        })
    },
}