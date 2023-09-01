export class PaymentSett {
  constructor(
    public token: string = '',
    public paymentMethodId: string = '',
    public installments: string = '',
    public issuer_id: string = '',
    public transactionAmount: string = '',
    public description: string = '',
    public email: string = '',
    public docNumber: string = '',
    public docType: string = '',
    public accesstoken: string = ''
  ) {}
}
