import { WaitlistUser } from '../types';

const STORAGE_EMAIL_CONFIG_KEY = 'campora_email_service_key';

export function getThirdPartyEmailApiKey(): string {
  return (
    localStorage.getItem(STORAGE_EMAIL_CONFIG_KEY) ||
    ((import.meta as any).env && (import.meta as any).env.VITE_EMAIL_API_KEY) ||
    ''
  );
}

export function setThirdPartyEmailApiKey(key: string): void {
  localStorage.setItem(STORAGE_EMAIL_CONFIG_KEY, key.trim());
}

/**
 * Email confirmation has been disabled per user request.
 */
export async function sendWelcomeEmail(_user: WaitlistUser): Promise<{ success: boolean; message: string }> {
  return {
    success: true,
    message: 'Email confirmation disabled.',
  };
}
