/**
 * Morya Engineering Works — website contact form handler.
 *
 * Setup:
 * 1. Open (or create) the Google Sheet you want enquiries logged into.
 * 2. Extensions > Apps Script. Delete any boilerplate code and paste this file in.
 * 3. Update NOTIFY_EMAIL below if needed.
 * 4. Deploy > New deployment > type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the deployment's Web app URL into GOOGLE_SCRIPT_URL in the Next.js .env.
 * 6. Re-run "Deploy" (new version) any time you edit this script.
 */

const NOTIFY_EMAIL = "moryaengineering1011@gmail.com";
const SHEET_NAME = "Enquiries";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const { name, company, email, phone, projectType, message } = data;

    if (!name || !email || !phone || !projectType || !message) {
      return jsonResponse({ ok: false, error: "Missing required fields." });
    }

    const sheet = getSheet();
    const timestamp = new Date();
    sheet.appendRow([timestamp, name, company || "", email, phone, projectType, message]);

    sendNotificationEmail({ name, company, email, phone, projectType, message, timestamp });

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["Timestamp", "Name", "Company", "Email", "Phone", "Project Type", "Message"]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function sendNotificationEmail({ name, company, email, phone, projectType, message, timestamp }) {
  const subject = `New Enquiry — ${name}${company ? " (" + company + ")" : ""}`;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
      <div style="background-color: #0b1f3a; padding: 20px 24px;">
        <h2 style="color: #ffffff; margin: 0; font-size: 18px;">Morya Engineering Works</h2>
        <p style="color: #c9a24b; margin: 4px 0 0; font-size: 13px;">New Website Enquiry</p>
      </div>
      <div style="padding: 24px; border: 1px solid #e5e5e5; border-top: none;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #666; width: 140px;">Name</td>
            <td style="padding: 8px 0; font-weight: bold;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Company</td>
            <td style="padding: 8px 0;">${escapeHtml(company || "—")}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Phone</td>
            <td style="padding: 8px 0;"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Project Type</td>
            <td style="padding: 8px 0;">${escapeHtml(projectType)}</td>
          </tr>
        </table>
        <div style="margin-top: 16px;">
          <p style="color: #666; margin: 0 0 6px; font-size: 14px;">Message</p>
          <p style="white-space: pre-wrap; margin: 0; padding: 12px; background: #f7f7f7; border-left: 3px solid #c9a24b; font-size: 14px;">${escapeHtml(message)}</p>
        </div>
        <p style="margin-top: 24px; font-size: 12px; color: #999;">
          Received ${timestamp.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} via moryaengineeringworks.com
        </p>
      </div>
    </div>
  `;

  const plainBody =
    `New enquiry from the website:\n\n` +
    `Name: ${name}\n` +
    `Company: ${company || "-"}\n` +
    `Email: ${email}\n` +
    `Phone: ${phone}\n` +
    `Project Type: ${projectType}\n\n` +
    `Message:\n${message}\n\n` +
    `Received ${timestamp.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`;

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: email,
    subject,
    body: plainBody,
    htmlBody,
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
