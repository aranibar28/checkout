import { Component, OnInit } from '@angular/core';
import { RjxService } from '../services';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  modal: boolean = false;

  payment: boolean = false;

  constructor(private data: ModalService, private rjx: RjxService) {}

  ngOnInit(): void {
    this.rjx.ModalClass.subscribe((valor: boolean) => {
      this.modal = valor;
    });
    this.rjx.ModalMercadoPago.subscribe((valor: boolean) => {
      this.payment = valor;
    });
  }

  openModal() {
    this.modal = true;
  }

  openPayment() {
    this.payment = true;
  }
}
