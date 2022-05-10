export class Acceso {
  public correoUsuario: string;
  public claveUsuario: string;
  public reClave?:string;

  public nombre_usuario?:string;
  public rol_usuario?: string;

  public constructor(
    corr: string,
    clav: string,
  ) {
    this.correoUsuario = corr;
    this.claveUsuario = clav;
    this.reClave = '';
  }
}
