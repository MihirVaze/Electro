import nodemailer from 'nodemailer';

export const sendEmail = (sendTo: string, subject: string, textInHtml: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_PASS,
    },
  });
  (async () => {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_SENDMAIL_FROM,
      to: sendTo,
      subject: subject,
      html: textInHtml,
    });
    console.log(`Message sent to ${sendTo}`, info.messageId);
  })();
};
