export class Tipo {
  public tipoId: number;
  public tipoClase: string;
  public tipoNombre: string;
  public cantTipo?: number;
  public constructor(
    codTipo: number,
    claseTipo: string,
    nomTipo: string,
    cantTipo: number
  ) {
    this.tipoId = codTipo;
    this.tipoClase = claseTipo;
    this.tipoNombre = nomTipo;
    this.cantTipo = cantTipo;
  }
}
