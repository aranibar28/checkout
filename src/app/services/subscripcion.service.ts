import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class SubscripcionService {
  constructor(private api: ApiService) {}

  findSubscripcionById(id: number) {
    return this.api.get('/MantSubscription/FindSubscriptionById?IdSub=' + id);
  }
  getSessionPlanes(request: any) {
    return this.api.post(
      '/PlanSubscription/GetSessionPlanesSubscription',
      request
    );
  }
}
