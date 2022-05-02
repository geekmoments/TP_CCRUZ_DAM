import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutHomeComponent } from './templates/layout-home/layout-home.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutHomeComponent,
    children:[
      {
        path:'',
        loadChildren:()=>import("../modules/home/home.module").then(m=>m.HomeModule)

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
