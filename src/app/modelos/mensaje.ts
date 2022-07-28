export class Mensaje {
  public mensajeId: number;
  public mensajeCodpadre?: number;
  public mensajeTitulo: string;
  public mensajeDetalle: string;
  public mensajeFecha: string;
  public mensajeHora:string;
  public mensajeEstado?: number;
  public mensajePrioridad?: number;
  public usuarioNombres?:string;
  public usuarioApellidos?:string;
  public mensajeTipoId?: number;
  public constructor(
    cod: number,
    tit: string,
    det: string,
    fec:string,
    hor:string,
    est: number,
    pri: number,
    tipo: number
  ) {
    this.mensajeId = cod;
    this.mensajeTitulo = tit;
    this.mensajeDetalle = det;
    this.mensajeFecha = fec;
    this.mensajeHora = hor;
    this.mensajeEstado = est;
    this.mensajePrioridad = pri;
    this.mensajeTipoId = tipo;
  }
}
