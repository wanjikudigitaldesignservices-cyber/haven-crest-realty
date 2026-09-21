// IntaSend (M-Pesa) SDK Loader & Stub per Layer 2
// Installed & endpoints stubbed, but intentionally not activated during Phase 1

export interface IntaSendPaymentConfig {
  amount: number;
  currency: string;
  email: string;
  phone_number: string;
  api_ref: string;
}

export class IntaSendPaymentGateway {
  private static isInitialized = false;

  static initialize() {
    this.isInitialized = true;
  }

  static async initiatePayment(_config: IntaSendPaymentConfig): Promise<{
    status: 'disabled_phase_1';
    message: string;
  }> {
    // Endpoints stubbed per Layer 2 specification
    console.info("[IntaSend Gateway] Payments are stubbed and not active during Phase 1.");
    return {
      status: 'disabled_phase_1',
      message: 'Online payments via IntaSend (M-Pesa) are not activated during Phase 1.',
    };
  }
}
