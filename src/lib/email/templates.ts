/**
 * Small, dependency-free HTML email templates. A JSX templating framework
 * (react-email) was considered but its component package was deprecated
 * upstream during this build — for three short transactional emails, plain
 * template functions are simpler to maintain and have zero extra
 * dependencies.
 */

function layout(title: string, bodyHtml: string) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#F8FAF4;font-family:-apple-system,Segoe UI,Roboto,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAF4;padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #DFE4D7;">
            <tr>
              <td style="background:#2E5339;padding:20px 28px;">
                <span style="color:#ffffff;font-size:18px;font-weight:600;">Merriman Park Estates</span>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;color:#1A1C18;font-size:15px;line-height:1.6;">
                <h1 style="font-size:20px;margin:0 0 16px;">${title}</h1>
                ${bodyHtml}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function verificationCodeEmail(code: string) {
  return {
    subject: "Your MPE resident portal verification code",
    html: layout(
      "Verify your email",
      `<p>Use this code to finish creating your resident portal account:</p>
       <p style="font-size:32px;font-weight:700;letter-spacing:6px;margin:20px 0;color:#2E5339;">${code}</p>
       <p style="color:#43483E;">This code expires in 15 minutes. If you didn't request this, you can ignore this email.</p>`
    ),
  };
}

export function flockRequestNotificationEmail(request: {
  requesterName: string;
  requesterEmail: string;
  incidentWhen: string;
  description: string;
}) {
  return {
    subject: `New Flock footage request from ${request.requesterName}`,
    html: layout(
      "New Flock footage request",
      `<p><strong>From:</strong> ${escapeHtml(request.requesterName)} (${escapeHtml(request.requesterEmail)})</p>
       <p><strong>Approximate date/time:</strong> ${escapeHtml(request.incidentWhen)}</p>
       <p><strong>Description:</strong><br/>${escapeHtml(request.description).replace(/\n/g, "<br/>")}</p>
       <p style="color:#43483E;">Review and update this request from the admin dashboard.</p>`
    ),
  };
}

export function contactUsNotificationEmail(message: {
  name: string;
  email: string;
  subject?: string;
  body: string;
}) {
  return {
    subject: `Email Us: ${message.subject || "New message"} — from ${message.name}`,
    html: layout(
      "New message from Email Us",
      `<p><strong>From:</strong> ${escapeHtml(message.name)} (${escapeHtml(message.email)})</p>
       ${message.subject ? `<p><strong>Subject:</strong> ${escapeHtml(message.subject)}</p>` : ""}
       <p><strong>Message:</strong><br/>${escapeHtml(message.body).replace(/\n/g, "<br/>")}</p>`
    ),
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
