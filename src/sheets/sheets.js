import fs from "fs/promises";
import path from "path";
import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const PRIVATEKEY_PATH = path.join(__dirname, "privatekey.json");

async function authorize() {
  const privateKeyRawData = await fs.readFile(PRIVATEKEY_PATH, "utf8");
  const privateKeyData = JSON.parse(privateKeyRawData);

  const auth = new google.auth.JWT(
    privateKeyData.client_email,
    undefined,
    privateKeyData.private_key,
    SCOPES
  )

  auth.authorize((err) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  return auth;
}

// append data to a sheet using an array of values
/**
 * @param {any} auth
 * @param {ArrayLike<any>} data
 * @param {string} sheetId
 * @param {string} sheet
 */
async function appendData(auth, data, sheetId, sheet) {
  const sheets = google.sheets({ version: "v4", auth });
  try {
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
  } catch (err) {
    return false;
  }
  return true;
}

/**
 * @param {any} auth
 * @param {string} sheetId
 * @param {string} sheet
 */
async function getAllData(auth, sheetId, sheet) {
  const sheets = google.sheets({ version: "v4", auth });
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