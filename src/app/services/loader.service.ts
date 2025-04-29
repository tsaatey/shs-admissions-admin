import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  showLoader(title: string, message?: string) {
    Swal.fire({
      title: `<span style="font-size: 14px; text-align:center;">${title}</span>`, // Custom font size for title
      html: message ? `<p>${message}</p>` : '', // Optional message under the loader
      didOpen: () => {
        Swal.showLoading(null);
      },
      allowOutsideClick: false,
    });
  }

  hideLoader() {
    Swal.close();
  }
}
