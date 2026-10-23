import crypto from 'crypto';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || '';
const PAYSTACK_API_BASE = 'https://api.paystack.co';

export async function initializePaystackTransaction(params: {
  email: string;
  amountInKobo: number; // Integer kobo
  reference: string;
  callbackUrl: string;
  metadata?: Record<string, any>;
}) {
  const response = await fetch(`${PAYSTACK_API_BASE}/transaction/initialize`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: params.email,
      amount: params.amountInKobo,
      reference: params.reference,
      callback_url: params.callbackUrl,
      metadata: params.metadata,
    }),
  });

  const data = await response.json();
  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to initialize Paystack transaction');
  }

  return data.data; // contains authorization_url, access_code, reference
}

export function verifyPaystackSignature(rawBody: string, signatureHeader: string | null): boolean {
  if (!signatureHeader || !PAYSTACK_SECRET_KEY) return false;
  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET_KEY)
    .update(rawBody)
    .digest('hex');
  return hash === signatureHeader;
}