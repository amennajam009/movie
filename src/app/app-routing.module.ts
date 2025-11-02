import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { FavoriteListComponent } from './pages/favorite-list/favorite-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'movies', component: HomeComponent},
  {path: 'movie-detail/:id', component:MovieDetailComponent},
  {path: 'my-list', component:FavoriteListComponent},
  {path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
