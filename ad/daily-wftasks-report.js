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

var reportFolder = companyhome.childByNamePath("Reports");
if (reportFolder === null && companyhome.hasPermission("CreateChildren"))
{
   // create the folder for the first time
   reportFolder = companyhome.createFolder("Reports");
}
var DMRFolder = reportFolder.childByNamePath("Daily Tasks Reports");
if (DMRFolder === null && reportFolder.hasPermission("CreateChildren"))
{
   // create the folder for the first time
   DMRFolder = reportFolder.createFolder("Daily Tasks Reports");
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
	// List each task for all workflows
	// Task started and/or completed
	// Task started/completed times 
	// Task duration
	// Task assignee or owner

   // record the time of the backup to a log file
   var logFile = DMRFolder.childByNamePath("daily tasks report-" + filedate + ".csv");
   if (logFile === null)
   {
      logFile = DMRFolder.createFile("daily tasks report-" + filedate + ".csv");
   }
   if (logFile !== null)
   {
	  logger.log("From JS"); 
	  var tasks = workflowTasksWrapper.getWorkflowTasks();
	  
	  if (tasks === null) {
		  logFile.content += "NULL: 0 workflow tasks" +"\r\n";
	  } else {
		logFile.content += tasks;
	    logger.log(tasks);
	  }
   }
}
