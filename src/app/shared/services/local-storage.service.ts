import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  saveFavorites(payload:any){
    localStorage.setItem('favorites', JSON.stringify(payload));
  }

  getFavorites(){
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  }

}
