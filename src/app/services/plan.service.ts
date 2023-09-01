import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class PlanService {
  constructor(private api: ApiService) {}

  getPlanesById(id: number) {
    return this.api.get('/MantSubscription/GetPlanesBySubscription?Id=' + id);
  }
  getLicenciasAdicionales(mes: number, id: number) {
    return this.api.get(
      '/MantSubscription/GetLicenciasByDuracionMes?Id=' +
        mes +
        '&IdSubscripcion=' +
        id
    );
  }
  getPlanesPagosPendientes(ruc: string) {
    return this.api.get('/Node/GetPlanesPagosPendientes?Ruc=' + ruc);
  }
}
