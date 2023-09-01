import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  $valor = new EventEmitter<any>();
  $valor2 = new EventEmitter<any>();

}
