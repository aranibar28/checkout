import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import {
  faCircleNotch,
  faCheck,
  faTimes,
  faArrowLeft,
  faArrowRight,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import {
  IdentificationType,
  NgxMercadopagoService,
  PayerCost,
} from 'ngx-mercadopago';
import { MailValidation } from '../customs';
import {
  MercadoPagoSetting,
  PaymentSett,
  Plan,
  RequestCheckout,
  Subscripcion,
  Systemparameter,
  UserCustom,
} from '../models';
import {
  CheckoutService,
  ConsultService,
  MercadoPagoService,
  NotifyService,
  RjxService,
  SessionService,
  SubscripcionService,
  UbigeoService,
} from '../services';
declare var Cleave: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  faCircleNotch = faCircleNotch;
  faCheck = faCheck;
  faTimes = faTimes;
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword1 = false;
  showPassword2 = false;

  subscripcion: Subscripcion = new Subscripcion();
  planes: Plan[] = [];
  classNavPaso1 = 'text-blue';
  classNavPaso2 = 'nav-disabled';
  classNavPaso3 = 'nav-disabled';
  classContPaso1 = 'd-block';
  classContPaso2 = 'd-none';
  classContPaso3 = 'd-none';
  IsActiveContPaso1 = false;
  IsActiveContPaso2 = false;
  IsActiveContPaso3 = false;

  userForm = this.fb.group(
    {
      NumDoc: ['', Validators.required],
      NombresUsuario: ['', Validators.required],
      ApeMatUsuario: ['', Validators.required],
      ApePatUsuario: ['', Validators.required],
      Telefono: ['', Validators.required],
      Usuario: ['', Validators.required],
      Password: ['', Validators.required],
      RepeatPassword: ['', Validators.required],
      CorreoOrganization: ['', [Validators.required, Validators.email]],
      CorreoOrganizationRepeat: ['', [Validators.required, Validators.email]],
    },
    { validator: this.passwordMatchValidator }
  );

  empresaForm = this.fb.group({
    Ruc: ['', Validators.required],
    RazonSocial: ['', Validators.required],
    Direccion: ['', Validators.required],
    UbigeoEmpresa: [''],
    IdDepartamento: [0, Validators.required],
    IdProvincia: [0, Validators.required],
    IdDistrito: [0, Validators.required],
    NombreComercial: ['', Validators.required],
    Urbanizacion: [''],
  });

  //ubigeo
  lstDepartamentos: Systemparameter[] = [];
  lstProvincias: Systemparameter[] = [];
  lstDistritos: Systemparameter[] = [];
  selectedDepartamento: Systemparameter = new Systemparameter();
  selectedProvincia: Systemparameter = new Systemparameter();
  selectedDistrito: Systemparameter = new Systemparameter();

  requescheckout: RequestCheckout = new RequestCheckout();
  PasswordValido = true;
  ExistNumero = false;
  ExistMayuscula = false;
  ExistMinuscula = false;
  EigthCaracteres = false;
  loadingInfoPersona = false;
  loadingInfoPadron = false;
  acceptTermins = false;
  ubigeo01 = '';
  ubigeo02 = '';
  ubigeo03 = '';
  ubigeoStr = '';
  modalShow = false;
  modalContrato = false;
  isSaving = false;
  responseCheckout: any;
  ContratoRequest: any = {
    NombreRazonSocial: '',
    RUC: '',
    Domicilio: '',
    RepresentanteLegal: '',
    DNI: '',
    ServicioContratado: '',
    Plan: '',
    NumeroLicenciasUsuarios: '',
    ImportePorLicencia: '',
    DescuentoServicio: '',
    ImporteDescuentoServicio: '',
    ImporteLicenciaAdicional: '',
    DescuentoLicenciaAdicional: '',
    ImporteDescuentoLicenciaAdicional: '',
    Total: '',
    TotalConDescuento: '',
    CantidadComprobantes: '',
    ImporteComprobanteAdicional: '',
    Vigencia: '',
    Inicio: '',
    Fin: '',
    ResponsableCustodio: {
      NombreCompleto: '',
      DNI: '',
      Email: '',
      TelfCelular: '',
      Cliente: '',
    },
  };
  planesSession: any;
  idUserFromFactesol: number = 0;
  metodosPagos: Systemparameter[] = [];
  payment = false;
  loadingSessionPlans = false;
  emailValid = false;
  rucValid = false;
  //sdk-mp
  paymentSettingMP: MercadoPagoSetting = new MercadoPagoSetting();
  binCard = 0;
  payment_method_id = '';
  installments: PayerCost[] = [];
  IdentificationTypes: IdentificationType[] = [];
  paymentSetting: PaymentSett = new PaymentSett();
  payMPCheck = false;
  userCustom: UserCustom = new UserCustom();
  paramFromFactesol: number = 0;

  constructor(
    private fb: FormBuilder,
    private session: SessionService,
    private subscripcionWs: SubscripcionService,
    private notify: NotifyService,
    private consultWs: ConsultService,
    private ubigeoWs: UbigeoService,
    private rjx: RjxService,
    private checkoutWs: CheckoutService,
    private _mercadoPago: MercadoPagoService,
    private ngxMpService: NgxMercadopagoService
  ) {}

  get isValidPassword() {
    const input = this.userForm.get('RepeatPassword');
    return input?.touched && input!.hasError('passwordMismatch');
  }

  ngOnInit(): void {
    var planesSession = this.session.getStore('planeschekcout') as any;
    this.planesSession = JSON.parse(planesSession);
    this.idUserFromFactesol = this.session.getStore(
      'idUserCheckoutFactesol'
    ) as any;

    this.paramFromFactesol = this.session.getStore('fromWebFactesol') as any;
    if (this.idUserFromFactesol > 0) {
      this.getInfoUser();
    }
    this.getPlanSession();
    this.getDepartamentos();
    this.getMetodosPagos();
    this.getMercadoPagoSetting();

    this.rjx.ModalMercadoPago.subscribe((v) => {
      this.payment = v;
    });
    this.rjx.ModalClassContrato.subscribe((valor: boolean) => {
      this.modalContrato = valor;
    });

    this.rjx.ModalClass.subscribe((valor: boolean) => {
      this.modalShow = valor;
    });
    this.userForm.controls['CorreoOrganization'].valueChanges
      .pipe(debounceTime(500))
      .subscribe((v) => {
        this.validaEmail(v);
      });
    this.userForm.controls['NumDoc'].valueChanges.subscribe((doc) => {
      this.getDatosPersona(doc);
    });
    this.empresaForm.controls['Ruc'].valueChanges.subscribe((doc) => {
      this.getDatosByPadron(doc);
    });
    this.userForm.controls['Password'].valueChanges.subscribe((pwd) => {
      this.validPassword(pwd);
    });
  }

  //pagos
  getMetodosPagos() {
    this._mercadoPago
      .getMetodosPagos()
      .subscribe(
        (data) => {
          this.metodosPagos = data as Systemparameter[];
        },
        (e) => {
          this.notify.showError(e.message);
        }
      )
      .add(() => {});
  }
  getMercadoPagoSetting() {
    this._mercadoPago
      .getMercadoPagoSetting()
      .subscribe(
        (data) => {
          this.paymentSettingMP = data as MercadoPagoSetting;
        },
        (e) => {
          this.notify.showError(e.message);
        }
      )
      .add(() => {});
  }
  //mercadopago-sdk
  getPaymentMethods() {
    let cardObj: any = document.getElementById('cardNumber');
    var cardnumber = cardObj.value;

    if (cardnumber.length >= 6) {
      let bin = cardnumber.substring(0, 6);
      this.binCard = bin;
      this.ngxMpService
        .getPaymentMethod({
          bin: bin,
        })
        .subscribe((data) => {
          if (data.status == 200) {
            var obj = data.data[0];
            this.payment_method_id = obj.id;
            this.getInstallments();
          }
        })
        .add(() => {});
    }
  }
  getInstallments() {
    this.ngxMpService
      .getInstallments({
        payment_method_id: this.payment_method_id,
        bin: this.binCard,
      })
      .subscribe((data) => {
        if (data.status == 200) {
          var obj = data.data[0];
          this.installments = obj.payer_costs;
        }
      });
  }
  getIdentificationTypes() {
    this.ngxMpService.getIdentificationTypes().subscribe((data) => {
      if (data.status == 200) {
        this.IdentificationTypes = data.data;
      } else {
        this.notify.showError('Error getIdentificationTypes-mp');
      }
    });
  }
  async openMercadoPago() {
    await this.ngxMpService.initialize(this.paymentSettingMP.v_PublicKey);
    // this.getPaymentMethods();
    this.getIdentificationTypes();
    this.payment = true;
  }

  createToken() {
    var cardObjNumber: any = document.getElementById('cardNumber');
    var cardObjholderName: any = document.getElementById('cardholderName');

    var cardObjExpirationMonth: any = document.getElementById(
      'cardExpirationMonth'
    );
    var cardObjExpirationYear: any =
      document.getElementById('cardExpirationYear');
    var cardObjDocNumber: any = document.getElementById('docNumber');
    var cardObjDocType: any = document.getElementById('docType');
    var cardObjSecurityCode: any = document.getElementById('securityCode');
    var cardObjinstallments: any = document.getElementById('installments');

    this.payment = false;

    const payload = {
      cardNumber: cardObjNumber.value.replace(/ /g, ''),
      cardExpirationMonth: cardObjExpirationMonth.value,
      cardExpirationYear: cardObjExpirationYear.value,
      docNumber: cardObjDocNumber.value,
      docType: cardObjDocType.value,
      securityCode: cardObjSecurityCode.value,
      cardholderName: cardObjholderName.value,
    };

    if (
      !payload.cardholderName ||
      !payload.cardExpirationMonth ||
      !payload.cardExpirationYear ||
      !payload.securityCode
    ) {
      return;
    }

    if (!payload.cardNumber || payload.cardNumber.length < 16) {
      return;
    }

    this.ngxMpService
      .createToken(payload)
      .subscribe((data) => {
        if (data.status == 200) {
          var token = data.data;
          this.paymentSetting.token = token.id;
          this.paymentSetting.paymentMethodId = this.payment_method_id;
          this.paymentSetting.installments = cardObjinstallments.value;
          this.paymentSetting.transactionAmount = String(this.getTotal());
          this.paymentSetting.accesstoken = this.paymentSettingMP.v_AccesToken;
          this.payMPCheck = true;

          this.requescheckout.payment = this.paymentSetting;
          this.isSaving = false;
        }
      })
      .add(() => {
        this.saveCheckout();
      });
  }

  closeModalPayment() {
    this.payment = false;
  }
  //post
  saveCheckout() {
    if (!this.acceptTermins) {
      this.notify.showWarning('Aceptar los terminos y condiciones.');
      return;
    }

    if (this.getTotal() > 0) {
      if (this.requescheckout.IdMetodoPago <= 0) {
        this.notify.showError('Seleccione un metodo de pago.');
        return;
      }
    }

    if (this.requescheckout.IdMetodoPago == 2 && !this.payMPCheck) {
      this.openMercadoPago();
      return;
    }

    var user = this.userForm.value;
    var empresa = this.empresaForm.value;

    var request = this.requescheckout;
    //user
    request.NumDoc = user.NumDoc;
    request.NombresUsuario = user.NombresUsuario;
    request.ApeMatUsuario = user.ApeMatUsuario;
    request.ApePatUsuario = user.ApePatUsuario;
    request.Telefono = user.Telefono;
    request.Usuario = user.Usuario;
    request.Password = user.Password;
    request.CorreoOrganization = user.CorreoOrganization;

    //empresa
    request.Ruc = empresa.Ruc;
    request.RazonSocial = empresa.RazonSocial;
    request.Direccion = empresa.Direccion;
    request.NombreComercial = empresa.NombreComercial;
    request.Urbanizacion = empresa.Urbanizacion;
    request.ParamFromFactesol = this.paramFromFactesol;
    request.IdUsuarioFromFactesolDemo = this.idUserFromFactesol;
    //session planes
    var planesSession = this.session.getStore('planeschekcout') as any;
    var rs = JSON.parse(planesSession);
    request.listaPlanes = rs;

    this.isSaving = true;
    this.checkoutWs
      .post(request)
      .subscribe(
        (data) => {
          var result = JSON.parse(data);
          console.log(result);
          this.responseCheckout = result;
          this.rjx.upRucModel(request.Ruc);
        },
        (e) => {
          this.notify.showError(e.message);
        }
      )
      .add(() => {
        this.modalShow = true;
        this.isSaving = false;
      });
  }
  gotoCheckout(id: number) {
    if (id == 1) {
      this.classNavPaso1 = 'text-blue';
      this.classContPaso1 = 'd-block';
      this.classNavPaso2 = 'text-dark';
      this.classContPaso2 = 'd-none';
      this.classNavPaso3 = 'text-dark';
      this.classContPaso3 = 'd-none';
    }
    if (id == 2) {
      this.classNavPaso1 = 'text-dark';
      this.classContPaso1 = 'd-none';
      this.classNavPaso2 = 'text-blue';
      this.classContPaso2 = 'd-block';
      this.classNavPaso3 = 'text-dark';
      this.classContPaso3 = 'd-none';
    }
    if (id == 3) {
      this.classNavPaso1 = 'text-dark';
      this.classContPaso1 = 'd-none';
      this.classNavPaso2 = 'text-dark';
      this.classContPaso2 = 'd-none';
      this.classNavPaso3 = 'text-blue';
      this.classContPaso3 = 'd-block';
    }
  }
  nextCheckout(id: number) {
    var user = this.userForm.value;
    var empresa = this.empresaForm.value;

    if (id == 2) {
      if (user.CorreoOrganization != user.CorreoOrganizationRepeat) {
        this.notify.showError('El correo de confirmación es incorrecto.');
        return;
      }
      if (user.Password != user.RepeatPassword) {
        this.notify.showError('Las contraseñas no coinciden.');
        return;
      }
      if (!this.emailValid) {
        this.notify.showError('El email ingresado ya existe.');
        return;
      }

      this.classNavPaso1 = 'text-dark';
      this.classNavPaso2 = 'text-blue';
      this.classContPaso1 = 'd-none';
      this.classContPaso2 = 'd-block';
      this.IsActiveContPaso1 = true;
    }
    if (id == 3) {
      if (
        this.selectedDepartamento == null ||
        this.selectedDepartamento.i_ParameterId <= 0
      ) {
        this.notify.showError('Seleccione Departamento');
        return;
      }
      if (
        this.selectedProvincia == null ||
        this.selectedProvincia.i_ParameterId <= 0
      ) {
        this.notify.showError('Seleccione Provincia');
        return;
      }
      if (
        this.selectedDistrito == null ||
        this.selectedDistrito.i_ParameterId <= 0
      ) {
        this.notify.showError('Seleccione Distrito');
        return;
      }
      if (!this.rucValid) {
        this.notify.showError('El Ruc ingresado ya existe.');
        return;
      }
      this.classNavPaso2 = 'text-dark';
      this.classNavPaso3 = 'text-blue';
      this.classContPaso2 = 'd-none';
      this.classContPaso3 = 'd-block';
      this.IsActiveContPaso2 = true;
      this.IsActiveContPaso3 = true;
    }
  }
  backCheckout(id: number) {
    if (id == 1) {
      this.classNavPaso1 = 'text-blue';
      this.classNavPaso2 = 'text-dark';
      this.classContPaso1 = 'd-block';
      this.classContPaso2 = 'd-none';
    }
    if (id == 2) {
      this.classNavPaso2 = 'text-blue';
      this.classNavPaso3 = 'text-dark';
      this.classContPaso2 = 'd-block';
      this.classContPaso3 = 'd-none';
    }
  }
  validPassword(target: string) {
    var contrasenna = target;
    var mayuscula = false;
    var minuscula = false;
    var numero = false;
    this.PasswordValido = true;
    this.ExistNumero = false;
    this.ExistMayuscula = false;
    this.ExistMinuscula = false;
    this.EigthCaracteres = false;
    //var caracter_raro = false;
    if (contrasenna.length >= 8) {
      this.EigthCaracteres = true;
    } else {
      this.EigthCaracteres = false;
    }

    for (var i = 0; i < contrasenna.length; i++) {
      if (contrasenna.charCodeAt(i) >= 65 && contrasenna.charCodeAt(i) <= 90) {
        mayuscula = true;
        this.ExistMayuscula = true;
      } else if (
        contrasenna.charCodeAt(i) >= 97 &&
        contrasenna.charCodeAt(i) <= 122
      ) {
        minuscula = true;
        this.ExistMinuscula = true;
      } else if (
        contrasenna.charCodeAt(i) >= 48 &&
        contrasenna.charCodeAt(i) <= 57
      ) {
        numero = true;
        this.ExistNumero = true;
      }
    }
    if (mayuscula && minuscula && numero && this.EigthCaracteres) {
      this.PasswordValido = false;
    }
  }
  //contrato
  showContrato() {
    this.setRequestContrato();
    this.modalContrato = true;
    this.acceptTermins = true;
  }
  setRequestContrato() {
    var empresa = this.empresaForm.value;
    var user = this.userForm.value;

    this.ContratoRequest.NombreRazonSocial = empresa.RazonSocial;
    this.ContratoRequest.RUC = empresa.Ruc;

    this.ContratoRequest.Domicilio = empresa.Direccion;
    this.ContratoRequest.RepresentanteLegal =
      user.NombresUsuario + ' ' + user.ApeMatUsuario + ' ' + user.ApePatUsuario;

    this.ContratoRequest.DNI = user.NumDoc;
    this.ContratoRequest.ServicioContratado =
      this.subscripcion.v_SubscriptionName;
    var plan: any = {};
    for (let index = 0; index < this.planes.length; index++) {
      const x = this.planes[index];

      if (x.i_ServicioExpira && !x.i_EsRenovacion && !x.i_EsLicenciaAdicional) {
        plan = x;
      }
    }

    this.ContratoRequest.Plan = plan.v_Nombre;
    this.ContratoRequest.NumeroLicenciasUsuarios =
      this.subscripcion.i_NumLicenses;
    this.ContratoRequest.ImportePorLicencia = 0;
    this.ContratoRequest.ImporteDescuentoServicio = 0;
    this.ContratoRequest.DescuentoServicio = 0;
    this.ContratoRequest.ImporteLicenciaAdicional = 0;
    this.ContratoRequest.DescuentoLicenciaAdicional = 0;
    this.ContratoRequest.ImporteDescuentoLicenciaAdicional = 0;
    this.ContratoRequest.Total = 0;
    this.ContratoRequest.TotalConDescuento = 0;
    this.ContratoRequest.CantidadComprobantes = 0;
    this.ContratoRequest.ImporteComprobanteAdicional = 0;

    //ResponsableCustodio
    var ResponsableCustodio = {
      NombreCompleto: '',
      DNI: '',
      Email: '',
      TelfCelular: '',
      Cliente: '',
    };
    ResponsableCustodio.NombreCompleto =
      this.ContratoRequest.RepresentanteLegal;
    ResponsableCustodio.DNI = this.ContratoRequest.DNI;
    ResponsableCustodio.Email = user.CorreoOrganization;
    ResponsableCustodio.TelfCelular = user.Telefono;
    ResponsableCustodio.Cliente = empresa.RazonSocial;

    this.ContratoRequest.ResponsableCustodio = ResponsableCustodio;
  }

  //ubigeo
  selectDepartamento(item: Systemparameter) {
    this.selectedDepartamento = item;
    this.ubigeo01 = this.selectedDepartamento.v_Value2;
    this.requescheckout.IdDepartamento =
      this.selectedDepartamento.i_ParameterId;
    this.getProvincias(this.selectedDepartamento.i_ParameterId);
    this.empresaForm.get('IdProvincia')?.reset(0);
    this.empresaForm.get('IdDistrito')?.reset(0);
    this.lstDistritos = [];
  }
  selectProvincia(item: Systemparameter) {
    this.selectedProvincia = item;
    this.ubigeo02 = this.selectedDepartamento.v_Value2;
    this.requescheckout.IdProvincia = this.selectedProvincia.i_ParameterId;
    this.getDistritos(this.selectedProvincia.i_ParameterId);
    this.empresaForm.get('IdDistrito')?.reset(0);
  }
  selectDistrito(item: Systemparameter) {
    this.selectedDistrito = item;
    this.ubigeoStr = '';
    this.ubigeo03 = this.selectedDistrito.v_Value2;
    this.ubigeoStr = this.ubigeo01 + this.ubigeo02 + this.ubigeo03;
    this.requescheckout.UbigeoEmpresa = this.ubigeoStr;
    this.requescheckout.IdDistrito = this.selectedDistrito.i_ParameterId;
    this.requescheckout.UbigeoOrganization = this.ubigeoStr;
    this.requescheckout.UbigeoEmpresa = this.ubigeoStr;
  }
  getDepartamentos() {
    this.ubigeoWs.getDepartamentos().subscribe(
      (data) => {
        if (data.Status) {
          this.lstDepartamentos = data.Data as Systemparameter[];
        } else {
          this.notify.showError(data.Message);
        }
      },
      (e) => {
        this.notify.showError(e.message, '');
      }
    );
  }
  getProvincias(id: number) {
    if (!id || id === 0) {
      return;
    }
    this.ubigeoWs.getProvincias(id).subscribe(
      (data) => {
        if (data.Status) {
          this.lstProvincias = data.Data as Systemparameter[];
        } else {
          this.notify.showError(data.Message);
        }
      },
      (e) => {
        this.notify.showError(e.message, '');
      }
    );
  }
  getDistritos(id: number) {
    if (!id || id === 0) {
      return;
    }
    this.ubigeoWs.getDistritos(id).subscribe(
      (data) => {
        if (data.Status) {
          this.lstDistritos = data.Data as Systemparameter[];
        } else {
          this.notify.showError(data.Message);
        }
      },
      (e) => {
        this.notify.showError(e.message, '');
      }
    );
  }
  //consult
  getDatosPersona(doc: string) {
    if (doc.length >= 8) {
      this.loadingInfoPersona = true;
      this.consultWs
        .getDatosByDni(doc)
        .subscribe(
          (data) => {
            var rs = JSON.parse(data);
            var person = rs.Data;
            const payload = this.consultWs.buildDatos(person.nombre);
            this.userForm.patchValue(payload);
          },
          (e) => {
            this.notify.showError(e.message);
          }
        )
        .add(() => {
          this.loadingInfoPersona = false;
        });
    }
  }
  getDatosByPadron(doc: string) {
    if (doc.length >= 11) {
      this.loadingInfoPadron = true;
      this.consultWs
        .getDatosPadronSunat(doc)
        .subscribe(
          (data) => {
            if (data.Success) {
              var obj = data.Data;
              this.empresaForm.patchValue({
                RazonSocial: obj.RazonSocial,
                Direccion: obj.Direccion,
              });
            } else {
              this.notify.showError(data.Error);
            }
          },
          (e) => {
            this.notify.showError(e.message);
          }
        )
        .add(() => {
          this.validaRuc(doc);
          this.loadingInfoPadron = false;
        });
    }
  }
  validaRuc(doc: string) {
    if (doc.length >= 11) {
      var request = {
        Ruc: doc,
      };
      this._mercadoPago.existEmpresa(request).subscribe(
        (data) => {
          if (data) {
            this.rucValid = false;
            this.notify.showError('El Ruc ingresado ya existe.');
          } else {
            this.rucValid = true;
          }
        },
        (e) => {
          this.notify.showError(e.message);
        }
      );
    }
  }
  validaEmail(doc: string) {
    var errorPattern =
      this.userForm.controls['CorreoOrganization'].hasError('pattern');
    var request = {
      CorreoOrganization: doc,
      ParamFromFactesol: this.paramFromFactesol,
    };
    if (!errorPattern) {
      this._mercadoPago.existEmail(request).subscribe(
        (data) => {
          if (data) {
            this.emailValid = false;
            this.notify.showError('El email ingresado ya existe.');
          } else {
            this.emailValid = true;
          }
        },
        (e) => {
          this.notify.showError(e.message);
        }
      );
    }
  }
  //session
  getPlanSession() {
    this.loadingSessionPlans = true;
    this.subscripcionWs
      .getSessionPlanes(this.planesSession)
      .subscribe(
        (data) => {
          var result = JSON.parse(data);
          if (result.Status) {
            var dataRs = result.Data;
            this.subscripcion = dataRs.Subscripcion as Subscripcion;
            this.rjx.upSubscripcion(this.subscripcion);
            this.planes = dataRs.lstSessionPlanes as Plan[];
          } else {
            this.notify.showError(result.Message);
          }
        },
        (e) => {
          this.notify.showError(e.message);
        }
      )
      .add(() => {
        this.loadingSessionPlans = false;
      });
  }
  //total
  getTotal() {
    var total = 0;
    for (let index = 0; index < this.planes.length; index++) {
      var item = this.planes[index];
      item = this.getPlanFormula(item);

      total += item.d_PrecioVenta;
    }
    var totalFin = Number(total.toFixed(2));
    return totalFin;
  }
  getSubTotal() {
    var total = 0;
    for (let index = 0; index < this.planes.length; index++) {
      var item = this.planes[index];
      item = this.getPlanFormula(item);

      total += item.d_Valor;
    }

    return total;
  }
  getIgvTotal() {
    var total = 0;
    for (let index = 0; index < this.planes.length; index++) {
      var item = this.planes[index];
      item = this.getPlanFormula(item);

      total += item.d_Igv;
    }

    return total;
  }
  getDescuentoTotal() {
    var total = 0;
    for (let index = 0; index < this.planes.length; index++) {
      var item = this.planes[index];
      item = this.getPlanFormula(item);

      total += item.d_Descuento;
    }

    return total;
  }
  //formula
  getPlanFormula(x: Plan) {
    if (x.Cantidad <= 0) {
      x.Cantidad = 1;
    }

    var dscto = x.d_PorcDescuento;

    //valor unitario
    x.d_ValorUnitario = x.d_Precio;

    //valor
    var Valor = x.Cantidad * x.d_Precio;
    x.d_Valor = Number(Valor);

    //descuento
    x.d_Descuento = (x.d_Valor * dscto) / 100;

    //valor venta
    var ValorVenta = 0;
    ValorVenta = x.d_Valor - x.d_Descuento;
    var ValorVenta2 = Number(ValorVenta);
    x.d_ValorVenta = ValorVenta2;

    //IgvSoles
    var IgvFormat = 0;
    IgvFormat = (x.d_ValorVenta * 18) / 100;
    var IgvFormat2 = Number(IgvFormat);
    x.d_Igv = Number(IgvFormat2);

    //precioventa
    var PrecioVentaFormat = 0;
    PrecioVentaFormat = x.d_ValorVenta + x.d_Igv;
    x.d_PrecioVenta = Number(PrecioVentaFormat);

    return x;
  }
  //user
  getInfoUser() {
    this._mercadoPago.getInfoUserById(this.idUserFromFactesol).subscribe(
      (data) => {
        this.userCustom = data as UserCustom;
        this.userForm.patchValue({
          NumDoc: this.userCustom.nroDoc,
          NombresUsuario: this.userCustom.nombres,
          ApeMatUsuario: this.userCustom.apeMaterno,
          ApePatUsuario: this.userCustom.apePaterno,
          Telefono: this.userCustom.telefono,
          Usuario: this.userCustom.usuario,
          CorreoOrganization: this.userCustom.correo,
          CorreoOrganizationRepeat: this.userCustom.correo,
        });
      },
      (e) => {}
    );
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('Password')!.value;
    const confirmPassword = formGroup.get('RepeatPassword')!.value;
    if (password !== confirmPassword) {
      formGroup.get('RepeatPassword')!.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('RepeatPassword')!.setErrors(null);
    }
  }
}
