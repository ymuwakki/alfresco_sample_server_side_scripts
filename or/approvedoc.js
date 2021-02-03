if (!document.hasAspect("ornl:ornl_doc")) {

	document.addAspect("ornl:ornl_doc");
	document.save();
	
	document.properties["ornl:status"] = "Approved";
	document.properties["ornl:organization"] = document.getParent().name;
	var date = new Date();
    //var ISODate = utils.toISO8601(date);
	document.properties['cm:owner'] = "admin"; 
	document.properties['cm:creator'] = "admin"; 
	document.properties['ornl:approval_date'] = date;
	document.properties['ornl:approver_name'] = "deja";
	document.save();
}
