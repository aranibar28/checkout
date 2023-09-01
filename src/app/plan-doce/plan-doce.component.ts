import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Plan } from '../models';
import {
  NotifyService,
  PlanService,
  RjxService,
  SessionService,
} from '../services';

@Component({
  selector: 'app-plan-doce',
  templateUrl: './plan-doce.component.html',
  styleUrls: ['./plan-doce.component.scss'],
})
export class PlanDoceComponent implements OnInit {
  selectedPlan: Plan = new Plan();
  @Input() licencias: number = 0;
  igv: number = 1.18;

  lstLicencias: Plan[] = [];
  selectedLicencia: Plan = new Plan();
  loadingLicencias = false;
  faSpinner = faSpinner;

  constructor(
    private planWs: PlanService,
    private rjx: RjxService,
    private session: SessionService,
    private router: Router,
    private _notify: NotifyService
  ) {}

  ngOnInit(): void {
    this.rjx.PlanModel.subscribe((data) => {
      this.selectedPlan = data;
      this.getLicencias();
    });
  }

  checkout() {
    if (this.selectedPlan == null) {
      alert('Seleccione un plan');
      return;
    }
    var lstSessionPlan = [];

    var objPlan = {
      IdPlan: this.selectedPlan.i_PlanId,
      Cantidad: 1,
    };
    lstSessionPlan.push(objPlan);

    if (this.selectedLicencia != null) {
      if (this.selectedLicencia.Cantidad > 0) {
        var objLicencia = {
          IdPlan: this.selectedLicencia.i_PlanId,
          Cantidad: this.selectedLicencia.Cantidad,
        };
        lstSessionPlan.push(objLicencia);
      }
    }
    this.session.setStore('planeschekcout', lstSessionPlan);
    this.router.navigate(['/registro']);
  }
  getLicencias() {
    this.loadingLicencias = true;
    this.planWs
      .getLicenciasAdicionales(
        this.selectedPlan.i_DuracionMeses,
        this.selectedPlan.i_SubscriptionId
      )
      .subscribe(
        (data) => {
          var result = JSON.parse(data);
          if (result.Status) {
            this.lstLicencias = result.Data as Plan[];
            if (this.lstLicencias.length > 0) {
              this.selectedLicencia = this.lstLicencias[0];
              this.selectedLicencia.Cantidad = 0;
            }
          } else {
            this._notify.showError(result.Message);
          }
        },
        (e) => {
          this._notify.showError(e.message);
        }
      )
      .add(() => {
        this.getTotal();
        this.loadingLicencias = false;
      });
  }

  getDisplayName(duracion: number): string {
    const name = {
      1: 'Mensual',
      2: 'Bimestral',
      3: 'Trimestral',
      6: 'Semestral',
      12: 'Anual',
    };
    return (name as any)[duracion] || '';
  }

  getPrecioRegularPlan() {
    var plan = this.selectedPlan;
    var licencia = this.selectedLicencia;
    var total = 0;
    var precioVentaLicencia = licencia.Cantidad * licencia.d_Precio;
    total = plan.d_Precio + precioVentaLicencia;
    return total * this.igv;
  }

  getDescuento() {
    return this.getPrecioRegularPlan() - this.getTotal();
  }

  getTotal() {
    var plan = this.selectedPlan;
    var licencia = this.selectedLicencia;
    var total = 0;
    var precioPlan =
      plan.d_PorcDescuento > 0 ? plan.d_PrecioConDescuento : plan.d_Precio;
    var precioLicencia =
      licencia.d_PorcDescuento > 0
        ? licencia.d_PrecioConDescuento
        : licencia.d_Precio;
    var precioVentaLicencia = licencia.Cantidad * precioLicencia;
    total = precioPlan + precioVentaLicencia;
    return total * this.igv;
  }

  //utils
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
