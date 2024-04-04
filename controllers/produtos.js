const { json } = require('express'); 
const db = require('../database/conection'); 

module.exports = {
    async listarProdutos(request, response) {
        try {

            const sql = `SELECT 
            prd_id, prd_nome, prd_valor, prd_unidade, 
            prd_disponivel, prd_img, prd_img_destaque, 
            prd_descricao, prd_img_destaque 
            FROM produtos 
            WHERE prd_disponivel=1;`

            const produtos = await db.query(sql)
            const nItems = produtos[0].length;

            // throw new Error('Eu causei o erro!');
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de produtos.', 
                dados: produtos[0],
                nItems
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: `Erro na requisição. -${error}`, 
                dados: null
            });
        }
    }, 
    async cadastrarProdutos(request, response) {
        try {
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de produtos.', 
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: `Erro na requisição. -${error}`, 
                dados: null
            });
        }
    }, 
    async editarProdutos(request, response) {
        try {
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Editar produtos.', 
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: `Erro na requisição. -${error}`, 
                dados: null
            });
        }
    }, 
    async apagarProdutos(request, response) {
        try {
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Apagar produtos.', 
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: `Erro na requisição. -${error}`, 
                dados: null
            });
        }
    }, 
}

