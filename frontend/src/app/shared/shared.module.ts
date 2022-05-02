import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { UnidadesPipe } from './pipes/unidades.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { NgxLoadersCssModule } from 'ngx-loaders-css';
import { StyleCellDirective } from './directives/style-cell.directive';


const services: any[]=[ApiService]
const declaraciones:any=[UnidadesPipe,LoaderComponent,StyleCellDirective]

@NgModule({
  declarations: [
    ...declaraciones,
    
    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxLoadersCssModule
  ],
  providers:[...services],
  exports:[...declaraciones]
})
export class SharedModule { }
