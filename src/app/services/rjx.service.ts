import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Plan, Subscripcion } from '../models';

@Injectable()
export class RjxService {
  public PlanModel = new BehaviorSubject<Plan>(new Plan());
  public ModalClass = new BehaviorSubject<boolean>(false);
  public ModalClassInfoCuentas = new BehaviorSubject<boolean>(false);
  public ModalMercadoPago = new BehaviorSubject<boolean>(false);
  public ModalClassPago = new BehaviorSubject<boolean>(false);
  public ModalClassContrato = new BehaviorSubject<boolean>(false);
  public SubscripcionModel = new BehaviorSubject<Subscripcion>(
    new Subscripcion()
  );

  public RucModel = new BehaviorSubject<string>('');

  updModalMercadoPago(v: boolean) {
    this.ModalMercadoPago.next(v);
  }
  upRucModel(v: string) {
    this.RucModel.next(v);
  }
  upSubscripcion(s: Subscripcion) {
    this.SubscripcionModel.next(s);
  }
  updatePlanModel(plan: Plan) {
    this.PlanModel.next(plan);
  }
  shModal(v: boolean) {
    this.ModalClass.next(v);
  }
  shModalCuentas(v: boolean) {
    this.ModalClassInfoCuentas.next(v);
  }
  shModalPago(v: boolean) {
    this.ModalClassPago.next(v);
  }
  shModalContrato(v: boolean) {
    this.ModalClassContrato.next(v);
  }
}
