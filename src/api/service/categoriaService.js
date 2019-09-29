const connection = require('../../config/database')

module.exports = {

    getAll: (req, res) => {
        connection.query('SELECT * FROM categoria', (err, rows, fields) => {
            if(!err){
                res.status(200).send(rows)
            }else{
                res.status(500).json({errors: [err]})
            }
        })
    },

    get: (req, res) => {
        connection.query('SELECT * FROM categoria WHERE id = ?', req.body.id, (err, rows, fields) => {
            if(!err){
                res.status(200).send(rows)
            }else{
                res.status(500).json({errors: [err]})
            }
        })
    },

    save: (req, res) => {
        let produto = req.body
        let messagens = [];

        if(produto.id == undefined || produto.id == null)
            messagens.push("The 'id' field must be filled!")
        if(produto.nome == undefined || produto.nome == null)
            messagens.push("The 'nome' field must be filled!")

        if(messagens.length == 0){
            connection.query('INSERT INTO categoria SET ?', req.body, (err, rows, fields) => {
                if(!err){
                    res.status(200).send(rows)
                }else{
                    res.status(500).json({errors: [err]})
                }
            })
        }else{
            res.status(500).json({errors: messagens})
        }
    },

    update: (req, res) => {
        const { id, nome } = req.body
        connection.query(
            'UPDATE categoria SET nome = ? WHERE id = ?', 
            [nome, id],
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
        connection.query('DELETE FROM categoria WHERE id = ?', req.body.id, (err, rows, fields) => {
            if(!err){
                res.status(200).send(rows)
            }else{
                res.status(500).json({errors: [err]})
            }
        })
    },
}