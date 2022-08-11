export class Acceso {
  public correoUsuario: string;
  public claveUsuario: string;
  public reClave?: string;
  public nuevaClave?:string;

  public usuarioNombres?: string;
  public usuarioRol?: string | any;
  public usuarioId?: string | any;

  public constructor(corr: string, clav: string) {
    this.correoUsuario = corr;
    this.claveUsuario = clav;
    this.reClave = '';
    this.nuevaClave='';
  }
}
