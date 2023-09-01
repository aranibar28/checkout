import { Injectable } from '@angular/core';
import { RequestCheckout } from '../models';
import { ApiService } from './api.service';
@Injectable()
export class CheckoutService {
  constructor(private api: ApiService) {}

  post(data: RequestCheckout) {
    return this.api.post('/MantSubscription/AddPlanAccountMP', data);
  }
  getContrato(data: any, lista: any) {
    var json = { obj: {}, list: [] };
    json.obj = data;
    json.list = lista;

    return this.api.post('/PlanSubscription/GetContratoByData', json);
  }
  postPago(data: any) {
    return this.api.post('/Node/AddPagoNode', data);
  }
}
