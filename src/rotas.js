const express = require('express');
const { listarContasBancarias, criarContaBancaria, atualizarUsuario, excluirConta } = require('./controladores/contas');
const { depositar, sacar, transferir, saldo, extrato } = require("./controladores/transacoes");
const { verificacaoParaCadastrar, verificacaoParaAtualizar, verificacaoParaExcluir } = require('./intermediarios/verificaConta');
const verificar = require('./intermediarios/verificaTransacao');

const rotas = express.Router();

// rotas contas
rotas.get("/contas", listarContasBancarias);
rotas.post("/contas", verificacaoParaCadastrar, criarContaBancaria)
rotas.put("/contas/:numeroConta/usuario", verificacaoParaAtualizar, atualizarUsuario)
rotas.delete("/contas/:numeroConta", verificacaoParaExcluir, excluirConta)

// rotas transações
rotas.post("/transacoes/depositar", verificar.verificacaoParaDepositar, depositar)
rotas.post("/transacoes/sacar", verificar.verificacaoParaSacar, sacar)
rotas.post("/transacoes/transferir", verificar.verificacaoParaTransferir, transferir)
rotas.get("/contas/saldo", verificar.verificacaoParaSaldo, saldo)
rotas.get("/contas/extrato", verificar.verificacaoParaExtrato, extrato)

module.exports = rotas;
