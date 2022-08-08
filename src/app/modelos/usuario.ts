export class Usuario {
  public usuarioId: number;
  public usuarioNombres: string;
  public usuarioApellidos: string;
  public usuarioDocumento: string;
  public usuarioTelefono: string;
  public rolId: number;
  public rolNombre?:string;
  public constructor(
    cod: number,
    nom: string,
    ape: string,
    doc: string,
    tel: string,
    rol: number
  ) {
    this.usuarioId = cod;
    this.usuarioNombres = nom;
    this.usuarioApellidos = ape;
    this.usuarioDocumento = doc;
    this.usuarioTelefono = tel;
    this.rolId = rol;
  }
}
