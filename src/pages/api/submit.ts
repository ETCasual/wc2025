/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type Forms } from "@/Errors";
import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";

const SubmitRegistration = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === "POST") {
    const {
      name,
      chi_name,
      gender,
      age,
      contact_number,
      pastoral_status,
      pastoral_team,
      sessions,
      small_team,
    } = JSON.parse(req.body as string) as Forms;

    // Trim whitespace from all string values
    const trimmedData = {
      name: name.trim(),
      chi_name: chi_name.trim(),
      gender: gender.trim(),
      contact_number: contact_number.trim(),
      pastoral_status: pastoral_status.trim(),
      pastoral_team: pastoral_team.trim(),
      small_team: small_team.trim(),
      sessions,
    };

    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.CLIENT_EMAIL,
          client_id: process.env.CLIENT_ID,
          private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
        },
        scopes: [
          "https://www.googleapis.com/auth/drive",
          "https://www.googleapis.com/auth/drive.file",
          "https://www.googleapis.com/auth/spreadsheets",
        ],
      });
      const sheets = google.sheets({
        auth,
        version: "v4",
      });

      const now = Date.now();
      const newSessions = trimmedData.sessions.map((b) => b.split(" | ")[0]);
      newSessions.sort();

      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: "'Master Sheet'!A:K",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [
              `=TEXT(EPOCHTODATE(${now}/1000 + 8*3600), "yyyy-mm-dd hh:mm:ss")`,
              trimmedData.name,
              trimmedData.chi_name,
              trimmedData.gender,
              age,
              trimmedData.contact_number,
              trimmedData.pastoral_status,
              trimmedData.pastoral_team,
              trimmedData.small_team,
              newSessions.join(", "),
            ],
          ],
        },
      });

      res.status(200).json({});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
  }
};

export default SubmitRegistration;
