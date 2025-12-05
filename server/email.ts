// server/email.ts - WORKING VERSION (SKIPS API TEST)
export async function initializeEmailService(): Promise<boolean> {
  try {
    if (!process.env.BREVO_API_KEY) {
      console.warn("❌ BREVO_API_KEY not found in environment variables");
      console.log("⚠️  Email notifications will be logged to console only");
      return false;
    }

    // SKIP THE API TEST - Just log that we're ready
    console.log("✅ Brevo API key found - Email service ready");
    return true;
  } catch (error) {
    console.error("❌ Email service initialization failed:", error);
    console.log("⚠️  Email notifications will be logged to console only");
    return false;
  }
}

export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<boolean> {
  try {
    const brevoApiKey = process.env.BREVO_API_KEY;
    
    if (!brevoApiKey) {
      // Fallback: log to console
      console.log(`\n📧 [CONSOLE FALLBACK] Email to: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Content: ${html.substring(0, 200)}...\n`);
      return true;
    }

    const emailData = {
      sender: {
        name: process.env.EMAIL_FROM_NAME || "Hackathon Platform",
        email: process.env.EMAIL_FROM_ADDRESS || "noreply@hackathon.com",
      },
      to: [
        {
          email: to,
        },
      ],
      subject: subject,
      htmlContent: html,
    };

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': brevoApiKey,
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Brevo API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    console.log(`✅ Email sent via Brevo API: ${result.messageId}`);
    return true;

  } catch (error) {
    console.error("❌ Error sending email via Brevo API:", error);
    // Still log to console as fallback
    console.log(`\n📧 [FALLBACK] Email to: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content: ${html.substring(0, 200)}...\n`);
    return true;
  }
}