import { Component } from '@angular/core';
import { OmdbApiService } from '../../services/omdb-api.service.spec';
import { IOMDBResponse } from '../../omdbresponse';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-searchtitle',
  imports: [CommonModule, RouterOutlet], // Add necessary modules
  templateUrl: './searchtitle.component.html',
  styleUrls: ['./searchtitle.component.css']})
  export class SearchtitleComponent {
    title = 'Movie Finder';
    movieData: IOMDBResponse | undefined;
    errorMessage: any;
  
    constructor(private _omdbService: OmdbApiService) {} // Private property _omdbService
  
    getMovieDetails(movieName: string): boolean {
      this._omdbService.getMovieData(movieName).subscribe(
        movieData => {
          this.movieData = movieData;
          console.log("Director name : " + this.movieData.Director);
        }
      );
      return false;
    }
  }
