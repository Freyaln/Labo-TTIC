import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesDatasComponent } from './components/pages/companies-datas/companies-datas.component';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { GamesDatasComponent } from './components/pages/games-datas/games-datas.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'companies-datas', component: CompaniesDatasComponent },
  { path: 'games-datas', component: GamesDatasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
