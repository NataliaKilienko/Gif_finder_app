import { ToastService } from '../../core/services/toast.service';

export class GifUtils {
  static copyLink(url: string, toastService: ToastService): void {
    navigator.clipboard.writeText(url).then(() => {
      toastService.success('Link copied to clipboard!');
    }).catch(() => {
      toastService.error('Failed to copy link');
    });
  }

  static downloadGif(url: string, title: string, toastService: ToastService): void {
    toastService.info('Downloading GIF...');

    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${title || 'gif'}.gif`;
        link.click();
        URL.revokeObjectURL(link.href);
        toastService.success('GIF downloaded successfully!');
      })
      .catch(err => {
        console.error('Error downloading GIF:', err);
        toastService.error('Failed to download GIF');
      });
  }
}

