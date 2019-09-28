const chai = require('chai');
const http = require('chai-http');
const subSet = require('chai-subset');

chai.use(http);
chai.use(subSet);

describe('Testes de Integração: CategoriaService', () => {

    it('Categoria / GetAll', (done) => {
        chai.request('http://localhost:3003')
            .post('/api/categoria/getAll')
            .send({})
            .then((res) => {
                //console.log(res.body)
                chai.expect(res).to.be.not.null;
                chai.expect(res).to.have.status(200); 
                chai.expect(res.body.length).to.be.equal(3);
                chai.expect(res.body[0].nome).to.containSubset('Informática');
                done()
            })
            .catch((err) => {
                console.log(err.message)
                done()
            });
    }).timeout(4000);

    it('Categoria / Get', (done) => {
        chai.request('http://localhost:3003')
            .post('/api/categoria/get')
            .send({
                id: 2
            })
            .then((res) => {
                //console.log(res.body)
                chai.expect(res).to.be.not.null;
                chai.expect(res).to.have.status(200); 
                chai.expect(res.body.length).to.be.equal(1);
                chai.expect(new Object(res.body[0]).hasOwnProperty('nome')).to.be.true
                done()
            })
            .catch((err) => {
                console.log(err.message)
                done()
            });
    }).timeout(4000);

    it('Categoria / Save', (done) => {
        chai.request('http://localhost:3003')
            .post('/api/categoria/save')
            .send({
                id: 4,
                nome: 'Produto'
            })
            .then((res) => {
                chai.expect(res).to.be.not.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res).to.be.json;
                done()
            })
            .catch((err) => {
                console.log(err.message)
                done()
            });
    }).timeout(4000);

    it('Categoria / Update', (done) => {
        chai.request('http://localhost:3003')
            .post('/api/categoria/update')
            .send({
                id: 4,
                nome: 'Produto Novo',
            })
            .then((res) => {
                chai.expect(res).to.be.not.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res).to.be.json;
                done()
            })
            .catch((err) => {
                console.log(err.message)
                done()
            });
    }).timeout(4000);

    it('Categoria / Delete', (done) => {
        chai.request('http://localhost:3003')
            .post('/api/categoria/delete')
            .send({
                id: 4
            })
            .then((res) => {
                chai.expect(res).to.be.not.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res).to.be.json;
                done()
            })
            .catch((err) => {
                console.log(err.message)
                done()
            });
    }).timeout(4000);

});