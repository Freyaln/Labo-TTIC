import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/molecules/navbar/navbar.component';
import { ButtonComponent } from './components/atoms/button/button.component';
import { SearchBarComponent } from './components/molecules/search-bar/search-bar.component';
import { HeaderComponent } from './components/organisms/header/header.component';
import { CompaniesDatasComponent } from './components/pages/companies-datas/companies-datas.component';
import {HttpClientModule} from "@angular/common/http";
import {NgChartsModule} from "ng2-charts";
import {FormsModule} from "@angular/forms";
import { SelectComponent } from './components/atoms/select/select.component';
import { OptionSelectorComponent } from './components/molecules/option-selector/option-selector.component';
import { ChecboxSelectorComponent } from './components/molecules/checbox-selector/checbox-selector.component';
import { ChartTypeSelectorComponent } from './components/molecules/chart-type-selector/chart-type-selector.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { DatePickerComponent } from './components/molecules/date-picker/date-picker.component';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { LinkListComponent } from './components/atoms/link-list/link-list.component';
import { MainPageComponent } from './components/templates/main-page/main-page.component';
import { LoadingSpinnerComponent } from './components/atoms/loading-spinner/loading-spinner.component';
import { ChartComponent } from './components/organisms/chart/chart.component';
import { ListComponent } from './components/atoms/list/list.component';
import { GamesDatasComponent } from './components/pages/games-datas/games-datas.component';
import { ButtonListComponent } from './components/molecules/button-list/button-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ButtonComponent,
    SearchBarComponent,
    HeaderComponent,
    CompaniesDatasComponent,
    SelectComponent,
    OptionSelectorComponent,
    ChecboxSelectorComponent,
    ChartTypeSelectorComponent,
    DatePickerComponent,
    HomepageComponent,
    LinkListComponent,
    MainPageComponent,
    LoadingSpinnerComponent,
    ChartComponent,
    ListComponent,
    GamesDatasComponent,
    ButtonListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
