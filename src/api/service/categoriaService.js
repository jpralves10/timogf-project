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
        connection.query('INSERT INTO categoria SET ?', req.body, (err, rows, fields) => {
            if(!err){
                res.status(200).send(rows)
            }else{
                res.status(500).json({errors: [err]})
            }
        })
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