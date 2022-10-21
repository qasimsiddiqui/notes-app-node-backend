import { google } from "googleapis";
import dotenv from "dotenv";
import { OAuth2Client } from "googleapis-common";

dotenv.config();

const CLIENT_ID = process.env.GMAIL_API_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_API_CLIENT_SECRET;
const REDIRECT_URI = process.env.GMAIL_API_REDIRECT_URI;

const REFRESH_TOKEN = process.env.GMAIL_API_REFRESH_TOKEN;

// const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

// const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
export async function getOAuthClient(): Promise<OAuth2Client> {
  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );

  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  return oAuth2Client;
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
// async function saveCredentials(client: OAuth2Client): Promise<void> {
// const content = (await readFile(CREDENTIALS_PATH)).toString();
// const keys = JSON.parse(content);
// const key = keys.installed || keys.web;
// const payload = JSON.stringify({
//   type: "authorized_user",
//   client_id: key.client_id,
//   client_secret: key.client_secret,
//   refresh_token: client.credentials.refresh_token,
// });
// await writeFile(TOKEN_PATH, payload);
// }

/**
 * Load or request or authorization to call APIs.
 *
 */
// async function authorize() {
// let client = await getOAuthClient();
// if (client) {
//   return client;
// }
// client = await authenticate({
//   scopes: SCOPES,
//   keyfilePath: CREDENTIALS_PATH,
// });
// if (client.credentials) {
//   await saveCredentials(client);
// }
// return client;
// }
