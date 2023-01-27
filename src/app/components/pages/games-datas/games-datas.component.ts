import { Component } from '@angular/core';
import {IGamesGenres, PopestiapiService} from "../../../services/popestiapi.service";
import {DataHandlingService, Idataset} from "../../../services/data-handling.service";

@Component({
  selector: 'app-games-datas',
  templateUrl: './games-datas.component.html',
  styleUrls: ['./games-datas.component.scss']
})
export class GamesDatasComponent {

  gamesDatas: any;
  genreDataset: any;
  genreLabels: any;
  gamesChartOptions: any;
  gamesIsLoaded: boolean = false;
  genresAverageDatas: any;
  genresAverageDataset: any;
  genresAverageLabels: any;
  gamesAverageOptions: any;

  constructor(private _popestiapiService : PopestiapiService, private _dataHandlingService: DataHandlingService) {

    this._popestiapiService.getAllGenres().subscribe({
      next: (data) => {
        console.log(data)
        this.gamesIsLoaded = true;
        this.gamesDatas = this._dataHandlingService.gamesGenreDataHandler(data.results);
        this.genresAverageDatas = this._dataHandlingService.percentageGamesbyGenreDataHandler(data.results);
        this.genreDataset = this.gamesDatas.dataset;
        this.genreLabels = this.gamesDatas.labels;
        this.genresAverageDataset = this.genresAverageDatas.dataset;
        this.genresAverageLabels = this.genresAverageDatas.labels;
        this.gamesChartOptions = {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            y: {
              display: false,
            },
            x: {
              display: false,
            }
          }
        };
        this.gamesAverageOptions = {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false,
            }
          },
          scales: {
            y: {
              ticks: { color: 'black' },
              stacked: true,
            },
            x: {
              ticks: { color: 'black' },
              stacked: true,
            }
          }
        }
      }
    })
  }
}
