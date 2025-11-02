import { MovieService } from './../../shared/services/movie.service';
// movie-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment as env} from '../../../environments/environment';


@Component({
  selector: 'app-movie-detail',
  standalone: false,
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent implements OnInit {
  id!: number;
  movie: any = null;
  loading = true;
  error: string | null = null;

  constructor(
    private router: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    this.getMovieDetails();
  }

  //get movie details
  getMovieDetails() {
    this.loading = true;
    this.movieService.getMovieById(this.id).subscribe({
      next: (res: any) => {
        this.movie = res;
        this.loading = false;
      },
      error: (err:any) => {
        this.error = 'Failed to load movie details.';
        this.loading = false;
      }
    });
  }


  img(path: string | null, size: 'w500' | 'w780' | 'original' = 'w780'): string {
    return path ? `${env.tmdbImageBase}/${size}${path}` : 'assets/placeholder-poster.svg';
  }

  toHM(mins?: number): string {
    if (mins === undefined || mins === null) return '';
    const h = Math.floor(mins / 60), m = mins % 60;
    return h ? `${h}h ${m}m` : `${m}m`;
  }

  getNames(items: any[]): string {
  return items?.map(x => x.name).join(', ') || '';
  }
}
