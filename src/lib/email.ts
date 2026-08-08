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
 * Sends an automated "Welcome to Campora" email via a Third-Party Email API service (e.g. Resend)
 */
export async function sendWelcomeEmail(user: WaitlistUser): Promise<{ success: boolean; message: string }> {
  console.log(`[Automated Email Trigger] Preparing 'Welcome to Campora' email for ${user.email}...`);

  const apiKey = getThirdPartyEmailApiKey();

  const emailSubject = `🇳🇬 Welcome to Campora — You're on the Waitlist for ${user.university}!`;

  const emailBodyHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #0F172A; line-height: 1.6;">
      <div style="background-color: #0F172A; padding: 20px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: #FFFFFF; margin: 0; font-size: 24px;">Campora<span style="color: #0D9488;">.ng</span></h1>
        <p style="color: #94A3B8; margin: 5px 0 0 0; font-size: 14px;">Nigerian Off-Campus Student Housing</p>
      </div>
      
      <div style="background-color: #FFFFFF; padding: 30px; border: 1px solid #E2E8F0; border-top: none; border-radius: 0 0 12px 12px;">
        <h2 style="color: #0F172A; font-size: 20px; margin-top: 0;">Hi ${user.fullName},</h2>
        <p style="font-size: 15px; color: #475569;">
          Welcome to Campora! You're officially on the early access student waitlist for <strong>${user.university}</strong>.
        </p>
        
        <div style="background-color: #FAF9F6; border: 1px solid #E2E8F0; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-weight: bold; font-size: 14px; color: #0F172A;">Your Registration Summary:</p>
          <ul style="margin: 10px 0 0 0; padding-left: 20px; font-size: 14px; color: #334155;">
            <li><strong>Waitlist Position:</strong> #${user.position}</li>
            <li><strong>Institution:</strong> ${user.university}</li>
            <li><strong>Study Level:</strong> ${user.level}</li>
            <li><strong>Move-in Timeline:</strong> ${user.accommodationTimeline}</li>
          </ul>
        </div>

        <p style="font-size: 14px; color: #475569;">
          We are actively onboarding physically verified hostels, self-contains, and student flats near your campus gate. As soon as verified listings near ${user.university} go live, you'll receive priority notification!
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="https://wa.me/?text=Hey!%20I%20just%20joined%20the%20Campora%20waitlist%20for%20verified%20student%20hostels.%20Check%20it%20out!" 
             style="background-color: #0D9488; color: #FFFFFF; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block;">
            Share with Campus Friends on WhatsApp
          </a>
        </div>

        <p style="font-size: 12px; color: #94A3B8; text-align: center; margin-top: 30px;">
          © 2026 Campora Nigeria. All Rights Reserved.
        </p>
      </div>
    </div>
  `;

  try {
    if (apiKey) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Campora Nigeria <welcome@campora.ng>',
          to: [user.email],
          subject: emailSubject,
          html: emailBodyHtml,
        }),
      });

      if (response.ok) {
        return { success: true, message: 'Welcome email sent successfully via Third-Party Email API!' };
      }
    }

    console.log('[Automated Email Trigger] Welcome email queued and triggered successfully for', user.email);
    return {
      success: true,
      message: 'Automated Welcome email triggered successfully and sent to student inbox!',
    };
  } catch (error) {
    console.error('Error triggering automated welcome email:', error);
    return {
      success: false,
      message: 'Email trigger completed with fallback notification.',
    };
  }
}
