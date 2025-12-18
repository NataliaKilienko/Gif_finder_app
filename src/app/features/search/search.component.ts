import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GiphyService, ToastService } from '../../core/services';
import { Gif } from '../../core/models';
import { PAGINATION_CONFIG } from '../../core/constants';
import { LoadingComponent, ErrorMessageComponent, EmptyStateComponent } from '../../shared/components';
import { GifUtils, ErrorHandlerUtils } from '../../shared/utils';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent, ErrorMessageComponent, EmptyStateComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  searchQuery = signal('');
  gifs = signal<Gif[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  hasSearched = signal(false);
  isTrending = signal(true);

  currentPage = signal(1);
  itemsPerPage = signal(PAGINATION_CONFIG.DEFAULT_PAGE_SIZE);
  totalCount = signal(0);
  totalPages = signal(0);

  popularSearches = ['funny cats', 'reaction', 'happy dance', 'thumbs up', 'celebration'];

  protected readonly Math = Math;

  constructor(
    private giphyService: GiphyService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadTrendingGifs();
  }

  loadTrendingGifs(): void {
    this.isTrending.set(true);
    this.loadGifsData(() => {
      const offset = (this.currentPage() - 1) * this.itemsPerPage();
      return this.giphyService.getTrendingGifs(this.itemsPerPage(), offset);
    });
  }

  onInputChange(): void {
    const query = this.searchQuery();
    if (!query.trim()) {
      this.clearResults();
      this.loadTrendingGifs();
    }
  }

  onSearch(): void {
    const query = this.searchQuery();
    if (!query.trim()) {
      this.clearResults();
      this.loadTrendingGifs();
      return;
    }
    this.currentPage.set(1);
    this.isTrending.set(false);
    this.hasSearched.set(true);
    this.loadGifs();
  }

  searchPopular(term: string): void {
    this.searchQuery.set(term);
    this.onSearch();
  }

  loadGifs(): void {
    const query = this.searchQuery();
    if (!query.trim()) {
      this.clearResults();
      return;
    }

    this.hasSearched.set(true);
    this.loadGifsData(() => {
      const offset = (this.currentPage() - 1) * this.itemsPerPage();
      return this.giphyService.searchGifs(query, this.itemsPerPage(), offset);
    });
  }

  private loadGifsData(apiCall: () => any): void {
    this.loading.set(true);
    this.error.set(null);

    apiCall().subscribe({
      next: (response: any) => {
        this.gifs.set(response.data);
        this.totalCount.set(response.pagination.total_count);
        this.totalPages.set(Math.ceil(response.pagination.total_count / this.itemsPerPage()));
        this.loading.set(false);
      },
      error: (err: any) => {
        this.gifs.set([]);
        this.totalCount.set(0);
        this.totalPages.set(0);
        this.loading.set(false);
        this.error.set(ErrorHandlerUtils.getErrorMessage(err));
        console.error('Error fetching GIFs:', err);
      }
    });
  }

  clearResults(): void {
    this.gifs.set([]);
    this.totalCount.set(0);
    this.totalPages.set(0);
    this.currentPage.set(1);
    this.error.set(null);
    this.hasSearched.set(false);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }
    this.currentPage.set(page);

    if (this.isTrending()) {
      this.loadTrendingGifs();
    } else {
      this.loadGifs();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.goToPage(this.currentPage() + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.goToPage(this.currentPage() - 1);
    }
  }

  getPageNumbers(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push(-1);
        pages.push(total);
      } else if (current >= total - 3) {
        pages.push(1);
        pages.push(-1);
        for (let i = total - 4; i <= total; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1);
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push(-1);
        pages.push(total);
      }
    }

    return pages;
  }

  viewDetails(gifId: string): void {
    this.router.navigate(['/gif', gifId]);
  }

  copyLink(url: string): void {
    GifUtils.copyLink(url, this.toastService);
  }

  downloadGif(url: string, title: string): void {
    GifUtils.downloadGif(url, title, this.toastService);
  }

  trackByGifId(_index: number, gif: Gif): string {
    return gif.id;
  }
}

