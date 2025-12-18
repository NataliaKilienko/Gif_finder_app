import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorMessageComponent {
  message = input.required<string>();
  buttonText = input<string>('Try Again');
  retry = output<void>();

  onRetry(): void {
    this.retry.emit();
  }
}

