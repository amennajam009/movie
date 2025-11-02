import { Component } from '@angular/core';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Router } from '@angular/router';
import { MovieService } from '../../shared/services/movie.service';
import { SearchService } from '../../shared/services/search.service';

@Component({
  selector: 'app-favorite-list',
  standalone: false,
  templateUrl: './favorite-list.component.html',
  styleUrl: './favorite-list.component.scss',
})
export class FavoriteListComponent {
  favorites: any[] = [];
  query: string = '';
  filteredFavorites: any[] = [];

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private movieService: MovieService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.loadFavorites();
    this.listenToSearch();
  }

  listenToSearch() {
    this.searchService.currentQuery.subscribe((query) => {
      this.query = query.trim().toLowerCase();
      if (this.query) {
        this.filteredFavorites = this.favorites.filter((movie) =>
          movie.title.toLowerCase().includes(this.query)
        );
      } else {
        this.filteredFavorites = [...this.favorites];
      }
    });
  }

  loadFavorites() {
    this.favorites = this.localStorage.getFavorites() || [];
    this.filteredFavorites = [...this.favorites];
  }

  isFavorite(id: number) {
    return this.favorites.some((m) => m.id === id);
  }

  toggleFavorite(movie: any) {
    if (this.isFavorite(movie.id)) {
      this.favorites = this.favorites.filter((m) => m.id !== movie.id);
    } else {
      this.favorites = [...this.favorites, movie];
    }
    this.localStorage.saveFavorites(this.favorites);

    if (this.query) {
    this.filteredFavorites = this.favorites.filter((m) =>
      m.title.toLowerCase().includes(this.query)
    );
  } else {
    this.filteredFavorites = [...this.favorites];
  }
  }

  goToMovieDetail(id: number) {
    this.router.navigate(['/movie-detail', id]);
  }

  clearFavorites() {
    this.favorites = [];
    this.localStorage.saveFavorites(this.favorites);
  }

  getImageUrl(path: string | null) {
    return this.movieService.getImageUrl(path);
  }
}
