import "dotenv/config";

async function sendViaAcs({ to, subject, html }) {
  const { EmailClient } = await import("@azure/communication-email");
  const client = new EmailClient(process.env.ACS_CONNECTION_STRING);
  const poller = await client.beginSend({
    senderAddress: process.env.ACS_SENDER_ADDRESS,
    content: { subject, html },
    recipients: { to: [{ address: to }] },
  });
  await poller.pollUntilDone();
}

export async function sendEmail({ to, subject, html }) {
  if (process.env.EMAIL_PROVIDER === "acs") {
    await sendViaAcs({ to, subject, html });
    return;
  }
  // Default: log to console so local dev works without ACS provisioned.
  console.log(`\n[email:console] To: ${to}\nSubject: ${subject}\n${html}\n`);
}
