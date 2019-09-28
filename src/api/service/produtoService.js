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
        let produto = req.body
        let messagens = [];

        if(produto.id == undefined || produto.id == null)
            messagens.push("Campo 'id' deve ser preenchido!")
        if(produto.nome == undefined || produto.nome == null)
            messagens.push("Campo 'nome' deve ser preenchido!")
        if(produto.descricao == undefined || produto.descricao == null)
            messagens.push("Campo 'descricao' deve ser preenchido!")
        if(produto.valor == undefined || produto.valor == null)
            messagens.push("Campo 'valor' deve ser preenchido!")
        if(produto.idCategoria == undefined || produto.idCategoria == null)
            messagens.push("Campo 'idCategoria' deve ser preenchido!")

        if(messagens.length == 0){
            connection.query('INSERT INTO produto SET ?', produto, (err, rows, fields) => {
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

    calcParcelas: (req, res) => {
        const { id, qtdParcelas } = req.body

        connection.query('SELECT * FROM produto WHERE id = ?', id, (err, rowsProduto, fields) => {
            if(!err){

                let produto = rowsProduto[0];

                connection.query('SELECT * FROM categoria WHERE id = ?', produto.idCategoria, (err, rowsCategoria, fields) => {
                    if(!err){

                        let categoria = rowsCategoria[0]
                        let valorParcela = 0;

                        console.log(categoria)

                        if(categoria.nome === 'Informática'){
                            valorParcela = produto.valor / ( (Math.pow((1+5/100), qtdParcelas)-1) / (Math.pow((1+5/100), qtdParcelas)*(5/100)) )
                        }else if(categoria.nome === 'Automotivo'){
                            valorParcela = produto.valor / ( (Math.pow((1+2.5/100), qtdParcelas)-1) / (Math.pow((1+2.5/100), qtdParcelas)*(2.5/100)) )
                        }else if(categoria.nome === 'Móveis'){
                            valorParcela = produto.valor / ( (Math.pow((1+1/100), qtdParcelas)-1) / (Math.pow((1+1/100), qtdParcelas)*(1/100)) )
                        }else{
                            valorParcela = produto.valor / qtdParcelas
                        }

                        res.status(200).send({'valorParcela':valorParcela.toFixed(2)})
                    }else{
                        res.status(500).json({errors: [err]})
                    }
                })
            }else{
                res.status(500).json({errors: [err]})
            }
        })
    },
}