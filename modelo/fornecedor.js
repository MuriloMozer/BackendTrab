import FornecedorDAO from "../persistencia/fornecedorDAO.js";
//não esqueça do .js no final da importação

export default class Fornecedor{
    //definição dos atributos privados
    #cnpj;
    #nome;
    #endereco;
    #bairro;
    #cidade;
    #uf;
    #cep;

    constructor(cnpj='', nome='', endereco='', bairro='', cidade='', uf='', cep=''){
        this.#cnpj = cnpj;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#cep = cep;
    }

    //métodos de acesso públicos

    get cnpj(){
        return this.#cnpj;
    }

    set cnpj(novoCnpj){
        this.#cnpj = novoCnpj;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome = novoNome;
    }

    get endereco(){
        return this.#endereco;
    }

    set endereco(novoEndereco){
        this.#endereco = novoEndereco;
    }

    get bairro(){
        return this.#bairro;
    }

    set bairro(novoBairro){
        this.#bairro = novoBairro;
    }

    get cidade(){
        return this.#cidade;
    }

    set cidade(novaCidade){
        this.#cidade = novaCidade;
    }

    get uf(){
        return this.#uf;
    }

    set uf(novoUf){
        this.#uf = novoUf;
    }

    get cep(){
        return this.#cep;
    }

    set cep(novoCep){
        this.#cep = novoCep;
    }

    toJSON()     
    {
        return {
            cnpj:this.#cnpj,
            nome:this.#nome,
            endereco:this.#endereco,
            bairro:this.#bairro,
            cidade:this.#cidade,
            cep:this.#cep
        }
    }

    //camada de modelo acessa a camada de persistencia
    async gravar(){
        const fronDAO = new FornecedorDAO();
        await fronDAO.gravar(this);
    }

    async excluir(){
        const fronDAO = new FornecedorDAO();
        await fronDAO.excluir(this);
    }

    async atualizar(){
        const fronDAO = new FornecedorDAO();
        await fronDAO.atualizar(this);

    }

    async consultar(parametro){
        const fronDAO = new FornecedorDAO();
        return await fronDAO.consultar(parametro);
    }
}