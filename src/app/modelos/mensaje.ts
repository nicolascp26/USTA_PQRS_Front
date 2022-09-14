export class Mensaje {
  public mensajeId: number;
  public mensajeCodpadre: number;
  public mensajeUsuario: number;
  public mensajeTitulo: string;
  public mensajeDetalle: string;
  public mensajeFecha: string;
  public mensajeEstado: number;
  public mensajeActualizado?: string;
  public mensajeIdUsuario?:number;
  public usuarioNombres?: string;
  public usuarioApellidos?: string;
  public mensajeUsuarioAsignado?: number;
  public asignadoNombres?:string;
  public asignadoApellidos?:string;
  public tipoId?:number;
  public tipoClase?: string;
  public tipoNombre?: string;
  public constructor(
    cod: number,
    codPad: number,
    msjUsu: number,
    tit: string,
    det: string,
    fec: string,
    est: number
  ) {
    this.mensajeId = cod;
    this.mensajeCodpadre = codPad;
    this.mensajeUsuario = msjUsu;
    this.mensajeTitulo = tit;
    this.mensajeDetalle = det;
    this.mensajeFecha = fec;
    this.mensajeEstado = est;
  }
}
