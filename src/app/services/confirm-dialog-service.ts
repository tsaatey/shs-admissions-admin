import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  async confirmAction(
    title: string,
    text: string,
    confirmButtonText: string = 'Confirm',
    confirmButtonClass: string = '#d33',
    cancelButtonClass: string = '#3085d6',
    icon: 'warning' | 'info' | 'success' | 'error' | 'question' = 'warning'
  ): Promise<boolean> {
    const result = await Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: confirmButtonClass,
      cancelButtonColor: cancelButtonClass,
      confirmButtonText: confirmButtonText,
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });

    return result.isConfirmed;
  }

  showLoader(title: string, iconClass: string = 'swal2-icon-loading') {
    Swal.fire({
      title: title,
      didOpen: () => {
        Swal.showLoading(Swal.getConfirmButton());
      },
      allowOutsideClick: false,
      customClass: {
        popup: iconClass,
      },
    });
  }

  hideLoader() {
    Swal.close();
  }

  async showError(error: string) {
    await Swal.fire('Error', error, 'error');
  }
}
