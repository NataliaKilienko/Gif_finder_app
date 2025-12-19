import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService, FavoritesService } from '../../core/services';
import { Gif } from '../../core/models';
import { GifUtils } from '../utils';

export abstract class GifActionsBase {
  protected router = inject(Router);
  protected toastService = inject(ToastService);
  protected favoritesService = inject(FavoritesService);

  viewDetails(gifId: string): void {
    this.router.navigate(['/gif', gifId]);
  }

  copyLink(url: string): void {
    GifUtils.copyLink(url, this.toastService);
  }

  downloadGif(url: string, title: string): void {
    GifUtils.downloadGif(url, title, this.toastService);
  }

  toggleFavorite(gif: Gif): void {
    const isFavorite = this.favoritesService.toggleFavorite(gif);
    if (isFavorite) {
      this.toastService.success('Added to favorites!');
    } else {
      this.toastService.info('Removed from favorites');
    }
  }

  isFavorite(gifId: string): boolean {
    return this.favoritesService.isFavorite(gifId);
  }

  trackByGifId(_index: number, gif: Gif): string {
    return gif.id;
  }
}

