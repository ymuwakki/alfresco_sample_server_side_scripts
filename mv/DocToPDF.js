function renderFormat(format, ext, path){  
	var renditionDef = renditionService.createRenditionDefinition( 'cm:' + ext + 'Export', 'reformat');
	renditionDef.parameters['mime-type'] = format;
	if (path != null) {
		renditionDef.parameters['destination-path-template'] = path;
	}
	renditionService.render(document, renditionDef);
}

function main() {
	var path = '/Company Home/Sites/us-senate/documentLibrary/senators/' + document.name + '.pdf';
	renderFormat('application/pdf', 'pdf',  null);
}

main();