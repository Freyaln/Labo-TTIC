import { Component } from '@angular/core';
import { PopestiapiService } from "../../../services/popestiapi.service";
import { DataHandlingService } from "../../../services/data-handling.service";

@Component({
  selector: 'app-comparisons',
  templateUrl: './comparisons.component.html',
  styleUrls: ['./comparisons.component.scss']
})
export class ComparisonsComponent {

  isLoaded: boolean = false;
  deathDatas: any;
  deathDataset: any;
  deathLabels: any;
  recoveredDatas: any;
  recoveredDataset: any;
  recoveredLabels: any;
  percentageDatas: any;
  percentageDataset: any;
  percentageLabels: any;
  options = {
    indexAxis: 'y',
    grouped: true
  }
  percentageOptions = {
    indexAxis: 'x',

  }

  constructor(private _popestiapiService: PopestiapiService, private _dataHandlingService: DataHandlingService) {

    this.isLoaded = false;
    this._popestiapiService.getAllDatas().subscribe({
      next: (data) => {
        this.isLoaded = true;
        this.deathDatas = this._dataHandlingService.deathsDataHandler(data);
        this.deathDataset = this.deathDatas.dataset;
        this.deathLabels = this.deathDatas.labels;
        this.recoveredDatas = this._dataHandlingService.confirmedDataHandler(data);
        this.recoveredDataset = this.recoveredDatas.dataset;
        console.log(this.recoveredDataset)
        this.recoveredLabels = this.recoveredDatas.labels;
        this.percentageDatas = this._dataHandlingService.percentageDeathsToConfirmedHandler(this.deathDatas, this.recoveredDatas)
        this.percentageDataset = this.percentageDatas.dataset
        console.log(this.percentageDataset)
        this.percentageLabels = this.percentageDatas.labels
      }
    })
  }
}
