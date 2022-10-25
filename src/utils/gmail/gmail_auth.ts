import { google } from "googleapis";
import dotenv from "dotenv";
import { OAuth2Client } from "googleapis-common";

dotenv.config();

const CLIENT_ID = process.env.GMAIL_API_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_API_CLIENT_SECRET;
const REDIRECT_URI = process.env.GMAIL_API_REDIRECT_URI;

const REFRESH_TOKEN = process.env.GMAIL_API_REFRESH_TOKEN;

const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

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

  // oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  return oAuth2Client;
}

export async function getAuthorizeURL(): Promise<string> {
  let client: OAuth2Client = await getOAuthClient();
  const authUrl: string = client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
  });
  return authUrl;
}

export async function generateRefreshTokenFromAuthCode(
  code: string
): Promise<string> {
  let client: OAuth2Client = await getOAuthClient();
  const { tokens } = await client.getToken(code);
  return tokens.refresh_token!;
}
