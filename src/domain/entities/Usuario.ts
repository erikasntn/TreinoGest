export class Usuario {
    public readonly id: string 
    public nome: string

    constructor( props: {id: string, nome: string}){
        this.id = props.id
        this.nome = props.nome
    }
}