function main()
{
	var trans1 = document.transformDocument('application/pdf');
	var business = document.properties["doa:businessunit"];
	//trans1.properties["doa:businessunit"] = business;
	//trans1.save();
}

main();