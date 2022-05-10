import { Rol } from './rol';
import { Imagen } from './imagen';

export class Registro {
  public usuarioNombres: string;
  public usuarioApellidos: string;
  public usuarioCorreo: string;
  public usuarioClave: string;
  public usuarioConfirmaClave?: string;
  public constructor(
    nom: string,
    ape: string,
    corr: string,
    cla: string
  ) {
    this.usuarioNombres = nom;
    this.usuarioApellidos = ape;
    this.usuarioCorreo = corr;
    this.usuarioClave = cla;
  }
}
