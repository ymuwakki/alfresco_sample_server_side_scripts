function createFolder(folderPath, folderName) {
	// print ("folderPath: " + folderPath);
	// print ("folderName: " + folderName);
	var folderObj = null;
	var folderPathObj = companyhome.childByNamePath(folderPath);
	if (folderPathObj != null) {
		var folderObj = companyhome.childByNamePath(folderPath+"/"+folderName);
		if (folderObj == null) {
			var props = new Array();
			//props['cm:name'] = folderName;
			props['cm:title'] = folderName;
			folderObj = folderPathObj.createNode(folderName, "rma:recordFolder", props);
		}
	}
	return(folderObj);
}


function main()
{
	// If property values exist move file to dynamic location
	// For Birth Certificate Requests (type cbgecms:birth_certificate_request)
	// Get creation date, birth name.
	// /Sites/rm/documentLibrary/City Clerk's Office/Birth Certificate Orders/2017/10/<birthname>/
	
	// For Electric Permits (aspect cbgecms:electrical_permit)
	// 	Get creation date, birth name.
	// /Sites/rm/documentLibrary/Electrical/Electrical Permits/2017/10/<permitno>/
	
	// NOTES: 
	// To move a file to the File Plan the current user must have write permission on the File Plan.
	// It seems the last user performing the task (update), will invoke the rule.  
	// So that user must be a Records Administrator to have automatic full rights, or the File plan permissions must be modified.
	// Also you can create only 1 subfolder under a Category folder

	
	var typeName = document.getTypeShort();
	
	if (typeName == "cbgecms:birth_certificate_request") {

		// Get Birth Name
		// Create Folder if does not exist
		//
		var folderPath = "/Sites/rm/documentLibrary/City Clerk's Office/Birth Certificate Requests";
		var birthName = document.properties["cbgecms:birth_name"];
		var finalFolder = null;
		// print ("Year: " + year + " Month: " + month + " Day: " + day);
		// print ("Birth Name: " + birthName);
		if (birthName != null) {
			// Create Folder Structure
			finalFolder =createFolder(folderPath, birthName);
			// Move File to Folder
			if (finalFolder != null) {
				document.move(finalFolder);
			}
		}
	}
	//NOTE: You can only create one folder underneath the category.  You cannot have nested folders.
	if (typeName == "cbgecms:electrical_permit_request") {

		// Get Permit No
		// Create Folder if does not exist
		//
		var folderPath = "/Sites/rm/documentLibrary/Electrical/Electrical Permits";
		var permitNo = document.properties["cbgecms:permit_no"];
		var finalFolder = null;
		// print ("Permit No: " + permitNo);
		if (permitNo != null) {
			// Create Folder Structure
			finalFolder =createFolder(folderPath, permitNo);
			// Move File to Folder
			if (finalFolder != null) {
				document.move(finalFolder);
			}
		}
	}

}

main();

