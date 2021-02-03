if (document.name.startsWith("ea20")) {
	document.properties['occ:document_type'] = "Enforcement Action";
	document.properties['occ:ccore_submission_date'] = document.name.substr(2, 4);
}
document.save();

var duplicates = duplicateDetectionService.findDuplicatesOf(document.nodeRef, true);
//var y = duplicates.size();
//var z = duplicates.isEmpty();
//loggerJSON.parse(duplicates[0]);
// Make sure there is at least 1 document (the original) that is not tagged as duplicate
var count = duplicates.size();
var original = false;
var duplicateOf = '';
if (count > 0) {
  for (i = 0; i < count; i++) {
    var x = duplicates.get(i).nodeRef;
    var a = search.findNode(x);
    if (a.properties['occ:isduplicate']) {
		original = false;
	} else {
		original = true;
		duplicateOf = duplicates.get(i).containerRelativePath + '/' + duplicates.get(i).name;
		break;
	}
  }
}
var name = document.name;
var uniqueID = new Date().getTime();
// If original exists, then tag this one as a duplicate
if (original) {
  document.properties['occ:isduplicate'] = true;
  document.properties['occ:duplicate_of'] = duplicateOf;
  document.properties.name = name.replace(".","-dup-" + uniqueID + ".");
  document.save();
  var folderPath = "/Sites/occ/documentLibrary/Duplicates";
  document.move(companyhome.childByNamePath(folderPath));
  document.save();
}