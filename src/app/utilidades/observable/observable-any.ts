import { Observer } from "rxjs";

export const observadorAny: Observer<any> = {
  next(res) {
    // console.log(res);
  },
  error(err) {
    // console.log(err);
  },
  complete() {
    // console.log('Completado');
  }
}
