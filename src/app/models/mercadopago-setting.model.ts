export class MercadoPagoSetting {
  constructor(
    public i_IdPaymentSetting: number = 0,
    public v_Payment: string = '',
    public v_PublicKey: string = '',
    public v_AccesToken: string = '',
    public v_ClientId: string = '',
    public v_ClientSecret: string = '',
    public v_AppId: string = ''
  ) {}
}
