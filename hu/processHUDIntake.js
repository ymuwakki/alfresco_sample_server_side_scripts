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


function main()
{
	// If property values exist move file to dynamic location
	// For Birth Certificate Requests (type cbgecms:birth_certificate_request)
	// Get creation date, birth name.
	// /Sites/city-of-cambridge/documentLibrary/City Clerk's Office/Birth Certificate Orders/2017/10/<birthname>/
	
	// For Electric Permits (aspect cbgecms:electrical_permit)
	// 	Get creation date, birth name.
	// /Sites/city-of-cambridge/documentLibrary/Electrical/Electrical Permits/2017/10/<permitno>/

	
	var typeName = document.getTypeShort();
	
	if (typeName == "cbgecms:birth_certificate_request") {
		// Get Creation Date
		// Get Year
		// Get Month
		// Get Birth Name
		// Create Folder if does not exist
		//
		var folderPath = "/Sites/city-of-cambridge/documentLibrary/City Clerk's Office/Birth Certificate Requests";
		var creationDate = document.properties["cm:created"];
		var birthName = document.properties["cbgecms:birth_name"];
		var month = creationDate.getUTCMonth() + 1; //months from 1-12
		var day = creationDate.getUTCDate();
		var year = creationDate.getUTCFullYear();
		var finalFolder = null;
		// print ("Year: " + year + " Month: " + month + " Day: " + day);
		// print ("Birth Name: " + birthName);
		if (birthName != null) {
			// Create Folder Structure
			if (createFolder(folderPath, year) != null) {
				if (createFolder(folderPath+"/"+year, month) != null) {
					finalFolder =createFolder(folderPath+"/"+year+"/"+month, birthName);
				}
			}
			// Move File to Folder
			if (finalFolder != null) {
				document.move(finalFolder);
				var secs = creationDate.getTime();
				document.setName("Birth Certificate Request-" + birthName + "-" + secs);
				document.save();
				var props = new Array();
				props['cbgecms:document_type'] = 'Birth Record';
				document.addAspect("cbgecms:document_type", props);
			}
		}
	}
	
	if (typeName == "cbgecms:electrical_permit_request") {
		// Get Creation Date
		// Get Year
		// Get Month
		// Get Permit No
		// Create Folder if does not exist
		//
		var folderPath = "/Sites/city-of-cambridge/documentLibrary/Electrical/Electrical Permits";
		var creationDate = document.properties["cm:created"];
		var permitNo = document.properties["cbgecms:permit_no"];
		var month = creationDate.getUTCMonth() + 1; //months from 1-12
		var day = creationDate.getUTCDate();
		var year = creationDate.getUTCFullYear();
		var finalFolder = null;
		// print ("Year: " + year + " Month: " + month + " Day: " + day);
		// print ("Permit No: " + permitNo);
		if (permitNo != null) {
			// Create Folder Structure
			if (createFolder(folderPath, year) != null) {
				if (createFolder(folderPath+"/"+year, month) != null) {
					finalFolder =createFolder(folderPath+"/"+year+"/"+month, permitNo);
				}
			}
			// Move File to Folder
			if (finalFolder != null) {
				document.move(finalFolder);
				var secs = creationDate.getTime();
				document.setName("Electrical Permit Request-" + permitNo + "-" + secs);
				document.save();
				var props = new Array();
				props['cbgecms:document_type'] = 'Electrical Permit';
				document.addAspect("cbgecms:document_type", props);
				var propsgeo = new Array();
				// cm:latitude, cm:longitude
				propsgeo['cm:latitude'] = 42.3696237;
				propsgeo['cm:longitude'] = -71.10346219999997;
				document.addAspect("cm:geographic", propsgeo);
			}
		}
	}

}

main();