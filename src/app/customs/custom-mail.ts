import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MercadoPagoService } from '../services';



@Injectable()
export class MailValidation {
  constructor(private _service: MercadoPagoService) {}

  mailValidatorExist(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value != null) {
      return { CorreoOrganization: this.existMail(control.value) };
    }
    return null;
  }

  existMail(v: string): boolean {
    var request = {
      CorreoOrganization: v,
    };
    this._service.existEmail(request).subscribe(
      (data) => {
        return data;
      },
      (e) => {
        return false;
      }
    );
    return false;
  }
}
