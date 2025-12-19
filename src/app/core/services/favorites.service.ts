import { Injectable, signal } from '@angular/core';
import { Gif } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'gif_favorites';
  private favoritesSignal = signal<Gif[]>([]);

  favorites = this.favoritesSignal.asReadonly();

  constructor() {
    this.loadFavoritesFromStorage();
  }

  private loadFavoritesFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const favorites = JSON.parse(stored) as Gif[];
        this.favoritesSignal.set(favorites);
      }
    } catch (error) {
      console.error('Error loading favorites from storage:', error);
      this.favoritesSignal.set([]);
    }
  }

  private saveFavoritesToStorage(favorites: Gif[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to storage:', error);
    }
  }

  addToFavorites(gif: Gif): void {
    const currentFavorites = this.favoritesSignal();
    if (!this.isFavorite(gif.id)) {
      const updatedFavorites = [gif, ...currentFavorites];
      this.favoritesSignal.set(updatedFavorites);
      this.saveFavoritesToStorage(updatedFavorites);
    }
  }

  removeFromFavorites(gifId: string): void {
    const currentFavorites = this.favoritesSignal();
    const updatedFavorites = currentFavorites.filter(gif => gif.id !== gifId);
    this.favoritesSignal.set(updatedFavorites);
    this.saveFavoritesToStorage(updatedFavorites);
  }

  toggleFavorite(gif: Gif): boolean {
    if (this.isFavorite(gif.id)) {
      this.removeFromFavorites(gif.id);
      return false;
    } else {
      this.addToFavorites(gif);
      return true;
    }
  }

  isFavorite(gifId: string): boolean {
    return this.favoritesSignal().some(gif => gif.id === gifId);
  }

  getFavoritesCount(): number {
    return this.favoritesSignal().length;
  }

  clearAllFavorites(): void {
    this.favoritesSignal.set([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

