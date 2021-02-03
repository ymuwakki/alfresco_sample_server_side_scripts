// If document mime type is docx then transform to PDF
// application/vnd.openxmlformats-officedocument.wordprocessingml.document
var mime = document.getMimetype();
if (mime.indexOf("pdf") == -1) {
	document.transformDocument('application/pdf');
}
