export class Rol {
  public rolId: number;
  public rolNombre: string;
  public cantUsuarios?: number;
  public constructor(
    codRol: number,
    nomRol: string,
    cantUsuRol:number
  ) {
    this.rolId = codRol;
    this.rolNombre = nomRol;
    this.cantUsuarios = cantUsuRol;
  }
}
