// Class signupMobile
//
require(
		[ "dojox/mobile/parser", 
		  "dijit/registry",
		  "dojox/mobile/View",
				"dojo/dom",
				"dojo/dom-construct",
				"dojo/dom-class",
				"dojo/on",
				"dojox/mobile/Button", 
				"dojox/mobile/CheckBox",
				"dojox/mobile/TextBox",
				"dojox/mobile/TextArea",
				"dojox/mobile/ListItem",
				"dojox/mobile/RoundRectList",
				"dojox/mobile/GridLayout",
				"dojox/mobile/Pane",
				"dojo/i18n!./js/klink/login/nls/loginCommon", 
				"dojox/mobile",
				"dojo/domReady!" ],
function(parser, registry, View, dom, domConstruct, domClass, on,
		Button, CheckBox, TextBox, TextArea, ListItem, RoundRectList, GridLayout,
		Pane, nls) {
	parser.parse();

	var msg = nls.welcomemsg;
	msg += " from one place. Download the app for your device for free or sign";
	msg += " or sign up below. <br> Connect with";

	var v1 = new View({
		id : 'snblock',
		selected : true,
		style:'padding:10px'
	});

	dom.byId('loginblock').appendChild(v1.domNode);

	
	
	var snComp = function(name)
	{
		return new Button(
				{
					id : name,
					label : "<img align='middle' src='https://files.klink.com/account/static/images/"+name+"-icon.png'>"+name,
					style : "width:90%; height:35px;",
					class : 'social-button embossed klinkaligncenter'
				});	
		
	};
	
	var gr = new GridLayout({
		cols : 1,
		innerHTML : msg
	});

	v1.addChild(gr);

	var pane1 = new Pane({
		style : 'padding:5px'
	});
	gr.addChild(pane1);
	var button1 = snComp('facebook');
	
	// button1.placeAt(pane1.containerNode);
	pane1.containerNode.appendChild(button1.domNode);
	button1.startup();

	//		 on(button1,'click', function()
	//			 {
	//		 window.location="https://files.klink.com/account/sn/facebook/login";

	//			 })

	button1 = snComp('google');
	// button1.placeAt(pane1.containerNode);
	pane1 = new Pane({
		style : 'padding:5px'
	});
	gr.addChild(pane1);
	pane1.containerNode.appendChild(button1.domNode);
	button1.startup();

	button1 = snComp('twitter');
			
	// button1.placeAt(pane1.containerNode);
	pane1 = new Pane({
		style : 'padding:5px'
	});
	gr.addChild(pane1);
	pane1.containerNode.appendChild(button1.domNode);
	button1.startup();
	//	href : "https://files.klink.com/account/sn/twitter/login",

	button1 = snComp('linkedin');

	// button1.placeAt(pane1.containerNode);
	pane1 = new Pane({
		style : 'padding:5px'
	});
	gr.addChild(pane1);
	pane1.containerNode.appendChild(button1.domNode);
	button1.startup();
	//	href : "https://files.klink.com/account/sn/twitter/login",

	var ul = new RoundRectList({style:'width:90%'});
	ul.startup();

	gr.addChild(ul);

	var childWidget = new ListItem({
		id : "item1",
	//	moveTo : "fieldsToCreate",
		moveTo:"#",
		//			transition : "slide",
		label : "Or, sign Up with email address"
	});

	var v2 = new View({
		id : 'fieldsToCreate',
		innerHTML : 'CREATE ACCOUNT',
		style : 'padding:5px; display:none',
		selected: true
	});

	ul.addChild(childWidget);

	v1.startup();

	dom.byId('loginblock').appendChild(v2.domNode);

	var f1 = domConstruct.create('div', {
		'class' : 'fieldset',
		style : 'padding:6px;'
	});

	v2.domNode.appendChild(f1);
	var f2 = domConstruct.create('div', {
		'class' : 'field-row'
	});

	f1.appendChild(f2);

	var tb = new TextBox({
		placeHolder : 'First Name',
		style : 'width:90%;margin:3px;'
	});

	f2.appendChild(tb.domNode);

	tb = new TextBox({
		placeHolder : 'Last Name',
		style : 'width:90%; margin:3px;'
	});

	f2.appendChild(tb.domNode);

	f1 = domConstruct.create('div', {
		'class' : 'fieldset'
	});

	v2.domNode.appendChild(f1);

	f2 = domConstruct.create('div', {
		'class' : 'field-row',
		style : 'padding:6px;'
	});

	f1.appendChild(f2);

	tb = new TextBox({
		placeHolder : 'Email',
		style : 'width:90%; margin:3px;'
	});

	f2.appendChild(tb.domNode);

	tb = new TextBox({
		placeHolder : 'Password',
		style : 'width:90%; margin:3px;'
	});

	f2.appendChild(tb.domNode);
	tb = new TextBox({
		placeHolder : 'Re-entry Password',
		style : 'width:90%; margin:3px;'
	});

	f2.appendChild(tb.domNode);

	f1 = domConstruct.create('span', {
		innerHTML : 'Password must be atleast 6 characters'
	});

	v2.domNode.appendChild(f1);

	v2.domNode.appendChild(domConstruct.create('br'));

	f1 = new CheckBox({
		name : 'reg'
	});
	v2.addChild(f1);
	
	f1 = domConstruct.create('span', {
		innerHTML : ' I agree to the Terms and Conditions <br>'
	});

	v2.domNode.appendChild(f1);
	
	v2.domNode.appendChild(domConstruct.create('br'));

	f1 = new CheckBox({
		name : 'reg'
	});
	v2.addChild(f1);

	 
	f1 = domConstruct.create('span', {
		innerHTML : 'Keep me updated on the latest offers. <br>'
	});

	v2.domNode.appendChild(f1);

	v2.domNode.appendChild(domConstruct.create('br'));

	button1 = new Button({
		label : "Sign Up Now",
		style : "width:95%; height:35px;",
		class : 'social-button embossed klinkaligncenter'
	});

	v2.addChild(button1);
	button1.startup();

	//		v2.set('selected', false);
	v2.startup();

	var self= this;
	
	on(registry.byId('item1'), 'click', function() {

		domClass.toggle(registry.byId('snblock').domNode, 'hidden', true);
		 domClass.toggle(registry.byId('fieldsToCreate').domNode, 'hidden', false);

		var ctr = new Button(
				{
					id : 'signupmainbot',
					label : 'Back',
					style : "float:right;width:45px; height:25px;",
					'class' : ' embossed',
					onClick: function()
					{
					 domClass.toggle(registry.byId('snblock').domNode, 'hidden', false);
					 domClass.toggle(registry.byId('fieldsToCreate').domNode, 'hidden', true);
					}
					
				});	
		
		var ct = new View({
			selected : true,
			style: "width: 30%;padding-top:15px;"
		});
		
		dom.byId('pagectr').appendChild(ct.domNode);
		ct.addChild(ctr);
		ctr.startup();
		
		
	});

	//  var w = dijit.byId('currentView');
	//    v1.performTransition('fieldsToCreate',1,"fade",null);
});
