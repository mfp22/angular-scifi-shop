export type PaymentEvent = {
  status: 'completed' | 'pending';
  paymentMethod: 'Card' | 'Klarna' | 'PayPal';
  total: number;
};
