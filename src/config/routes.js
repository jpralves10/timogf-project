const express = require('express')
const produtoService = require('../api/service/produtoService')
const categoriaService = require('../api/service/categoriaService')

module.exports = function(server){

    // API Routes
    const router = express.Router()
    server.use('/api', router)

    //Rotas para ProdutoService
    router.post('/produto/getAll', produtoService.getAll);
    router.post('/produto/get', produtoService.get);
    router.post('/produto/save', produtoService.save);
    router.post('/produto/update', produtoService.update);
    router.post('/produto/delete', produtoService.delete);

    //Rotas para CategoriaService
    router.post('/categoria/getAll', categoriaService.getAll);
    router.post('/categoria/get', categoriaService.get);
    router.post('/categoria/save', categoriaService.save);
    router.post('/categoria/update', categoriaService.update);
    router.post('/categoria/delete', categoriaService.delete);

}