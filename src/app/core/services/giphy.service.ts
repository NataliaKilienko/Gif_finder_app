import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GiphyResponse, GiphySingleResponse } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  private readonly apiUrl = environment.giphyApiUrl;
  private readonly apiKey = environment.giphyApiKey;

  constructor(private http: HttpClient) {}

  searchGifs(query: string, limit: number = 25, offset: number = 0): Observable<GiphyResponse> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', query)
      .set('limit', limit.toString())
      .set('offset', offset.toString())
      .set('rating', 'g')
      .set('lang', 'en');

    return this.http.get<GiphyResponse>(`${this.apiUrl}/search`, { params });
  }

  getGifById(id: string): Observable<GiphySingleResponse> {
    const params = new HttpParams()
      .set('api_key', this.apiKey);

    return this.http.get<GiphySingleResponse>(`${this.apiUrl}/${id}`, { params });
  }

  getTrendingGifs(limit: number = 25, offset: number = 0): Observable<GiphyResponse> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', limit.toString())
      .set('offset', offset.toString())
      .set('rating', 'g');

    return this.http.get<GiphyResponse>(`${this.apiUrl}/trending`, { params });
  }
}

