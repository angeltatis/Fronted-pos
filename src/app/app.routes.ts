import { Routes } from '@angular/router';
import { ConsultaUnidadComponent } from "./components/consulta-unidad/consulta-unidad.component";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductComponent } from "./components/product/product.component";
import { UnidadComponent } from './components/unidad/unidad.component';
export const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path:'product',component:ProductComponent},
  {path:'product/detail',component:UnidadComponent},
  {path: 'consulta/unid',component:ConsultaUnidadComponent},
  {path:'**',redirectTo:'',pathMatch:'full'}
];
