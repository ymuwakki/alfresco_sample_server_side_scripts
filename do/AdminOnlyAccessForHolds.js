if (document.hasAspect("rma:frozen")) {
	document.setInheritsPermissions(false);
	document.setPermission("SiteManager", "GROUP_ALFRESCO_ADMINISTRATORS");
	document.setOwner("admin");
	document.save();
}