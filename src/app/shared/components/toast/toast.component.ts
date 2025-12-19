import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { ToastService } from '../../../core/services/toast.service';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  icon: string;
}

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts = signal<Toast[]>([]);
  private nextId = 0;
  private subscription?: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscription = this.toastService.toast$.subscribe(({ message, type }) => {
      this.show(message, type);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  show(message: string, type: 'success' | 'error' | 'info' = 'success'): void {
    const icon = type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info';
    const toast: Toast = {
      id: this.nextId++,
      message,
      type,
      icon
    };

    this.toasts.update(toasts => [...toasts, toast]);

    setTimeout(() => {
      this.remove(toast.id);
    }, 3000);
  }

  remove(id: number): void {
    this.toasts.update(toasts => toasts.filter(t => t.id !== id));
  }
}

