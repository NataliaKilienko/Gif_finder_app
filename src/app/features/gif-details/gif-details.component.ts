import { Component, OnInit, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { GiphyService } from '../../core/services';
import { Gif } from '../../core/models';
import { LoadingComponent, ErrorMessageComponent } from '../../shared/components';
import { ErrorHandlerUtils } from '../../shared/utils';
import { GifActionsBase } from '../../shared/base/gif-actions.base';

@Component({
  selector: 'app-gif-details',
  standalone: true,
  imports: [CommonModule, MatIconModule, LoadingComponent, ErrorMessageComponent],
  templateUrl: './gif-details.component.html',
  styleUrl: './gif-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GifDetailsComponent extends GifActionsBase implements OnInit {
  gif = signal<Gif | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  private route = inject(ActivatedRoute);
  private giphyService = inject(GiphyService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadGifDetails(id);
    }
  }

  loadGifDetails(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.giphyService.getGifById(id).subscribe({
      next: (response) => {
        this.gif.set(response.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(ErrorHandlerUtils.getErrorMessage(err));
        console.error('Error fetching GIF details:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}

