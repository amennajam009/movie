import { Component } from '@angular/core';
import { MovieService } from '../../shared/services/movie.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { SearchService } from '../../shared/services/search.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  movies: any[] = [];
  results: any = {};
  favorites: any[] = [];
  query: string = '';
  page = 1;
  totalPages = 0;
  totalResults = 0;
  readonly PAGE_CAP = 500;
  searchMode = false;
  loading = false;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private localStorage: LocalStorageService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.listenToSearch();
  }

  listenToSearch() {
    this.searchService.currentQuery.subscribe((query) => {
      this.query = query.trim();
      this.page = 1;
      if (this.query) {
        this.searchMovies();
      } else {
        this.getMovies();
      }
    });
  }

  getMovies(page = 1) {
    this.searchMode = false;
    this.movieService.getPopularMovies(page).subscribe((res) => {
      this.applyPage(res);
    });
  }

  searchMovies(page = 1) {
    const q = this.query;
    if (!q) return this.getMovies(1);
    this.searchMode = true;
    this.movieService.searchMovies(q, page).subscribe({
      next: (results) => {
        this.loading = false;
        this.applyPage(results);
      },
      error: (err) => {
        this.movies = [];
        this.loading = false;
      },
    });
  }

  applyPage(res: any) {
    const newResults = res?.results ?? [];
    if (this.searchMode && this.page > 1) {
      this.movies = [...this.movies, ...newResults];
    } else {
      this.movies = newResults;
    }
    this.page = res?.page ?? 1;
    this.totalPages = Math.min(res?.total_pages ?? 0, this.PAGE_CAP);
    this.totalResults = res?.total_results ?? 0;
  }

  onScrollDown() {
    if (!this.searchMode) return;
    if (this.page < this.totalPages) {
      this.page++;
      this.searchMovies(this.page);
    }
  }

  getImageUrl(path: string | null): string {
    return this.movieService.getImageUrl(path);
  }

  goToMovieDetail(movieId: number): void {
    this.router.navigate(['/movie-detail', movieId]);
  }

  go(p: number) {
    if (p < 1 || (this.totalPages && p > this.totalPages)) return;
    this.query.trim() ? this.searchMovies(p) : this.getMovies(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  isFavorite(movieId: number): boolean {
    this.favorites = this.localStorage.getFavorites();
    return this.favorites.some((m) => m.id === movieId);
  }

  toggleFavorite(movie: any) {
    if (this.isFavorite(movie.id)) {
      this.favorites = this.favorites.filter((m) => m.id !== movie.id);
    } else {
      this.favorites = [...this.favorites, movie];
    }
    this.localStorage.saveFavorites(this.favorites);
  }
}
