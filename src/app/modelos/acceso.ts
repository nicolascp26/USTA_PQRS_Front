export class Acceso {
  public correoUsuario: string;
  public claveUsuario: string;
  public reClave?:string;

  public usuarioNombres?:string;
  public usuarioRol?: string | any;

  public constructor(
    corr: string,
    clav: string,
  ) {
    this.correoUsuario = corr;
    this.claveUsuario = clav;
    this.reClave = '';
  }
}
