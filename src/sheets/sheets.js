import fs from "fs/promises";
import path from "path";
import {authenticate} from "@google-cloud/local-auth";
import {google} from "googleapis";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const TOKEN_PATH = path.join(__dirname, "token.json");
const CREDENTIALS_PATH = path.join(__dirname, "credentials.json");

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content.toString());
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}


/**
 * @param {import("googleapis-common").OAuth2Client} client
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content.toString());
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
  const client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }

  const new_client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (new_client && new_client.credentials) {
    await saveCredentials(new_client);
  }
  return new_client;
}

// append data to a sheet using an array of values
/**
 * @param {any} auth
 * @param {ArrayLike<any>} data
 * @param {string} sheetId
 * @param {string} sheet
 */
async function appendData(auth, data, sheetId, sheet) {
  const sheets = google.sheets({version: "v4", auth});
  // @ts-ignore
  const res = sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${sheet}!A1`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    resource: {
      values: [data],
    },
  });
  return res;
}

/**
 * @param {any} auth
 * @param {string} sheetId
 * @param {string} sheet
 */
async function getAllData(auth, sheetId, sheet) {
  const sheets = google.sheets({version: "v4", auth});
  const res = sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${sheet}!A1:AC`,
  });
  return res;
}

export default {
  authorize: authorize,
  appendData: appendData,
  getAllData: getAllData
}