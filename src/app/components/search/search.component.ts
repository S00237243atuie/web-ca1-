import { Component } from '@angular/core';
import { IOMDBResponse2 } from '../../omdbmresponse2';
import { OmdbApiService } from '../../services/omdb-api.service';
import { CommonModule } from '@angular/common';
import { IOMDBResponse } from '../../omdbresponse';


@Component({
  selector: 'app-search',
  standalone: true, // Ensure it's a standalone component
  imports: [CommonModule], // Import necessary modules
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  movieData: IOMDBResponse2 | undefined; // Holds movie data
  currentPage: number = 1; // Default page number
  maxPages: number = 0; // Total pages available
  errorMessage: any; // Stores error messages

  constructor(private _omdbService: OmdbApiService) { }
  getMovieDetails(movieName:string): boolean {
    this._omdbService.getMoviesData(movieName,this.currentPage).subscribe(
      movieData => {
        this.movieData=movieData;
        //console.log("Director name : " + this.movieData.Director);
      }
    )
    return false;
  }

  getPreviousPage(movieName:string): boolean {
    this.currentPage--;
    if (this.currentPage<1)
      this.currentPage=1;
    this._omdbService.getMoviesData(movieName, this.currentPage).subscribe(
      movieData => {
        this.movieData=movieData;
      }
    )
    return false;
  }

  getNextPage(movieName:string): boolean {
    this.currentPage++;
    this._omdbService.getMoviesData(movieName, this.currentPage).subscribe(
      movieData => {
        this.movieData=movieData;
      }
    )
    return false;
  }
}

