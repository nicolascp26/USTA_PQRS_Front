export class Pregunta {
  public prefId: number;
  public prefTitulo: string;
  public prefDetalle: string;
  public constructor(cod: number, tit: string, det: string) {
    this.prefId = cod;
    this.prefTitulo = tit;
    this.prefDetalle = det;
  }
}
