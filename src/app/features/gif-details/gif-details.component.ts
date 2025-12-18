import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GiphyService, ToastService } from '../../core/services';
import { Gif } from '../../core/models';
import { LoadingComponent, ErrorMessageComponent } from '../../shared/components';
import { GifUtils, ErrorHandlerUtils } from '../../shared/utils';

@Component({
  selector: 'app-gif-details',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorMessageComponent],
  templateUrl: './gif-details.component.html',
  styleUrl: './gif-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GifDetailsComponent implements OnInit {
  gif = signal<Gif | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private giphyService: GiphyService,
    private toastService: ToastService
  ) {}

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

  copyLink(url: string): void {
    GifUtils.copyLink(url, this.toastService);
  }

  downloadGif(url: string, title: string): void {
    GifUtils.downloadGif(url, title, this.toastService);
  }
}

