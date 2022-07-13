import { Rol } from './rol';
import { Imagen } from './imagen';

export class Usuario {
  public usuarioId: number;
  public usuarioNombres: string;
  public usuarioApellidos: string;
  public usuarioDocumento: string;
  public usuarioTelefono: string;
  public usuarioRol: Rol;
  public constructor(
    cod: number,
    nom: string,
    ape: string,
    doc: string,
    tel: string,
    rol: Rol
  ) {
    this.usuarioId = cod;
    this.usuarioNombres = nom;
    this.usuarioApellidos = ape;
    this.usuarioDocumento = doc;
    this.usuarioTelefono = tel;
    this.usuarioRol = rol;
  }
}
