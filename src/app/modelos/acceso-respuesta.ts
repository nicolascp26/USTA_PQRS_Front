export class AccesoRespuesta {
  public token: string;
  public foto: string;
  public rol?: string | any;

  public constructor(tok: string, fot: string) {
    this.token = tok;
    this.foto = fot;
  }
}
