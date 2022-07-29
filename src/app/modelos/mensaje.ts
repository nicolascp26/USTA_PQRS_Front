export class Mensaje {
  public mensajeId: number;
  public mensajeCodpadre: number;
  public mensajeUsuario: number;
  public mensajeTitulo: string;
  public mensajeDetalle: string;
  public mensajeFecha: string;
  public mensajeEstado?: number;
  public mensajePrioridad?: number;
  public usuarioNombres?: string;
  public usuarioApellidos?: string;
  public tipoClase?: string;
  public tipoNombre?: string;
  public constructor(
    cod: number,
    codPad: number,
    msjUsu: number,
    tit: string,
    det: string,
    fec: string,
    est: number,
    pri: number
  ) {
    this.mensajeId = cod;
    this.mensajeCodpadre = codPad;
    this.mensajeUsuario = msjUsu;
    this.mensajeTitulo = tit;
    this.mensajeDetalle = det;
    this.mensajeFecha = fec;
    this.mensajeEstado = est;
    this.mensajePrioridad = pri;
  }
}