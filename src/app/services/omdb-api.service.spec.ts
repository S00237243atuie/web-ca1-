import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs';
import { IOMDBResponse } from '../omdbresponse';
import { CommonModule } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OmdbApiService {

  // To deploy on Firebase hosting – this should be https
  private _siteURL = "https://www.omdbapi.com/";

  // Add your own API key from OMDBApi.com
  private _key = "?apikey=6a764513&t=";

  constructor(private _http: HttpClient) { }

  // Method to get movie data from OMDB API
  getMovieData(movieName: string): Observable<IOMDBResponse> {
    // Combine site URL, API key, and movie name to create the full API endpoint
    const apiUrl = `${this._siteURL}${this._key}${movieName}`;

    return this._http.get<IOMDBResponse>(apiUrl)
      .pipe(
        tap(data => console.log('Movie data retrieved:', data)),
        catchError(this.handleError)
      );
  }

  // Handle any errors from the API call
  private handleError(error: HttpErrorResponse) {
    console.error('Error fetching data:', error);
    return throwError(() => new Error('Something went wrong with the API request.'));
  }
}


