export class PlanEmpresa {
  constructor(
    public IdNode: number = 0,
    public IdPlanNode: number = 0,
    public Ruc: string = '',
    public EstadoPago: number = 0,
    public RazonSocial: string = '',
    public NomPlan: string = '',
    public IdSubscripcion: number = 0,
    public Subscripcion: string = '',
    public ImportePagar: number = 0,
    public FechaSolicitud: Date = new Date(),
    public FechaExpiracion: Date = new Date(),
    public EsGratuito: boolean = false,
    public EsDemo: boolean = false,
    public ServicioExpira: boolean = false,
    public EsRenovacion: boolean = false,
    public Moneda: string = '',
    public SiglaMoneda: string = '',
    public Cantidad: number = 0,
    public CantidadComprobantes: number = 0,
    public CantidadProductosTienda: number = 0,
    public FechaValida: string = '',
    public DiasRestantes: string = '',
    public Precio: string = '',
    public CaracteristicasSubscripcion: string = '',
    public Selected: boolean = false
  ) {}
}
