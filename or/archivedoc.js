var archived = document.properties["ornl:status"];
//print (archived);
//archived = 'Archived';

if (document.hasAspect("ornl:ornl_doc") && archived.indexOf("Archived") !== -1) {
	
	//Search for target Org folder
	var org = document.properties["ornl:organization"];
	//print (org);
	var q = 'cm:name:"' + org + '" AND PATH:"/app:company_home/st:sites/cm:rm//*" AND TYPE:"cm:folder"';
	//print (q);

	var def = 
	{ 
	  query: q, 
	  store: "workspace://SpacesStore", 
	  language: "fts-alfresco", 
	}; 

	//var results = search.query(def);

	//print (results[0].name);
	//print (results[0].nodeRef);
	//print (document.getName());

	//Move document to Published folder based on Org
	//var rmPath = results[0].getDisplayPath() + '/' + org + '/2020';
	//var folderPath = "/Sites/rm/documentLibrary/Electrical/Electrical Permits";
	var rmPath = "/Sites/rm/documentLibrary/ORNL/Science and Discovery" + '/' + org + '/2020';
	//print (rmPath);
	var folderPathObj = companyhome.childByNamePath(rmPath);
	//print (folderPathObj);
	//print (document.getDisplayPath());
	//print (folderPathObj.getDisplayPath());
	document.move(folderPathObj);
}


