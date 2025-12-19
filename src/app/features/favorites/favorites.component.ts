import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Gif } from '../../core/models';
import { EmptyStateComponent, ConfirmDialogComponent } from '../../shared/components';
import { GifActionsBase } from '../../shared/base/gif-actions.base';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, MatIconModule, EmptyStateComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent extends GifActionsBase {
  private dialog = inject(MatDialog);

  removeFromFavorites(gif: Gif): void {
    this.favoritesService.removeFromFavorites(gif.id);
    this.toastService.info('Removed from favorites');
  }

  clearAll(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: 'Clear All Favorites?',
        message: 'Are you sure you want to remove all your favorite GIFs? This action cannot be undone.',
        confirmText: 'Yes, Clear All',
        cancelText: 'Cancel',
        icon: 'delete_forever'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.favoritesService.clearAllFavorites();
        this.toastService.success('All favorites cleared');
      }
    });
  }
}

