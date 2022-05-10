import { Rol } from './rol';
import { Imagen } from './imagen';

export class Usuario {
  public usuarioID: number;
  public usuarioNombres: string;
  public usuarioApellidos: string;
  public usuarioDocumento: string;
  public usuarioTelefono: string;
  public usuarioRol: Rol;
  public correoUsuario?: string;
  public constructor(
    cod: number,
    nom: string,
    ape: string,
    doc: string,
    tel: string,
    rol: Rol
  ) {
    this.usuarioID = cod;
    this.usuarioNombres = nom;
    this.usuarioApellidos = ape;
    this.usuarioDocumento = doc;
    this.usuarioTelefono = tel;
    this.usuarioRol = rol;
    this.correoUsuario = '';
  }
}
