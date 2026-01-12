# Google-Contacts-Auto-Sync-Bot
Automated Google Sheets to Google Contacts sync using Apps Script
# 🤖 Google Contacts Sync Bot

This project automates the process of importing customer details from a Google Sheet directly into Google Contacts using **Google Apps Script** and the **People API**.

## 🚀 Features
- **Automatic Sync:** Runs every 5 days automatically to fetch new leads.
- **Duplicate Prevention:** Checks the 'Status' column to ensure contacts are not saved twice.
- **Data Validation:** Cleans up names and validates phone numbers before saving.
- **Error Handling:** Logs errors and marks rows as 'Error' if the save fails.

## 🛠️ Tech Stack
- **Language:** JavaScript (Google Apps Script)
- **API:** Google People API
- **Database:** Google Sheets

## 📌 How it Works
1. The script reads data from the Google Sheet (Columns: Name, Phone, Status).
2. It filters out rows that are already marked as "Done".
3. Validates the phone number format.
4. Pushes the contact to Google Contacts via API.
5. Updates the Sheet status to "Done".
