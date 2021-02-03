var approved = document.properties["ornl:status"];
//print (approved);

if (document.hasAspect("ornl:ornl_doc") && approved.indexOf("Approved") !== -1) {

	//Search for target Org folder
	var org = document.properties["ornl:organization"];
	//print (org);
	var q = 'cm:name:"' + org + '" AND PATH:"/app:company_home/st:sites/cm:ornl//*" AND TYPE:"cm:folder"';
	//print (q);

	var def = 
	{ 
	  query: q, 
	  store: "workspace://SpacesStore", 
	  language: "fts-alfresco", 
	}; 

	var results = search.query(def);

	//print (results[0].name);
	//print (results[0].nodeRef);
	//print (document.getName());

	//Move document to Published folder based on Org
	document.move(results[0]);

	//print (document.getOwner());
	//print (document.properties['cm:owner']);
	//print (document.properties['cm:creator']);

	//Change owner to secure document from editing
	//Add approval date
	//Add approval user
	var date = new Date();
    //var ISODate = utils.toISO8601(date);
	document.properties['cm:owner'] = "admin"; 
	document.properties['cm:creator'] = "admin"; 
	document.properties['ornl:approval_date'] = date;
	document.properties['ornl:approver_name'] = person.properties.userName;
	document.save();
	
	//workspace://SpacesStore/e37229f8-77a7-480e-99fc-a0fea02bcd6a
	// /app:company_home/st:sites/cm:acm/cm:documentLibrary/Document_x0020_Repositories/cm:_x0032_020/cm:_x0030_5/cm:_x0032_9/cm:_x0031_0
	// /Company Home/Sites/acm/documentLibrary/Document Repositories/2020/05/29
	//var doc = search.findNode("workspace://SpacesStore/af65018d-dabb-4a83-ac22-007dd99ff361");
	var acmLocation = search.findNode("workspace://SpacesStore/e37229f8-77a7-480e-99fc-a0fea02bcd6a");
	//print (acmLocation.getDisplayPath);
	
	var transformedNode = document.transformDocument("application/pdf");
	//print ( transformedNode );
	transformedNode.move(acmLocation);

	//var name = document.getName() + ".url";
	//print (name);
	//var title = document.properties["cm:title"]; 
	//print (title);
	//var description = document.properties["cm:description"];
	//print (description);

	//var pr = [];
	//pr["cm:name"] = "test1.txt.url";
	//pr["cm:name"] = name;
	//pr["cm:destination"] = document.nodeRef.toString();
	//pr["cm:title"] = title;
	//pr["cm:description"] = description;
	//linkNode = acmLocation.createNode(name, "{http://www.alfresco.org/model/application/1.0}filelink", pr);
	//linkNode.save();
	//document.addAspect("app:linked");

	// Create a PDF and copy to ACM Sites/acm/documentLibrary/Document
	

	//print (document.getOwner());
	//print (document.properties['cm:creator']);
	
}


