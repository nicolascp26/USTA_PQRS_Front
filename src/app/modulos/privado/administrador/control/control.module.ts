import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlRoutingModule } from './control-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { ErrorSeguridadComponent } from './error-seguridad/error-seguridad.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressbarModule,ProgressbarConfig } from 'ngx-bootstrap/progressbar';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [InicioComponent, ErrorSeguridadComponent, PerfilComponent],
  imports: [CommonModule, FormsModule, ProgressbarModule, ControlRoutingModule,ImageCropperModule],
  providers:[ProgressbarConfig]
})
export class ControlModule {}
