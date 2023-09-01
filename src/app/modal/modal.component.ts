import { Component, Input, OnInit } from '@angular/core';
import {
  faCircleNotch,
  faTimes,
  faCheck,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import { Subscripcion } from '../models';
import { RjxService } from '../services';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() status: boolean = false;
  @Input() message: string = '';
  @Input() loadingInp = false;
  @Input() idMetodoPago = 0;
  faCircleNotch = faCircleNotch;
  faTimes = faTimes;
  faCheck = faCheck;
  modalPago = false;
  faShare = faShare;
  subscripcionModel: Subscripcion = new Subscripcion();

  constructor(private data: RjxService) {}

  ngOnInit(): void {
    this.data.ModalClassPago.subscribe((v) => {
      this.modalPago = v;
    });
    this.data.SubscripcionModel.subscribe((v) => {
      this.subscripcionModel = v;
    });
  }
  showModalPago() {
    //this.data.upRucModel('20563529378');
    this.modalPago = true;
  }
  closeModal() {
    if (this.status) {
      window.location.reload();
      this.data.shModal(false);
    } else {
      this.data.shModal(false);
    }
  }
}
