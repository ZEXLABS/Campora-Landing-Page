import { WaitlistUser, WaitlistFormData, WaitlistStats } from '../types';
import { sendWelcomeEmail } from './email';

const STORAGE_USERS_KEY = 'campora_all_waitlist_users';
const STORAGE_SHEETS_URL_KEY = 'campora_google_sheet_url';

export const DEFAULT_GOOGLE_SHEETS_WEBHOOK_URL =
  ((import.meta as any).env && (import.meta as any).env.VITE_GOOGLE_SHEETS_WEBHOOK_URL) ||
  'https://script.google.com/macros/s/AKfycbz_CAMPORA_STUDENT_WAITLIST_APP_SCRIPT_URL/exec';

export function getGoogleSheetUrl(): string {
  return localStorage.getItem(STORAGE_SHEETS_URL_KEY) || DEFAULT_GOOGLE_SHEETS_WEBHOOK_URL;
}

export function setGoogleSheetUrl(url: string): void {
  localStorage.setItem(STORAGE_SHEETS_URL_KEY, url.trim());
}

export function getLocalWaitlistUsers(): WaitlistUser[] {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse local waitlist users:', e);
    return [];
  }
}

export function saveLocalWaitlistUsers(users: WaitlistUser[]): void {
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save local waitlist users:', e);
  }
}

export async function sendToGoogleSheet(data: Record<string, any>): Promise<boolean> {
  const webhookUrl = getGoogleSheetUrl();
  if (!webhookUrl || webhookUrl.includes('AKfycbz_CAMPORA_STUDENT_WAITLIST_APP_SCRIPT_URL')) {
    return true;
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        action: 'ADD_WAITLIST_ENTRY',
        fullName: data.fullName,
        phone: data.phone || '',
        university: data.university,
        level: data.level,
        gender: data.gender || '',
        accommodationNeed: data.accommodationNeed,
        accommodationTimeline: data.accommodationTimeline,
        referralSource: data.referralSource,
        position: data.position,
      }),
    });
    return true;
  } catch (err) {
    console.error('Failed sending data to Google Spreadsheet endpoint:', err);
    return false;
  }
}

export async function joinWaitlist(
  formData: WaitlistFormData
): Promise<{ user: WaitlistUser; isExisting: boolean }> {
  const normalizedEmail = formData.email.trim().toLowerCase();
  const currentUsers = getLocalWaitlistUsers();

  const existingUser = currentUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (existingUser) {
    localStorage.setItem('campora_user', JSON.stringify(existingUser));
    return { user: existingUser, isExisting: true };
  }

  const position = currentUsers.length + 1;

  const newUser: WaitlistUser = {
    id: 'sheet-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
    fullName: formData.fullName.trim(),
    email: normalizedEmail,
    phone: formData.phone?.trim() || '',
    university: formData.university,
    level: formData.level,
    gender: formData.gender || '',
    accommodationNeed: formData.accommodationNeed,
    accommodationTimeline: formData.accommodationTimeline,
    referralSource: formData.referralSource,
    position,
    createdAt: new Date().toISOString(),
  };

  currentUsers.unshift(newUser);
  saveLocalWaitlistUsers(currentUsers);
  localStorage.setItem('campora_user', JSON.stringify(newUser));

  sendToGoogleSheet(newUser);
  sendWelcomeEmail(newUser);

  return { user: newUser, isExisting: false };
}

export async function getUserByEmail(email: string): Promise<WaitlistUser | null> {
  const normalizedEmail = email.trim().toLowerCase();
  const currentUsers = getLocalWaitlistUsers();
  const user = currentUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
  return user || null;
}

export async function getWaitlistStats(): Promise<WaitlistStats> {
  const currentUsers = getLocalWaitlistUsers();
  const totalUsers = currentUsers.length;

  if (totalUsers === 0) {
    return {
      totalUsers: 0,
      topUniversity: 'N/A',
      immediateNeedCount: 0,
    };
  }

  const uniCounts: Record<string, number> = {};
  let immediateNeedCount = 0;

  currentUsers.forEach((u) => {
    if (u.university) {
      uniCounts[u.university] = (uniCounts[u.university] || 0) + 1;
    }
    if (u.accommodationTimeline === 'Immediately' || u.accommodationTimeline === 'Within 1 month') {
      immediateNeedCount++;
    }
  });

  let topUniversity = 'UNILAG (Akoka)';
  let maxUniCount = 0;
  Object.entries(uniCounts).forEach(([uni, count]) => {
    if (count > maxUniCount) {
      maxUniCount = count;
      topUniversity = uni;
    }
  });

  return {
    totalUsers,
    topUniversity,
    immediateNeedCount,
  };
}

export async function getAllWaitlistUsers(): Promise<WaitlistUser[]> {
  return getLocalWaitlistUsers();
}
