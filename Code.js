function addContactsToGoogle() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var startRow = 2; // Data starts from 2nd row
  var numRows = sheet.getLastRow() - 1;
  
  // Select the data range
  if (numRows > 0) {
    var dataRange = sheet.getRange(startRow, 1, numRows, 20); 
    var data = dataRange.getValues();

    // ----- IMPORTANT: COLUMNS SETUP -----
    var nameColIndex = 0;   // Name 'Column A' = 0
    var phoneColIndex = 3;  // Phone 'Column B' = 1
    var statusColIndex = 6; // Status 'Column C' = 2
    // ------------------------------------

    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      var name = row[nameColIndex];
      var phone = "" + row[phoneColIndex]; 
      var status = row[statusColIndex];

      // Status 'Done' -checks whether it shows or not
      if (status != "done" && name != "" && phone != "undefined" && phone.length > 5) {
        try {
          var contact = People.People.createContact({
            names: [{ givenName: name }],
            phoneNumbers: [{ value: phone }]
          });
          
          // after saving it writes 'Done'
          sheet.getRange(startRow + i, statusColIndex + 1).setValue("done");
          Logger.log("Saved: " + name);
          
        } catch (e) {
          Logger.log("Error: " + e.message);
          sheet.getRange(startRow + i, statusColIndex + 1).setValue("Error");
        }
      }
    }
  }
}
// Run this fuction for once it will set for permanent
function setFiveDayTrigger() {
  // delete if there are any older triggers
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() == 'addContactsToGoogle') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  // new trigger runs for every five days
  ScriptApp.newTrigger('addContactsToGoogle')
      .timeBased()
      .everyDays(5) // here '5' meand five days
      .create();
      
  Logger.log("Success! From now onwards scripts runs for every 5 days.");
