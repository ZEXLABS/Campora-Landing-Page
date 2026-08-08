import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { WaitlistFormData, WaitlistUser, WaitlistStats } from '../types';
import { sendWelcomeEmail } from './email';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);

const COLLECTION_NAME = 'waitlistUsers';
const LOCAL_STORAGE_USERS_KEY = 'campora_firebase_local_waitlist_users';

function withTimeout<T>(promise: Promise<T>, ms = 3500): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Firestore operation timed out')), ms);
    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

/**
 * Register a student on the waitlist directly in Firebase Firestore
 */
export async function joinWaitlist(
  formData: WaitlistFormData
): Promise<{ user: WaitlistUser; isExisting: boolean }> {
  const normalizedEmail = formData.email.trim().toLowerCase();

  try {
    // 1. Check if user already exists in Firestore
    const usersRef = collection(db, COLLECTION_NAME);
    const existingQuery = query(usersRef, where('email', '==', normalizedEmail));
    const snapshot = await withTimeout(getDocs(existingQuery));

    if (!snapshot.empty) {
      const docData = snapshot.docs[0].data();
      const existingUser: WaitlistUser = {
        id: snapshot.docs[0].id,
        fullName: docData.fullName || formData.fullName,
        email: normalizedEmail,
        phone: docData.phone || formData.phone || '',
        university: docData.university || formData.university,
        level: docData.level || formData.level,
        gender: docData.gender || formData.gender || '',
        accommodationNeed: docData.accommodationNeed || formData.accommodationNeed,
        accommodationTimeline: docData.accommodationTimeline || formData.accommodationTimeline,
        referralSource: docData.referralSource || formData.referralSource,
        position: docData.position || 1,
        createdAt: docData.createdAt || new Date().toISOString(),
      };
      localStorage.setItem('campora_user', JSON.stringify(existingUser));
      return { user: existingUser, isExisting: true };
    }

    // 2. Determine waitlist queue position from Firestore total count
    const allDocsSnapshot = await withTimeout(getDocs(usersRef));
    const position = allDocsSnapshot.size + 1;

    // 3. Prepare new user document payload
    const nowIso = new Date().toISOString();
    const newUserPayload = {
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
      createdAt: nowIso,
    };

    // 4. Save to Firebase Firestore
    const docRef = await withTimeout(addDoc(usersRef, newUserPayload));

    const newUser: WaitlistUser = {
      id: docRef.id,
      ...newUserPayload,
    };

    // Save to local storage for instant session persistence
    localStorage.setItem('campora_user', JSON.stringify(newUser));

    // Save copy to local users array backup
    const localUsers = getLocalBackupUsers();
    localUsers.unshift(newUser);
    saveLocalBackupUsers(localUsers);

    // 5. Trigger automated Welcome Email
    sendWelcomeEmail(newUser);

    return { user: newUser, isExisting: false };
  } catch (err) {
    console.warn('Firestore joinWaitlist note, utilizing seamless local backup:', err);
    // Fallback to local storage if network or rules error
    return joinWaitlistLocalFallback(formData);
  }
}

/**
 * Retrieve user position and details by email from Firebase Firestore
 */
export async function getUserByEmail(email: string): Promise<WaitlistUser | null> {
  const normalizedEmail = email.trim().toLowerCase();

  try {
    const usersRef = collection(db, COLLECTION_NAME);
    const q = query(usersRef, where('email', '==', normalizedEmail));
    const snapshot = await withTimeout(getDocs(q));

    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      const data = docSnap.data();
      return {
        id: docSnap.id,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || '',
        university: data.university,
        level: data.level,
        gender: data.gender || '',
        accommodationNeed: data.accommodationNeed,
        accommodationTimeline: data.accommodationTimeline,
        referralSource: data.referralSource,
        position: data.position || 1,
        createdAt: data.createdAt || new Date().toISOString(),
      };
    }
  } catch (err) {
    console.warn('Firestore getUserByEmail note:', err);
  }

  // Check local fallback
  const localUsers = getLocalBackupUsers();
  return localUsers.find((u) => u.email.toLowerCase() === normalizedEmail) || null;
}

/**
 * Fetch total stats live from Firebase Firestore for social proof and admin panel
 */
export async function getWaitlistStats(): Promise<WaitlistStats> {
  try {
    const usersRef = collection(db, COLLECTION_NAME);
    const snapshot = await withTimeout(getDocs(usersRef));

    const totalUsers = snapshot.size;
    if (totalUsers === 0) {
      return getLocalBackupStats();
    }

    const uniCounts: Record<string, number> = {};
    let immediateNeedCount = 0;

    snapshot.docs.forEach((docSnap) => {
      const d = docSnap.data();
      if (d.university) {
        uniCounts[d.university] = (uniCounts[d.university] || 0) + 1;
      }
      if (d.accommodationTimeline === 'Immediately' || d.accommodationTimeline === 'Within 1 month') {
        immediateNeedCount++;
      }
    });

    let topUniversity = 'University of Lagos (UNILAG)';
    let maxCount = 0;
    Object.entries(uniCounts).forEach(([uni, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topUniversity = uni;
      }
    });

    return {
      totalUsers,
      topUniversity,
      immediateNeedCount,
    };
  } catch (err) {
    console.warn('Firestore getWaitlistStats note:', err);
    return getLocalBackupStats();
  }
}

/**
 * Fetch all registered users live from Firebase Firestore for Admin panel
 */
export async function getAllWaitlistUsers(): Promise<WaitlistUser[]> {
  try {
    const usersRef = collection(db, COLLECTION_NAME);
    const q = query(usersRef, orderBy('createdAt', 'desc'));
    const snapshot = await withTimeout(getDocs(q));

    if (!snapshot.empty) {
      return snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          fullName: data.fullName,
          email: data.email,
          phone: data.phone || '',
          university: data.university,
          level: data.level,
          gender: data.gender || '',
          accommodationNeed: data.accommodationNeed,
          accommodationTimeline: data.accommodationTimeline,
          referralSource: data.referralSource,
          position: data.position || 1,
          createdAt: data.createdAt || new Date().toISOString(),
        };
      });
    }
  } catch (err) {
    console.warn('Firestore getAllWaitlistUsers note:', err);
  }

  return getLocalBackupUsers();
}

/* Local storage helpers for seamless offline/fallback support */

function getLocalBackupUsers(): WaitlistUser[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalBackupUsers(users: WaitlistUser[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Error saving local backup users:', e);
  }
}

function joinWaitlistLocalFallback(formData: WaitlistFormData): { user: WaitlistUser; isExisting: boolean } {
  const localUsers = getLocalBackupUsers();
  const normalizedEmail = formData.email.toLowerCase();

  const existing = localUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    localStorage.setItem('campora_user', JSON.stringify(existing));
    return { user: existing, isExisting: true };
  }

  const position = localUsers.length + 1;
  const newUser: WaitlistUser = {
    id: 'fb-local-' + Date.now(),
    fullName: formData.fullName,
    email: normalizedEmail,
    phone: formData.phone || '',
    university: formData.university,
    level: formData.level,
    gender: formData.gender || '',
    accommodationNeed: formData.accommodationNeed,
    accommodationTimeline: formData.accommodationTimeline,
    referralSource: formData.referralSource,
    position,
    createdAt: new Date().toISOString(),
  };

  localUsers.unshift(newUser);
  saveLocalBackupUsers(localUsers);
  localStorage.setItem('campora_user', JSON.stringify(newUser));
  sendWelcomeEmail(newUser);

  return { user: newUser, isExisting: false };
}

function getLocalBackupStats(): WaitlistStats {
  const localUsers = getLocalBackupUsers();
  return {
    totalUsers: localUsers.length,
    topUniversity: localUsers.length > 0 ? localUsers[0].university : 'UNILAG (Akoka)',
    immediateNeedCount: localUsers.filter(
      (u) => u.accommodationTimeline === 'Immediately' || u.accommodationTimeline === 'Within 1 month'
    ).length,
  };
}
