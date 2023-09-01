export class Plan {
  constructor(
    public Cantidad: number = 0,
    public d_ImporteComprobanteAdicional: number = 0,
    public d_PorcDescuento: number = 0,
    public d_Precio: number = 0,
    public d_PrecioConDescuento: number = 0,
    public d_PrecioConDescuentoIgv: number = 0,
    public d_PrecioIgv: number = 0,
    public i_Activo: boolean = false,
    public i_CantComprobantes: number = 0,
    public i_CantidadProductosTienda: number = 0,
    public i_DuracionMeses: number = 0,
    public i_EsLicenciaAdicional: boolean = false,
    public i_EsRenovacion: boolean = false,
    public i_MonedaPrecioId: number = 0,
    public i_PlanId: number = 0,
    public i_ServicioExpira: boolean = false,
    public i_SubscriptionId: number = 0,
    public v_Nombre: string = '',
    public v_SubscriptionName: string = '',
    public d_ValorUnitario: number = 0,
    public d_Valor: number = 0,
    public d_Descuento: number = 0,
    public d_ValorVenta: number = 0,
    public d_Igv: number = 0,
    public d_PrecioVenta: number = 0
  ) {}
}
