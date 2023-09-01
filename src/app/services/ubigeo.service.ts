import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class UbigeoService {
  constructor(private api: ApiService) {}

  getDepartamentos() {
    return this.api.get('/Ubigeo/GetDepartamentos');
  }
  getProvincias(id: number) {
    return this.api.get('/Ubigeo/GetProvincias?IdDep=' + id);
  }
  getDistritos(id: number) {
    return this.api.get('/Ubigeo/GetDistritos?IdProv=' + id);
  }
}
