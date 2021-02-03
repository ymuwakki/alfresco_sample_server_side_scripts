var renderingEngineName = 'reformat';
var renditionDefinitionName = 'cm:pdfRenditionDef';
var renditionDef = renditionService.createRenditionDefinition(renditionDefinitionName, renderingEngineName);
renditionDef.parameters['mime-type'] = 'application/pdf';
var pdfRendition= renditionService.render(document, renditionDef);