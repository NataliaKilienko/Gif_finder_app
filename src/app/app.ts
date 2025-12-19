import { Component, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ToastComponent } from './shared/components';
import { FavoritesService } from './core/services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'GIF Finder';

  favoritesCount = computed(() => this.favoritesService.getFavoritesCount());

  constructor(private favoritesService: FavoritesService) {}
}
