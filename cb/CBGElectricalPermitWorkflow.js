function main()
{

	var permitstatus = document.properties["cbgecms:permit_status"];
	if (permitstatus.indexOf("Approved") < 0) {
		if (document.activeWorkflows.length == 0) {
			var reviewGroup = "GROUP_CBG_ELECTRICAL_PERMIT";
			var workflow = actions.create("start-workflow");
			workflow.parameters.workflowName = "activiti$Process_prc";
			workflow.parameters["bpm:workflowDescription"] = "Please review the electrical permit application " + document.name;
			//workflow.parameters["bpm:groupAssignee"] = reviewGroup;
			var futureDate = new Date();
			futureDate.setDate(futureDate.getDate() + 7);
			workflow.parameters["bpm:workflowDueDate"] = futureDate; 
			workflow.parameters["bpm:sendEMailNotifications"] = true;
			return workflow.execute(document);
		}
	}
}

main();
