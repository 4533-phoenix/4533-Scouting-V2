import fs from "fs/promises";
import path from "path";
import {authenticate} from "@google-cloud/local-auth";
import {google} from "googleapis";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
// The file token.json stores the user"s access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(__dirname, "token.json");
const CREDENTIALS_PATH = path.join(__dirname, "credentials.json");

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    // @ts-ignore
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

// @ts-ignore
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  // @ts-ignore
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  // @ts-ignore
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  // @ts-ignore
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

// @ts-ignore
// async function listMajors() {
//   const sheets = google.sheets({version: "v4", client});
//   const res = await sheets.spreadsheets.values.get({
//     spreadsheetId: "1du2nhcwpTCuFTysOjCrpxhoGi95i9u6V_YX2d1SU8pU",
//     range: "Data!A1:E",
//   });
//   const rows = res.data.values;
//   if (!rows || rows.length === 0) {
//     console.log("No data found.");
//     return;
//   }
//   console.log("Name, Major:");
//   rows.forEach((row) => {
//     // Print columns A and E, which correspond to indices 0 and 4.
//     console.log(row);
//   });
// }

// append data to a sheet using an array of values
// @ts-ignore
async function appendData(auth, data, sheetId, sheet) {
  // @ts-ignore
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

// appendData([
//   "test",
// ], "1du2nhcwpTCuFTysOjCrpxhoGi95i9u6V_YX2d1SU8pU", "Data")


export default {
  authorize: authorize,
  appendData: appendData
}