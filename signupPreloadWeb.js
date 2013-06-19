define([
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/cookie",
	"dojo/Deferred",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/query",
	"dojo/request/xhr",
	"dojox/mobile/sniff",
	"klink/login/signupMain",
	// below are required, but never directly referenced
	"dojo/domReady!"
],function(array, lang, cookie, Deferred, dom, construct, query, xhr, has,
		main) {
	// use existing global... or create a new one if needed -- previously this was overwriting other properties
	var klink = lang.getObject("klink", true);
	
	lang.mixin(klink, {
		isPublicShare: false,
		isShare: false,
		isShuttingDown: false,
		GDL: null,
		dfdLoginComplete: new Deferred()
	});


	var lg = new main();
	dom.byId('loginblock').appendChild(lg.domNode);
	
	return klink;
});