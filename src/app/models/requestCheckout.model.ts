import { PaymentSett } from '.';
import { SessionPlan } from './session-plan.model';

export class RequestCheckout {
  constructor(
    public NombreOrganization: string = '',
    public CorreoOrganization: string = '',
    public DireccionOrganization: string = '',
    public UbigeoOrganization: string = '',
    public OrganizationCode: string = '',
    public NumDoc: string = '',
    public NombresUsuario: string = '',
    public ApeMatUsuario: string = '',
    public ApePatUsuario: string = '',
    public Telefono: string = '',
    public Usuario: string = '',
    public Password: string = '',
    public Ruc: string = '',
    public RazonSocial: string = '',
    public Direccion: string = '',
    public UbigeoEmpresa: string = '',
    public IdDepartamento: number = 0,
    public IdProvincia: number = 0,
    public IdDistrito: number = 0,
    public NombreComercial: string = '',
    public Urbanizacion: string = '',
    public IsCompany: boolean = false,
    public IdMetodoPago: number = 0,
    public ParamFromFactesol:number = 0,
    public IdUsuarioFromFactesolDemo:number = 0,
    public listaPlanes: SessionPlan[] = [],
    public payment: PaymentSett = new PaymentSett()
  ) {}
}
