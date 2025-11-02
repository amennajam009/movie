import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollDirective, InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { HeroSectionComponent } from './pages/hero-section/hero-section.component';
import { FavoriteListComponent } from './pages/favorite-list/favorite-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieDetailComponent,
    NavbarComponent,
    HeroSectionComponent,
    FavoriteListComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // HttpClientModule,
    FormsModule,
    // InfiniteScrollModule,
    InfiniteScrollDirective
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent]
})
export class AppModule { }
