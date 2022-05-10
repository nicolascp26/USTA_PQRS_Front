export class Rol {
  public rolID: number;
  public rolNombre: string;
  public constructor(
    codRol: number,
    nomRol: string
  ) {
    this.rolID = codRol;
    this.rolNombre = nomRol;
  }
}
