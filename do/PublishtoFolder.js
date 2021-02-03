function createFolder(folderPath, folderName) {
	// print ("folderPath: " + folderPath);
	// print ("folderName: " + folderName);
	var folderObj = null;
	var folderPathObj = companyhome.childByNamePath(folderPath);
	if (folderPathObj != null) {
		var folderObj = companyhome.childByNamePath(folderPath+"/"+folderName);
		if (folderObj == null) {
			folderObj = folderPathObj.createFolder(folderName);
		}
	}
	return(folderObj);
}

//print (document.getName());
if (document.hasAspect("dot:invoice")) {
	// Get Invoice Date
	// Get Year
	// Get Month
	// Get Invoice Nbr
	// Create Folder if does not exist
	//
	var folderPath = "/Sites/dot/documentLibrary/Published Invoices";
	var invoiceDate = document.properties["dot:invoice_date"];
	var month = invoiceDate.getUTCMonth() + 1; //months from 1-12
	var day = invoiceDate.getUTCDate();
	var year = invoiceDate.getUTCFullYear();
	var invoice = document.properties["dot:invoice_number"];
	var finalFolder = null;
	//print ("Year: " + year + " Month: " + month + " Day: " + day + " Invoice: " + invoice);

	if (invoiceDate != null && invoice != null) {
		// Create Folder Structure
		if (createFolder(folderPath, year) != null) {
			if (createFolder(folderPath+"/"+year, month) != null) {
				finalFolder =createFolder(folderPath+"/"+year+"/"+month, invoice);
			}
		}
		// Move File to Folder
		if (finalFolder != null) {
			document.move(finalFolder);
			document.save();
		}
	}
}