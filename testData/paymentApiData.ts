export interface PaymentTransaction {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  method: 'credit_card' | 'paypal' | 'bank_transfer';
  createdAt: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  metadata?: Record<string, string>;
}

export const paymentApiData: PaymentTransaction[] = [
  {
    id: 'txn_001',
    amount: 49.99,
    currency: 'USD',
    status: 'completed',
    method: 'credit_card',
    createdAt: '2026-06-13T10:15:00Z',
    customer: {
      id: 'cus_001',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
    },
    metadata: {
      orderId: 'ord_1001',
      product: 'Premium subscription',
    },
  },
  {
    id: 'txn_002',
    amount: 129.5,
    currency: 'EUR',
    status: 'pending',
    method: 'paypal',
    createdAt: '2026-06-12T14:35:00Z',
    customer: {
      id: 'cus_002',
      name: 'Marco Rossi',
      email: 'marco.rossi@example.it',
    },
    metadata: {
      orderId: 'ord_1002',
      product: 'Online course',
    },
  },
  {
    id: 'txn_003',
    amount: 20.0,
    currency: 'USD',
    status: 'failed',
    method: 'bank_transfer',
    createdAt: '2026-06-11T08:45:00Z',
    customer: {
      id: 'cus_003',
      name: 'Sofia Lee',
      email: 'sofia.lee@example.com',
    },
    metadata: {
      orderId: 'ord_1003',
      product: 'Gift card',
    },
  },
];
