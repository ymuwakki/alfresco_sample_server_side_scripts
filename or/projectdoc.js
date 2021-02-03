if (!document.hasAspect("ornl:ornl_doc")) {

	document.addAspect("ornl:ornl_doc");
	document.save();
	
	document.properties["ornl:status"] = "Active";
	document.properties["ornl:project"] = document.getParent().name;
	document.save();
}
