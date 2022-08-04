export class Imagen {
  public imgId: number;
  public imgUsuarioId: number;
  public imgNombrePublico: string;
  public imgNombrePrivado: string;
  public imgTipo: string;
  public base64: string;
  public imgTamano?: string;

  constructor(
    codImg: number,
    usu: number,
    nomPub: string,
    nomPri: string,
    tipo: string,
    base: string
  ) {
    this.imgId = codImg;
    this.imgUsuarioId = usu;
    this.imgNombrePublico = nomPub;
    this.imgNombrePrivado = nomPri;
    this.imgTipo = tipo;
    this.base64 = base;
  }
}
