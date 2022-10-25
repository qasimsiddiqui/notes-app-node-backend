import { google } from "googleapis";
import MailComposer from "nodemailer/lib/mail-composer";
import { Options } from "nodemailer/lib/mailer";
import { OAuth2Client } from "googleapis-common";
import { getOAuthClient } from "./gmail_auth";

// build and encode the mail
function buildMessage(to: string, name: string, senderName: string) {
  return new Promise<string>((resolve, reject) => {
    const mailOptions = {
      from: "qasim.siddiqui@aurorasolutions.io",
      to: to,
      subject: "Notes App",
      text: `Hi ${name}, \n${senderName} shared a note with you.`,
      textEncoding: "base64",
    } as Options;
    const message = new MailComposer(mailOptions);
    message.compile().build((err, msg) => {
      if (err) {
        reject(err);
      }
      const encodedMessage = Buffer.from(msg)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "-")
        .replace(/=+$/, "");
      resolve(encodedMessage);
    });
  });
}

/**
 * Send Email
 */
export async function sendMail(
  refreshToken: string,
  to: string,
  name: string,
  senderName: string
) {
  try {
    const encodedMessage = await buildMessage(to, name, senderName);

    const auth: OAuth2Client = await getOAuthClient();
    auth.setCredentials({ refresh_token: refreshToken });

    const gmail = google.gmail({ version: "v1", auth });

    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });
    console.log("Email sent");
  } catch (error) {
    console.log(error);
  }
}
