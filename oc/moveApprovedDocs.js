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
			folderObj = folderPathObj.createNode(folderName, "cm:folder", props);
		}
	}
	return(folderObj);
}


function main()
{
	var folderPath = "/Sites/occ/documentLibrary/Published/";
	var year = '';
	var caseNbr = '';
	var finalFolder = null;
	var docType = '';
	
	docType = document.properties['occ:document_type'];
	
	if (document.name.startsWith("ea20") || docType === 'Enforcement Action') {
		docType = 'Enforcement Action';
		folderPath += docType;
		document.properties['occ:document_type'] = docType;
		year = document.name.substr(2, 4);
		caseNbr = document.name.substr(7, 3);
		caseNbr = caseNbr.replace('.','');
		if (year != null) {
			finalFolder =createFolder(folderPath, year);
		}
		folderPath += "/" + year;
		if (caseNbr != null) {
			finalFolder =createFolder(folderPath, caseNbr);
		}
		// Move File to Folder
		if (finalFolder != null) {
			document.move(finalFolder);
		}
		document.properties['occ:status'] = 'Final-Unpublished';
		document.save();
	}
	if (docType === 'Letter') {
		folderPath += docType;
		document.move(companyhome.childByNamePath(folderPath));
		document.properties['occ:status'] = 'Final-Unpublished';
		document.save();
	}
	if (docType === 'Other') {
		folderPath += docType;
		document.move(companyhome.childByNamePath(folderPath));
		document.properties['occ:status'] = 'Final-Unpublished';
		document.save();
	}
	if (docType === 'Memorandum') {
		folderPath += docType;
		document.move(companyhome.childByNamePath(folderPath));
		document.properties['occ:status'] = 'Final-Unpublished';
		document.save();
	}
	if (docType === 'Training') {
		folderPath += docType;
		document.move(companyhome.childByNamePath(folderPath));
		document.properties['occ:status'] = 'Final-Unpublished';
		document.save();
	}
}

main();

