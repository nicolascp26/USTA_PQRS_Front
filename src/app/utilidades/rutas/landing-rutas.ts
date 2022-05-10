import { Routes } from '@angular/router';

export const RUTAS_LANDING: Routes = [
  {path:'landing',loadChildren:()=>import('../../modulos/publico/publico.module').then(m=>m.PublicoModule)},
  {path:'',redirectTo:'landing',pathMatch:'full'}
]
