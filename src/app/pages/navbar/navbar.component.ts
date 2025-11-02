import { Component } from '@angular/core';
import { SearchService } from '../../shared/services/search.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isOpen = false;
  query: string = '';

  navItems = [
    { label: 'Movies', path: '/movies' },
    { label: 'My List', path: '/my-list' },
  ];

  constructor(private searchService: SearchService) {}

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  onSearch() {
    this.searchService.updateQuery(this.query);
  }
}
