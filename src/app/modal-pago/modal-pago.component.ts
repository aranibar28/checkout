import { Component, OnInit } from '@angular/core';
import {
  faCheck,
  faCircleNotch,
  faShare,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { PlanEmpresa } from '../models';
import {
  CheckoutService,
  NotifyService,
  PlanService,
  RjxService,
} from '../services';

@Component({
  selector: 'app-modal-pago',
  templateUrl: './modal-pago.component.html',
  styleUrls: ['./modal-pago.component.scss'],
})
export class ModalPagoComponent implements OnInit {
  modalCuentas = false;
  imageSrc: string = '';
  typeFile = '';
  contentVoucher = '';
  rucModel = '';
  loadingPagos = false;
  lstPlanesPendientes: PlanEmpresa[] = [];
  isSavingPago = false;
  lstIdPago: number[] = [];
  faCircleNotch = faCircleNotch;
  faCheck = faCheck;
  faTimes = faTimes;
  faShare = faShare;
  statusPago = false;
  messagePago = '';
  constructor(
    private data: RjxService,
    private notify: NotifyService,
    private planWs: PlanService,
    private checkoutWs: CheckoutService
  ) {}

  ngOnInit(): void {
    this.data.RucModel.subscribe((v) => {
      this.rucModel = v;
      this.getPlanesPagosPendientes();
    });
    this.data.ModalClassInfoCuentas.subscribe((v) => {
      this.modalCuentas = v;
    });
  }

  //post
  addPago() {
    this.requestCheckPagos();

    if (this.lstIdPago.length <= 0) {
      this.notify.showError('Seleccione al menos un servicio de la lista');
      return;
    }
    if (this.contentVoucher == null || this.contentVoucher == '') {
      this.notify.showError('Debe adjuntar el voucher del depósito');
      return;
    }
    var request = {
      FotoVoucher: this.contentVoucher,
      SelectedIds: this.lstIdPago,
      IdUsuario: 0,
    };

    this.isSavingPago = true;
    this.checkoutWs
      .postPago(request)
      .subscribe(
        (data) => {
          var result = JSON.parse(data);
          this.messagePago = result.Message;
          if (result.Status) {
            this.statusPago = true;
            this.notify.showSuccess(result.Message);
          } else {
            this.statusPago = false;
            this.notify.showError(result.Message);
          }
        },
        (e) => {
          this.notify.showError(e.message);
          this.isSavingPago = false;
        }
      )
      .add(() => {
        this.isSavingPago = false;
      });
  }
  requestCheckPagos() {
    this.lstIdPago = [];
    for (let index = 0; index < this.lstPlanesPendientes.length; index++) {
      const item = this.lstPlanesPendientes[index];

      if (item.Selected) {
        this.lstIdPago.push(item.IdPlanNode);
      }
    }
  }
  //get
  getPlanesPagosPendientes() {
    this.loadingPagos = true;
    this.planWs
      .getPlanesPagosPendientes(this.rucModel)
      .subscribe(
        (data) => {
          var result = JSON.parse(data);
          if (result.Status) {
            var lst = result.Data as PlanEmpresa[];
            this.setPagosPendientes(lst);
          } else {
            this.notify.showError(result.Message);
          }
          console.log(result);
        },
        (e) => {
          this.notify.showError(e.message);
        }
      )
      .add(() => {
        this.loadingPagos = false;
      });
  }
  setPagosPendientes(data: PlanEmpresa[]) {
    this.lstPlanesPendientes = [];
    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      item.Selected = true;

      this.lstPlanesPendientes.push(item);
    }
  }
  getTotalImporte() {
    var suma = 0;
    for (let index = 0; index < this.lstPlanesPendientes.length; index++) {
      const item = this.lstPlanesPendientes[index];

      if (item.Selected) {
        suma += item.ImportePagar;
      }
    }
    return suma;
  }
  //utils
  handleInputChange(e: any) {
    this.contentVoucher = '';
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    console.log(file);

    this.typeFile = file.type;

    if (!file.type.match(pattern)) {
      this.notify.showError('Seleccione una imagen valida');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e: any) {
    let reader = e.target;
    this.imageSrc = reader.result;

    if (this.typeFile == 'image/jpg') {
      this.contentVoucher = this.imageSrc.substr(22);
    }
    if (this.typeFile == 'image/png') {
      this.contentVoucher = this.imageSrc.substr(22);
    }
    if (this.typeFile == 'image/jpeg') {
      this.contentVoucher = this.imageSrc.substr(23);
    }
  }
  showModalCuenta() {
    this.modalCuentas = true;
  }
  closeModal() {
    this.data.shModalPago(false);
  }
}
