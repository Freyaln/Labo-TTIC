import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CompaniesDatasComponent} from "./components/pages/companies-datas/companies-datas.component";
import {HomepageComponent} from "./components/pages/homepage/homepage.component";

const routes: Routes = [
  {path: 'homepage', component: HomepageComponent},
  {path: 'companies-datas', component: CompaniesDatasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
