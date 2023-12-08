CREATE DATABASE sistema;

USE sistema;

CREATE TABLE categoria(
    cat_codigo INT NOT NULL AUTO_INCREMENT,
    cat_descricao VARCHAR(100) NOT NULL,
    CONSTRAINT pk_categoria PRIMARY KEY(cat_codigo)
);

CREATE TABLE produto(
    prod_codigo INT NOT NULL AUTO_INCREMENT,
    prod_descricao VARCHAR(100) NOT NULL,
    prod_precoCusto DECIMAL(10,2) NOT NULL DEFAULT 0,
    prod_precoVenda DECIMAL(10,2) NOT NULL DEFAULT 0,
    prod_dataValidade DATE,
    prod_qtdEstoque DECIMAL(10,2) NOT NULL DEFAULT 0,
    cat_codigo INT NOT NULL,
    CONSTRAINT pk_produto PRIMARY KEY(prod_codigo),
    CONSTRAINT fk_categoria FOREIGN KEY(cat_codigo) REFERENCES categoria(cat_codigo)
);

CREATE TABLE cliente(
    cli_cpf VARCHAR(15) NOT NULL,
    cli_nome VARCHAR(50) NOT NULL,
    cli_endereco VARCHAR(50) NOT NULL,
    cli_numero VARCHAR(50) NOT NULL,
    cli_bairro VARCHAR(50) NOT NULL,
    cli_cidade VARCHAR(50) NOT NULL,
    cli_uf VARCHAR(2) NOT NULL,
    cli_cep VARCHAR(30) NOT NULL,
    CONSTRAINT pk_cliente PRIMARY KEY(cli_cpf)
);

CREATE TABLE fornecedor(
    forn_cnpj VARCHAR(20) NOT NULL,
    forn_nome VARCHAR(50) NOT NULL,
    forn_endereco VARCHAR(50) NOT NULL,
    forn_bairro VARCHAR(50) NOT NULL,
    forn_cidade VARCHAR(50) NOT NULL,
    forn_uf VARCHAR(2) NOT NULL,
    forn_cep VARCHAR(30) NOT NULL,
    CONSTRAINT pk_fornecedor PRIMARY KEY (forn_cnpj)
);

CREATE TABLE fornecedor_produto (
    forn_cnpj VARCHAR(20) NOT NULL,
    prod_codigo INT NOT NULL,
    CONSTRAINT pk_fornecedor_produto PRIMARY KEY (forn_cnpj, prod_codigo),
    CONSTRAINT fk_fornprod_produto FOREIGN KEY (prod_codigo) REFERENCES produto (prod_codigo),
    CONSTRAINT fk_fornprod_fornecedor FOREIGN KEY (forn_cnpj) REFERENCES fornecedor (forn_cnpj)
);