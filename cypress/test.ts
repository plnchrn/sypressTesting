import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";
import dotenv from "dotenv";
dotenv.config();

async function readLatestEmail() {
  const client = new ImapFlow({
    host: "imap.yandex.ru",
    port: 993,
    secure: true,
    auth: {
      user: process.env.TO_SEND_MAIL!, // Ваш email
      pass: process.env.PASS_SEND_MAIL, // Пароль приложения!
    },
    logger: false, // Отключаем лишние логи, если не нужны
  });

  // try {
  await client.connect();

  // блокируем INBOX
  const lock = await client.getMailboxLock("INBOX");

  try {
    const messages: any = [];

    // выбираем диапазон писем (например, последние 10)
    const mailbox = client.mailbox;
    const from = Math.max(1, mailbox.exists - 9);
    const to = mailbox.exists;

    for await (const msg of client.fetch(
      { seq: `${from}:${to}` },
      {
        envelope: true,
        source: true,
        bodyStructure: true,
      },
    )) {
      messages.push({
        uid: msg.uid,
        subject: msg.envelope.subject,
        from: msg.envelope.from,
        date: msg.envelope.date,
        raw: msg.source.toString(),
      });
    }

    console.log(messages[messages.length - 1]);
  } finally {
    lock.release();
    await client.logout();
  }
}

// Вызов
readLatestEmail();
