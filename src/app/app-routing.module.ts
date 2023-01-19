import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ByCountryComponent} from "./components/pages/by-country/by-country.component";
import {ComparisonsComponent} from "./components/pages/comparisons/comparisons.component";
import {LiveCasesComponent} from "./components/pages/live-cases/live-cases.component";
import {GeneralInfosComponent} from "./components/pages/general-infos/general-infos.component";
import {HomepageComponent} from "./components/pages/homepage/homepage.component";

const routes: Routes = [
  {path: 'homepage', component: HomepageComponent},
  {path: 'by-country', component: ByCountryComponent},
  {path: 'comparisons', component: ComparisonsComponent},
  {path: 'live-cases', component: LiveCasesComponent},
  {path: 'general-infos', component: GeneralInfosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
