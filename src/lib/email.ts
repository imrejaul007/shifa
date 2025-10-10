/**
 * Email Service using Resend
 * Handles all email notifications for the platform
 */

import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Shifa AlHind <noreply@shifaalhind.com>';
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'admin@shifaalhind.com';

export interface ConsultationEmailData {
  name: string;
  email: string;
  phone: string;
  treatment: string;
  message?: string;
  locale: 'en' | 'ar';
}

export interface BookingEmailData {
  name: string;
  email: string;
  phone: string;
  treatment: string;
  hospitalName?: string;
  doctorName?: string;
  preferredDate?: string;
  locale: 'en' | 'ar';
}

/**
 * Send consultation request confirmation email to patient
 */
export async function sendConsultationConfirmation(data: ConsultationEmailData) {
  const isArabic = data.locale === 'ar';

  const subject = isArabic
    ? 'تأكيد استلام طلب الاستشارة - شفاء الهند'
    : 'Consultation Request Received - Shifa AlHind';

  const html = isArabic
    ? `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; direction: rtl; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #005b4f; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
          .button { display: inline-block; padding: 12px 24px; background-color: #005b4f; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          .info-box { background-color: #fff; padding: 15px; border-right: 4px solid #005b4f; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>شفاء الهند</h1>
            <p>شريكك الموثوق للسياحة العلاجية</p>
          </div>
          <div class="content">
            <h2>مرحباً ${data.name}،</h2>
            <p>شكراً لك على التواصل مع شفاء الهند. لقد استلمنا طلب استشارتك وسنقوم بالرد عليك في أقرب وقت ممكن.</p>

            <div class="info-box">
              <h3>تفاصيل طلبك:</h3>
              <p><strong>العلاج المطلوب:</strong> ${data.treatment}</p>
              <p><strong>البريد الإلكتروني:</strong> ${data.email}</p>
              <p><strong>رقم الهاتف:</strong> ${data.phone}</p>
              ${data.message ? `<p><strong>رسالتك:</strong> ${data.message}</p>` : ''}
            </div>

            <h3>ماذا يحدث بعد ذلك؟</h3>
            <ol>
              <li>سيتواصل معك فريقنا خلال 24 ساعة</li>
              <li>سنقوم بمراجعة حالتك وتقديم خطة علاجية مفصلة</li>
              <li>سنساعدك في اختيار أفضل مستشفى وطبيب</li>
              <li>سنقوم بترتيب جميع التفاصيل اللوجستية</li>
            </ol>

            <p>في حالة الطوارئ، يمكنك التواصل معنا على:</p>
            <p><strong>واتساب:</strong> <a href="https://wa.me/918012345678">+91 80123 45678</a></p>
            <p><strong>البريد الإلكتروني:</strong> <a href="mailto:contact@shifaalhind.com">contact@shifaalhind.com</a></p>

            <a href="https://shifaalhind.com/ar" class="button">زيارة موقعنا</a>
          </div>
          <div class="footer">
            <p>شفاء الهند - شريكك الموثوق للسياحة العلاجية من الخليج إلى الهند</p>
            <p>بنغالور، كارناتاكا، الهند</p>
            <p>
              <a href="https://shifaalhind.com/ar/privacy-policy">سياسة الخصوصية</a> |
              <a href="https://shifaalhind.com/ar/terms-and-conditions">الشروط والأحكام</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `
    : `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #005b4f; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
          .button { display: inline-block; padding: 12px 24px; background-color: #005b4f; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          .info-box { background-color: #fff; padding: 15px; border-left: 4px solid #005b4f; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Shifa AlHind</h1>
            <p>Your Trusted Medical Tourism Partner</p>
          </div>
          <div class="content">
            <h2>Hello ${data.name},</h2>
            <p>Thank you for reaching out to Shifa AlHind. We have received your consultation request and will get back to you as soon as possible.</p>

            <div class="info-box">
              <h3>Your Request Details:</h3>
              <p><strong>Treatment Required:</strong> ${data.treatment}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phone:</strong> ${data.phone}</p>
              ${data.message ? `<p><strong>Your Message:</strong> ${data.message}</p>` : ''}
            </div>

            <h3>What Happens Next?</h3>
            <ol>
              <li>Our team will contact you within 24 hours</li>
              <li>We'll review your case and provide a detailed treatment plan</li>
              <li>We'll help you choose the best hospital and doctor</li>
              <li>We'll arrange all logistics and travel details</li>
            </ol>

            <p>For urgent inquiries, you can reach us at:</p>
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/918012345678">+91 80123 45678</a></p>
            <p><strong>Email:</strong> <a href="mailto:contact@shifaalhind.com">contact@shifaalhind.com</a></p>

            <a href="https://shifaalhind.com/en" class="button">Visit Our Website</a>
          </div>
          <div class="footer">
            <p>Shifa AlHind - Your Trusted Medical Tourism Partner from GCC to India</p>
            <p>Bangalore, Karnataka, India</p>
            <p>
              <a href="https://shifaalhind.com/en/privacy-policy">Privacy Policy</a> |
              <a href="https://shifaalhind.com/en/terms-and-conditions">Terms & Conditions</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending consultation confirmation email:', error);
    return { success: false, error };
  }
}

/**
 * Send notification to admin about new consultation request
 */
export async function sendAdminConsultationNotification(data: ConsultationEmailData) {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #005b4f; color: white; padding: 15px; border-radius: 5px 5px 0 0; }
        .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }
        .info-row { display: flex; padding: 10px 0; border-bottom: 1px solid #ddd; }
        .info-label { font-weight: bold; width: 150px; }
        .alert-box { background-color: #fff3cd; border-left: 4px solid #ff6b6b; padding: 15px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🔔 New Consultation Request</h2>
        </div>
        <div class="content">
          <div class="alert-box">
            <strong>⏰ Action Required:</strong> A new patient has requested a consultation. Please respond within 24 hours.
          </div>

          <h3>Patient Details:</h3>
          <div class="info-row">
            <div class="info-label">Name:</div>
            <div>${data.name}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Email:</div>
            <div><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          <div class="info-row">
            <div class="info-label">Phone:</div>
            <div><a href="tel:${data.phone}">${data.phone}</a></div>
          </div>
          <div class="info-row">
            <div class="info-label">Treatment:</div>
            <div>${data.treatment}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Language:</div>
            <div>${data.locale === 'ar' ? 'Arabic (العربية)' : 'English'}</div>
          </div>
          ${
            data.message
              ? `
          <div style="margin-top: 20px;">
            <strong>Message:</strong>
            <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${data.message}
            </div>
          </div>
          `
              : ''
          }

          <div style="margin-top: 30px; padding: 15px; background: white; border-radius: 5px;">
            <h4>Quick Actions:</h4>
            <ul>
              <li><a href="https://wa.me/${data.phone.replace(/\D/g, '')}">Contact via WhatsApp</a></li>
              <li><a href="mailto:${data.email}">Reply via Email</a></li>
              <li><a href="https://shifaalhind.com/admin/bookings">View in Dashboard</a></li>
            </ul>
          </div>

          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            <em>This is an automated notification from Shifa AlHind. Do not reply to this email.</em>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `🔔 New Consultation Request from ${data.name}`,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending admin notification:', error);
    return { success: false, error };
  }
}

/**
 * Send booking confirmation email to patient
 */
export async function sendBookingConfirmation(data: BookingEmailData) {
  const isArabic = data.locale === 'ar';

  const subject = isArabic
    ? 'تأكيد حجز الموعد - شفاء الهند'
    : 'Booking Confirmation - Shifa AlHind';

  const html = isArabic
    ? `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; direction: rtl; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #005b4f; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
          .success-box { background-color: #d4edda; border-right: 4px solid #28a745; padding: 15px; margin: 20px 0; }
          .info-box { background-color: #fff; padding: 15px; margin: 20px 0; border-radius: 5px; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ تم تأكيد حجزك</h1>
          </div>
          <div class="content">
            <div class="success-box">
              <h3>عزيزي/عزيزتي ${data.name}،</h3>
              <p>تم تأكيد حجز موعدك بنجاح! نحن متحمسون لمساعدتك في رحلتك العلاجية.</p>
            </div>

            <div class="info-box">
              <h3>تفاصيل الحجز:</h3>
              <p><strong>العلاج:</strong> ${data.treatment}</p>
              ${data.hospitalName ? `<p><strong>المستشفى:</strong> ${data.hospitalName}</p>` : ''}
              ${data.doctorName ? `<p><strong>الطبيب:</strong> ${data.doctorName}</p>` : ''}
              ${data.preferredDate ? `<p><strong>التاريخ المفضل:</strong> ${data.preferredDate}</p>` : ''}
            </div>

            <h3>الخطوات التالية:</h3>
            <ol>
              <li>سنتواصل معك خلال 24 ساعة لتأكيد موعدك النهائي</li>
              <li>سنرسل لك خطاب دعوة للتأشيرة الطبية</li>
              <li>سنساعدك في ترتيبات السفر والإقامة</li>
              <li>سيكون لديك منسق شخصي طوال رحلتك</li>
            </ol>

            <p><strong>للأسئلة العاجلة:</strong></p>
            <p>واتساب: <a href="https://wa.me/918012345678">+91 80123 45678</a></p>
          </div>
          <div class="footer">
            <p>شفاء الهند - شريكك الموثوق للسياحة العلاجية</p>
          </div>
        </div>
      </body>
      </html>
    `
    : `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #005b4f; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
          .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
          .success-box { background-color: #d4edda; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0; }
          .info-box { background-color: #fff; padding: 15px; margin: 20px 0; border-radius: 5px; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Booking Confirmed</h1>
          </div>
          <div class="content">
            <div class="success-box">
              <h3>Dear ${data.name},</h3>
              <p>Your appointment has been successfully confirmed! We're excited to assist you in your medical journey.</p>
            </div>

            <div class="info-box">
              <h3>Booking Details:</h3>
              <p><strong>Treatment:</strong> ${data.treatment}</p>
              ${data.hospitalName ? `<p><strong>Hospital:</strong> ${data.hospitalName}</p>` : ''}
              ${data.doctorName ? `<p><strong>Doctor:</strong> ${data.doctorName}</p>` : ''}
              ${data.preferredDate ? `<p><strong>Preferred Date:</strong> ${data.preferredDate}</p>` : ''}
            </div>

            <h3>Next Steps:</h3>
            <ol>
              <li>We'll contact you within 24 hours to confirm your final appointment</li>
              <li>We'll send you a medical visa invitation letter</li>
              <li>We'll help arrange your travel and accommodation</li>
              <li>You'll have a personal coordinator throughout your journey</li>
            </ol>

            <p><strong>For Urgent Questions:</strong></p>
            <p>WhatsApp: <a href="https://wa.me/918012345678">+91 80123 45678</a></p>
          </div>
          <div class="footer">
            <p>Shifa AlHind - Your Trusted Medical Tourism Partner</p>
          </div>
        </div>
      </body>
      </html>
    `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending booking confirmation:', error);
    return { success: false, error };
  }
}

/**
 * Send admin notification for new booking
 */
export async function sendAdminBookingNotification(data: BookingEmailData) {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #28a745; color: white; padding: 15px; border-radius: 5px 5px 0 0; }
        .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }
        .alert-box { background-color: #d1ecf1; border-left: 4px solid #0c5460; padding: 15px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🎉 New Booking Received!</h2>
        </div>
        <div class="content">
          <div class="alert-box">
            <strong>⏰ High Priority:</strong> A patient has completed a booking. Please process this within 24 hours.
          </div>

          <h3>Patient Details:</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
          <p><strong>Treatment:</strong> ${data.treatment}</p>
          ${data.hospitalName ? `<p><strong>Hospital:</strong> ${data.hospitalName}</p>` : ''}
          ${data.doctorName ? `<p><strong>Doctor:</strong> ${data.doctorName}</p>` : ''}
          ${data.preferredDate ? `<p><strong>Preferred Date:</strong> ${data.preferredDate}</p>` : ''}
          <p><strong>Language:</strong> ${data.locale === 'ar' ? 'Arabic (العربية)' : 'English'}</p>

          <div style="margin-top: 20px;">
            <a href="https://shifaalhind.com/admin/bookings" style="display: inline-block; padding: 12px 24px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">View in Dashboard</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `🎉 New Booking from ${data.name} - ${data.treatment}`,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending admin booking notification:', error);
    return { success: false, error };
  }
}

/**
 * Test email configuration
 */
export async function testEmailConfiguration() {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: 'Shifa AlHind Email Configuration Test',
      html: '<h1>Email configuration is working correctly!</h1><p>Your Resend integration is set up properly.</p>',
    });
    return { success: true };
  } catch (error) {
    console.error('Email configuration test failed:', error);
    return { success: false, error };
  }
}
