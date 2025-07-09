// src/domain/entities/Treino.ts

export type TipoTreino = "musculacao" | "cardio" | "ambos"

export class Treino {
  public readonly id: string
  public usuarioId: string
  public diaSemana: string
  public tipo: TipoTreino
  public calorias: number
  public peso?: number
  public duracao?: number
  public distancia?: number

  constructor(props: {
    id: string
    usuarioId: string
    diaSemana: string
    tipo: TipoTreino
    calorias: number
    peso?: number
    duracao?: number
    distancia?: number
  }) {
    this.id = props.id
    this.usuarioId = props.usuarioId
    this.diaSemana = props.diaSemana
    this.tipo = props.tipo
    this.calorias = props.calorias
    this.peso = props.peso
    this.duracao = props.duracao
    this.distancia = props.distancia
  }
}
