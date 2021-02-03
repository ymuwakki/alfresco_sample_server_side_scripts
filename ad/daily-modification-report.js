function sepackage_queue(startDate, endDate) {
	var sort1 = 
	{ 
	  column: "@{http://www.alfresco.org/model/content/1.0}created", 
	  ascending: false 
	}; 
	
	var paging = 
	{ 
	  maxItems: 2000, 
	  skipCount: 0 
	}; 
	
        var query = "";
        
        var hasStart = false;
        var hasEnd = false;
        if (startDate !== null && startDate !== "") {
            hasStart = true;
        }
        if (endDate !== null && endDate !== "") {
            hasEnd = true;
        }
        
        query = "+PATH:'/app:company_home/st:sites/cm:controlled/cm:documentLibrary//*' AND +TYPE:'analog:controlled' AND cm:modified:[" + startDate + " TO " + endDate + "]";
	var def = 
	{
	  query: query, 
	  store: "workspace://SpacesStore", 
	  language: "fts-alfresco", 
	  sort: [sort1], 
	  page: paging 
	}; 
	
	var results = search.query(def);
	return results;
}

var searchDate = new Date();
var sy = searchDate.getFullYear();
var sm = searchDate.getMonth() + 1;
var sd = searchDate.getDate();
var sh = searchDate.getHours();
var smin = searchDate.getMinutes();
var ss = searchDate.getSeconds();
if(sm.toString().length==1) sm = "0"+sm;
if(sd.toString().length==1) sd = "0"+sd;
if(sh.toString().length==1) sh = "0"+sh;
if(smin.toString().length==1) smin = "0"+smin;
if(ss.toString().length==1) ss = "0"+ss;

var endDate = sy + "-" + sm + "-" + sd + "T" + sh +":" + smin + ":" + ss;

searchDate = new Date(searchDate.getTime() - (24 * 60 * 60 * 1000));
sy = searchDate.getFullYear();
sm = searchDate.getMonth() + 1;
sd = searchDate.getDate();
sh = searchDate.getHours();
smin = searchDate.getMinutes();
ss = searchDate.getSeconds();
if(sm.toString().length==1) sm = "0"+sm;
if(sd.toString().length==1) sd = "0"+sd;
if(sh.toString().length==1) sh = "0"+sh;
if(smin.toString().length==1) smin = "0"+smin;
if(ss.toString().length==1) ss = "0"+ss;

var startDate = sy + "-" + sm + "-" + sd + "T" + sh +":" + smin + ":" + ss;

var results = sepackage_queue(startDate, endDate);

var reportFolder = companyhome.childByNamePath("Reports");
if (reportFolder === null && companyhome.hasPermission("CreateChildren"))
{
   // create the folder for the first time
   reportFolder = companyhome.createFolder("Reports");
}
var DMRFolder = reportFolder.childByNamePath("Daily Modification Reports");
if (DMRFolder === null && reportFolder.hasPermission("CreateChildren"))
{
   // create the folder for the first time
   DMRFolder = reportFolder.createFolder("Daily Modification Reports");
}

if (DMRFolder !== null && DMRFolder.hasPermission("CreateChildren"))
{
   var d = new Date();
   var month = d.getMonth() + 1;
   var filedate = d.getFullYear() +"" + month + "" + d.getDate();
   
   // Results to only include documents that have been modified within the last 24 hours.
   // Documents that exist in the Controlled Documents Repository/site.
   // *.csv file to be named as <MMYYDDDD> daily modification report.csv  (note: where date = the date in which the report was generated.)
   // Columns included in the *.csv file:
   // Document Name
   // Full Path (URL)
   // Series
   // Document Number
   // Rev
   // Modified Date
   // Modified By
   
   // record the time of the backup to a log file
   var logFile = DMRFolder.childByNamePath("daily modification report-" + filedate + ".csv");
   if (logFile === null)
   {
      logFile = DMRFolder.createFile("daily modification report-" + filedate + ".csv");
	  logFile.content = "Name,Folder Path,Series,Document Number,Rev,Modified Date,Modified By\r\n";
   }
   if (logFile !== null)
   {
      for (var r = 0; r < results.length; r++) {
		 	  
		 logFile.content += results[r].name + "," + results[r].displayPath + "," + results[r].properties['analog:adi_series'] + "," + results[r].properties['analog:adi_document_number'] + "," + results[r].properties['analog:adi_revision'] + "," + results[r].properties['cm:modified'] + "," + results[r].properties['cm:modifier'] +"\r\n";
      }
	  if (results.length === 0) {
		  logFile.content += "0 documents modified" +"\r\n";
	  }
   }
}