export class Usuario {
    public readonly id: string 
    public nome: string
    public email: string
    public senha: string 
    constructor( props: {id: string, nome: string, email: string, senha: string}){
        this.id = props.id
        this.nome = props.nome
        this.email = props.email
        this.senha = props.senha
    }
}