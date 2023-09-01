import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotifyService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, title: string = '') {
    return this.toastr.success(message, title);
  }
  showError(message: string, title: string = '') {
    return this.toastr.error(message, title);
  }
  showWarning(message: string, title: string = '') {
    return this.toastr.warning(message, title);
  }
  showInfo(message: string, title: string = '') {
    return this.toastr.info(message, title);
  }
}
