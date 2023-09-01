import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class MercadoPagoService {
  apiMercadoPago = '/api/v1/timercadopago';
  constructor(private api: ApiService) {}

  getMetodosPagos() {
    return this.api.get(`${this.apiMercadoPago}/GetMetodosPagos`);
  }
  getMercadoPagoSetting() {
    return this.api.get(`${this.apiMercadoPago}/GetMercadoPagoSetting`);
  }
  existEmail(data: any) {
    return this.api.post(`${this.apiMercadoPago}/ExistEmail`, data);
  }
  existEmpresa(data: any) {
    return this.api.post(`${this.apiMercadoPago}/ExistEmpresa`, data);
  }
  getInfoUserById(id:number){
    return this.api.get(`${this.apiMercadoPago}/GetInfouserById/${id}`);
  }
}
