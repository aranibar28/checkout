import { Component, OnInit } from '@angular/core';
import { RjxService } from '../services';

@Component({
  selector: 'app-modal-infocuentas',
  templateUrl: './modal-infocuentas.component.html',
  styleUrls: ['./modal-infocuentas.component.scss'],
})
export class ModalInfocuentasComponent implements OnInit {
  constructor(private modal: RjxService) {}

  ngOnInit(): void {}

  closeModal() {
    this.modal.shModalCuentas(false);
  }
}
