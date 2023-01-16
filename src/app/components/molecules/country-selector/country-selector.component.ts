import {Component, EventEmitter, Output} from '@angular/core';
import {Countries, PopestiapiService} from "../../../services/popestiapi.service";

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.scss']
})
export class CountrySelectorComponent {

  @Output() selectedCountry = new EventEmitter<any>();

  countriesList: Countries[] = [];
  country: string = ''

  constructor(private _popestiapiService: PopestiapiService) {
    this._popestiapiService.getAllCountries().subscribe({
      next: (data) => {
        this.countriesList = data.sort((a, b) => a.Country.localeCompare(b.Country))
      }
    })
  }

  onSelectCountry(value: string) {
    this.country = value;
    this.selectedCountry.emit(this.country);
  }
}
