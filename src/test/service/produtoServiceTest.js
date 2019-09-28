const chai = require('chai');
const http = require('chai-http');
const subSet = require('chai-subset');

chai.use(http);
chai.use(subSet);

describe('Testes de Integração: ProdutoService', () => {

    it('Produto / GetAll', (done) => {
        chai.request('http://localhost:3003')
            .post('/api/produto/getAll')
            .send({})
            .then((res) => {
                //console.log(res.body)
                chai.expect(res).to.be.not.null;
                chai.expect(res).to.have.status(200); 
                chai.expect(res.body.length).to.be.equal(2);
                chai.expect(res.body[0].nome).to.containSubset('Roda Aro 16');
                done()
            })
            .catch((err) => {
                console.log(err.message)
                done()
            });
    }).timeout(4000);

    it('Produto / Get', (done) => {
        chai.request('http://localhost:3003')
            .post('/api/produto/get')
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

    it('Produto / Save', (done) => {
        chai.request('http://localhost:3003')
            .post('/api/produto/save')
            .send({
                id: 3,
                nome: 'Produto',
                descricao: 'Teste produto',
                valor: 10,
                idCategoria: 1
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

    it('Produto / Update', (done) => {
        chai.request('http://localhost:3003')
            .post('/api/produto/update')
            .send({
                id: 3,
                nome: 'Produto',
                descricao: 'Teste',
                valor: 10,
                idCategoria: 1
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

    it('Produto / Delete', (done) => {
        chai.request('http://localhost:3003')
            .post('/api/produto/delete')
            .send({
                id: 3
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

    it('Produto / Calc Parcelas', (done) => {
        chai.request('http://localhost:3003')
            .post('/api/produto/calc')
            .send({
                id: 1,
                qtdParcelas: 6
            })
            .then((res) => {
                chai.expect(res).to.be.not.null;
                chai.expect(res).to.have.status(200);
                chai.expect(new Object(res.body).hasOwnProperty('valorParcela')).to.be.true
                chai.expect(res).to.be.json;
                done()
            })
            .catch((err) => {
                console.log(err.message)
                done()
            });
    }).timeout(4000);

});