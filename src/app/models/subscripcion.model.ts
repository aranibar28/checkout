export class Subscripcion {
  constructor(
    public v_SubscriptionName: string = '',
    public v_DescCortContract: string = '',
    public v_ContractRutaFile: string = '',
    public v_Characteristics: string = '',
    public servicios: string = '',
    public n_CostoAdLic: number = 0,
    public n_CostoAdDoc: number = 0,
    public i_UnlimitedDocs: boolean = false,
    public i_SubscriptionId: number = 0,
    public i_NumLicenses: number = 0,
    public i_NumComprobantes: number = 0,
    public i_Monthlyplan: number = 0,
    public i_Moneda: number = 0,
    public i_IsDemo: boolean = false,
    public i_IsDeleted: number = 0,
    public i_InsertUserId: number = 0,
    public i_InsertUpdateId: number = 0,
    public i_FreeSubscription: boolean = false,
    public i_Active: number = 0,
    public d_Price: number = 0
  ) {}
}
