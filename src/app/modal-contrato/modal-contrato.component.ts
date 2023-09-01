import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { CheckoutService, NotifyService, RjxService } from '../services';

@Component({
  selector: 'app-modal-contrato',
  templateUrl: './modal-contrato.component.html',
  styleUrls: ['./modal-contrato.component.scss'],
})
export class ModalContratoComponent implements OnInit {
  @Input() requestContrato: any;
  @Input() list = [];
  faCircleNotch = faCircleNotch;
  loading = false;
  docContent: string = '';
  innerHtml: SafeHtml | undefined;

  constructor(
    private data: RjxService,
    private sanitizer: DomSanitizer,
    private checkoutWs: CheckoutService,
    private notify: NotifyService
  ) {}

  ngOnInit(): void {
    this.getContrato();
  }

  closeModal() {
    this.data.shModalContrato(false);
  }

  getContrato() {
    this.loading = true;
    this.checkoutWs
      .getContrato(this.requestContrato, this.list)
      .subscribe(
        (data) => {
          var rs = JSON.parse(data);
          if (rs.Success) {
            this.docContent = this.convertToPdf(rs.PDFBase64Data);
            this.setInnerHtml(this.docContent);
          } else {
            this.notify.showError(rs.Error);
          }
        },
        (e) => {
          this.notify.showError(e.message);
        }
      )
      .add(() => {
        this.loading = false;
      });
  }

  convertToPdf(bytes: any) {
    var pdfData: any;
    if (bytes != null) {
      if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
        // IE workaround
        var byteCharacters = atob(bytes);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var blob = new Blob([byteArray], { type: 'application/pdf' });
        pdfData = blob;
      } else {
        // much easier if not IE
        pdfData = 'data:application/pdf;base64, ' + bytes;
      }
    }
    return pdfData;
  }

  setInnerHtml(content: any) {
    this.innerHtml = this.sanitizer.bypassSecurityTrustHtml(
      "<object style='width:100%;height:190vh;' data='" +
        content +
        "' type='application/pdf' class='embed-responsive-item'>" +
        'Object ' +
        ' failed' +
        '</object>'
    );
  }
}
