function renderFormat(format, ext, path){  
var renditionDef = renditionService.createRenditionDefinition( 'cm:' + ext + 'Export', 'reformat');
renditionDef.parameters['mime-type'] = format;
if (path != null) {
	renditionDef.parameters['destination-path-template'] = path;
}
var pdfnode = renditionService.render(document, renditionDef);
}
renderFormat('application/pdf', 'pdf', "Company Home/Test/" + document.name + 'yaz.pdf');



