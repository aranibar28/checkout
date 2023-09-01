import { Component, OnInit } from '@angular/core';
import { RjxService } from '../services';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  payment = false;

  constructor(private rjx: RjxService) {}

  ngOnInit(): void {
    this.rjx.ModalClassPago.subscribe((v) => {
      this.payment = v;
    });
  }

  closeModal() {
    this.rjx.updModalMercadoPago(false);
  }
}
