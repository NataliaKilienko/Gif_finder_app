import { Component, OnInit, signal, ChangeDetectionStrategy, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { GiphyService } from '../../core/services';
import { Gif } from '../../core/models';
import { PAGINATION_CONFIG } from '../../core/constants';
import { LoadingComponent, ErrorMessageComponent, EmptyStateComponent } from '../../shared/components';
import { ErrorHandlerUtils } from '../../shared/utils';
import { GifActionsBase } from '../../shared/base/gif-actions.base';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, LoadingComponent, ErrorMessageComponent, EmptyStateComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent extends GifActionsBase implements OnInit {
  searchQuery = signal('');
  gifs = signal<Gif[]>([]);
  loading = signal(false);
  loadingMore = signal(false);
  error = signal<string | null>(null);
  hasSearched = signal(false);
  isTrending = signal(true);

  currentPage = signal(1);
  itemsPerPage = signal(PAGINATION_CONFIG.DEFAULT_PAGE_SIZE);
  totalCount = signal(0);
  hasMoreGifs = signal(true);

  popularSearches = ['funny cats', 'reaction', 'happy dance', 'thumbs up', 'celebration'];

  protected readonly Math = Math;
  private giphyService = inject(GiphyService);

  ngOnInit(): void {
    this.loadTrendingGifs();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.loading() || this.loadingMore() || !this.hasMoreGifs()) {
      return;
    }

    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const threshold = 200;

    if (scrollPosition >= documentHeight - threshold) {
      this.loadMoreGifs();
    }
  }

  loadTrendingGifs(append: boolean = false): void {
    this.isTrending.set(true);
    this.loadGifsData(() => {
      const offset = (this.currentPage() - 1) * this.itemsPerPage();
      return this.giphyService.getTrendingGifs(this.itemsPerPage(), offset);
    }, append);
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

  loadGifs(append: boolean = false): void {
    const query = this.searchQuery();
    if (!query.trim()) {
      this.clearResults();
      return;
    }

    this.hasSearched.set(true);
    this.loadGifsData(() => {
      const offset = (this.currentPage() - 1) * this.itemsPerPage();
      return this.giphyService.searchGifs(query, this.itemsPerPage(), offset);
    }, append);
  }

  loadMoreGifs(): void {
    if (!this.hasMoreGifs() || this.loadingMore()) {
      return;
    }

    this.currentPage.set(this.currentPage() + 1);

    if (this.isTrending()) {
      this.loadTrendingGifs(true);
    } else {
      this.loadGifs(true);
    }
  }

  private loadGifsData(apiCall: () => any, append: boolean = false): void {
    if (append) {
      this.loadingMore.set(true);
    } else {
      this.loading.set(true);
    }
    this.error.set(null);

    apiCall().subscribe({
      next: (response: any) => {
        const newGifs = response.data;

        if (append) {
          this.gifs.set([...this.gifs(), ...newGifs]);
          this.loadingMore.set(false);
        } else {
          this.gifs.set(newGifs);
          this.loading.set(false);
        }

        this.totalCount.set(response.pagination.total_count);

        const totalLoaded = this.currentPage() * this.itemsPerPage();
        this.hasMoreGifs.set(totalLoaded < response.pagination.total_count);
      },
      error: (err: any) => {
        if (!append) {
          this.gifs.set([]);
          this.totalCount.set(0);
        }
        this.loading.set(false);
        this.loadingMore.set(false);
        this.hasMoreGifs.set(false);
        this.error.set(ErrorHandlerUtils.getErrorMessage(err));
        console.error('Error fetching GIFs:', err);
      }
    });
  }

  clearResults(): void {
    this.gifs.set([]);
    this.totalCount.set(0);
    this.currentPage.set(1);
    this.error.set(null);
    this.hasSearched.set(false);
    this.hasMoreGifs.set(true);
  }

}

