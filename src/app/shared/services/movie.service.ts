import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:HttpClient) { }

  
 getPopularMovies(page = 1) {
  const params = new HttpParams()
    .set('page', page)
    .set('api_key', env.tmdbKey); 
  return this.http.get(`${env.tmdbApi}/movie/popular`, { params });
 }


 getMovieById(id: number) {
  const params = new HttpParams().set('api_key', env.tmdbKey);
  return this.http.get(`${env.tmdbApi}/movie/${id}`, { params });
 }


 searchMovies(query: string, page = 1) {
  const params = new HttpParams()
    .set('query', query)
    .set('page', page)
    .set('api_key', env.tmdbKey);

  return this.http.get(`${env.tmdbApi}/search/movie`, { params });
 }


  getImageUrl(path: string | null) {
    if (!path) return '';
    return `${env.tmdbImageBase}/w500${path}`;
  }
}
