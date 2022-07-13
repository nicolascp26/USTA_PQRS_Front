import { Usuario } from './usuario';
export class Imagen {
  public imgId: number;
  public imgUsuario: Usuario;
  public imgNombrePublico: string;
  public imgNombrePrivado: string;
  public imgTipo: string;
  public base64: string;

  constructor(
    codImg: number,
    usu: Usuario,
    nomPub: string,
    nomPri: string,
    tipo: string,
    base: string
  ) {
    this.imgId = codImg;
    this.imgUsuario = usu;
    this.imgNombrePublico = nomPub;
    this.imgNombrePrivado = nomPri;
    this.imgTipo = tipo;
    this.base64 = base;
  }
}
