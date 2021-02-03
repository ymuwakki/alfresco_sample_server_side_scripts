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
	
	// For Notices 
	// 	Get creation date, birth name.
	
	// /Sites/rm/documentLibrary/HUD/Administrative Records/Notices/<noticeNo>
	
	// NOTES: 
	// To move a file to the File Plan the current user must have write permission on the File Plan.
	// It seems the last user performing the task (update), will invoke the rule.  
	// So that user must be a Records Administrator to have automatic full rights, or the File plan permissions must be modified.
	// Also you can create only 1 subfolder under a Category folder

	
	//NOTE: You can only create one folder underneath the category.  You cannot have nested folders.

	// Get Notice No
	// Create Folder if does not exist
	//
	var folderPath = "/Sites/rm/documentLibrary/HUD/Administrative Records/Notices";
	var noticeNo = document.properties["hudedms:notice_num"];
	var finalFolder = null;
	// print ("Permit No: " + noticeNo);
	if (noticeNo != null) {
		// Create Folder Structure
		finalFolder =createFolder(folderPath, noticeNo);
		// Move File to Folder
		if (finalFolder != null) {
			document.move(finalFolder);
		}
	}
}

main();

