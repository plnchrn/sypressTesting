import { ImapFlow } from "imapflow";
import dotenv from "dotenv";
dotenv.config();

export async function getCode() {
  const client = new ImapFlow({
    host: "imap.yandex.ru",
    port: 993,
    secure: true,
    auth: {
      user: process.env.TO_SEND_MAIL as string,
      pass: process.env.PASS_SEND_MAIL as string,
    },
    logger: false,
  });

  await client.connect();

  const lock = await client.getMailboxLock("INBOX");

  try {
    interface EmailMessage {
      uid: number;
      subject: string | undefined;
      from: Array<{ name?: string; address?: string }> | undefined;
      date: Date | undefined;
      raw?: string;
    }

    const messages: EmailMessage[] = [];

    const mailbox = client.mailbox;

    // Check if mailbox is actually open
    if (!mailbox) {
      throw new Error("Mailbox not opened");
    }

    const from = Math.max(1, mailbox.exists - 9);
    const to = mailbox.exists;

    for await (const msg of client.fetch(`${from}:${to}`, {
      envelope: true,
      source: true,
      bodyStructure: true,
    })) {
      messages.push({
        uid: msg.uid,
        subject: msg.envelope?.subject,
        from: msg.envelope?.from,
        date: msg.envelope?.date,
        raw: msg.source?.toString(),
      });
    }

    messages.reverse();

    const message = messages.find((m) =>
      m.from ? m.from[0].address === "no-reply@soundl.ink" : false,
    );

    if (!message) {
      return null;
    }

    const match = message.raw?.match(/<b>(.*?)<\/b>/);

    if (!match) {
      return null;
    }

    return match[0].replace(/<[^>]*>/g, "");
  } finally {
    lock.release();
    await client.logout();
  }
}
