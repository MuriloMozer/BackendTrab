import ClienteDAO from "../persistencia/clienteDAO.js";
//não esqueça do .js no final da importação

export default class Cliente {
    //definição dos atributos privados
    #cpf;
    #nome;
    #endereco;
    #numero;
    #bairro;
    #cidade;
    #uf;
    #cep;
    
    constructor(cpf='',nome='',endereco='',numero='',bairro='',cidade='',uf='',cep=''){
        this.#cpf=cpf;
        this.#nome=nome;
        this.#endereco=endereco;
        this.#numero=numero;
        this.#bairro=bairro;
        this.#cidade=cidade;
        this.#uf=uf;
        this.#cep=cep;
    }

    //métodos de acesso públicos

    get cpf() {
        return this.#cpf;
    }

    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    get numero() {
        return this.#numero;
    }

    set numero(novoNumero) {
        this.#numero = novoNumero;
    }

    get bairro() {
        return this.#bairro;
    }

    set bairro(novoBairro) {
        this.#bairro = novoBairro;
    }

    get cidade() {
        return this.#cidade;
    }

    set cidade(novaCidade) {
        this.#cidade = novaCidade;
    }

    get uf() {
        return this.#uf;
    }

    set uf(novaUf) {
        this.#uf = novaUf;
    }

    get cep() {
        return this.#cep;
    }

    set cep(novoCep) {
        this.#cep = novoCep;
    }
    //override do método toJSON
    toJSON() {
        return {
            cpf: this.#cpf,
            nome: this.#nome,
            endereco: this.#endereco,
            numero: this.#numero,
            bairro: this.#bairro,
            cidade: this.#cidade,
            uf: this.#uf,
            cep: this.#cep
        };
    }

    //camada de modelo acessa a camada de persistencia
    async gravar() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.gravar(this);
    }

    async excluir() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.excluir(this);
    }

    async atualizar() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.atualizar(this);
    }

    async consultar(parametro) {
        const clienteDAO = new ClienteDAO();
        return await clienteDAO.consultar(parametro);
    }
}