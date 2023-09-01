import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Plan, Subscripcion } from '../models';
import {
  NotifyService,
  PlanService,
  RjxService,
  SessionService,
  SubscripcionService,
} from '../services';

@Component({
  selector: 'app-subscripcion',
  templateUrl: './subscripcion.component.html',
  styleUrls: ['./subscripcion.component.scss'],
})
export class SubscripcionComponent implements OnInit {
  id: number = 0;
  idUser: number = 0;
  loadingSb = false;
  loadingPl = false;
  planes: Plan[] = [];
  selectedPlan: Plan = new Plan();
  selectedImage: number = 12;
  subscripcion: Subscripcion = new Subscripcion();
  faSpinner = faSpinner;
  paramFromFactesol: number = 0;
  constructor(
    private route: ActivatedRoute,
    private subscripcionWs: SubscripcionService,
    private planWs: PlanService,
    private rjx: RjxService,
    private _notify: NotifyService,
    private _sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });

    //get param iduser
    this.route.queryParams.subscribe((params) => {
      this.idUser = +params['idUser'];
      this.paramFromFactesol = +params['fromFactesol'];
      this._sessionService.setStore('idUserCheckoutFactesol', this.idUser);
      this._sessionService.setStore('fromWebFactesol', this.paramFromFactesol);
    });

    this.findSubscripcion();
    this.getPlanes();
  }

  //get
  findSubscripcion() {
    this.loadingSb = true;
    this.subscripcionWs
      .findSubscripcionById(this.id)
      .subscribe(
        (data) => {
          if (data.Status) {
            this.subscripcion = data.Data;
          } else {
            alert(data.Message);
          }
        },
        (e) => {
          console.log(e);
        }
      )
      .add(() => {
        this.loadingSb = false;
      });
  }
  getPlanes() {
    this.loadingPl = true;
    this.planWs
      .getPlanesById(this.id)
      .subscribe(
        (data) => {
          var result = JSON.parse(data);
          if (result.Status) {
            this.lstPlanes(result.Data);
          } else {
            alert(result.Message);
          }
        },
        (e) => {
          console.log(e);
        }
      )
      .add(() => {});
  }
  lstPlanes(data: Plan[]) {
    this.planes = [];
    for (let index = 0; index < data.length; index++) {
      const item = data[index];

      if (!item.i_EsRenovacion && !item.i_EsLicenciaAdicional) {
        this.planes.push(item);
      }
    }

    this.planes.sort((a, b) => a.d_Precio - b.d_Precio);
    this.selectPlan(this.planes[2]);
    this.loadingPl = false;
  }
  //utils
  selectPlan(plan: Plan) {
    if (this.selectedPlan.i_PlanId === plan.i_PlanId) {
      return;
    }

    this.selectedPlan = plan;
    this.selectedImage = plan.i_DuracionMeses;
    this.rjx.updatePlanModel(this.selectedPlan);
    this.applyFadeIn();
  }

  getPlanCost(item: any, index: number): number {
    return index === 0
      ? item.d_PrecioIgv
      : item.d_PrecioConDescuentoIgv / item.i_DuracionMeses;
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

  fadeIn = true;
  applyFadeIn() {
    this.fadeIn = false;
    setTimeout(() => {
      this.fadeIn = true;
    });
  }
}
