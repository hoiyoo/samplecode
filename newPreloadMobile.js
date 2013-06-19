// Class : PreloadMobile
// Tested: Android and IOS devices
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
				"dojox/mobile/sniff",
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
		Button, CheckBox, has,TextBox, TextArea, ListItem, RoundRectList, GridLayout,
		Pane, nls) {
	parser.parse();

	if (!has('ios') && !has('android'))
	{
	dom.byId('loginblock').appendChild(domConstruct.create('br'));
	dom.byId('loginblock').appendChild(domConstruct.create('br'));
	}
	
	var v2 = new View({
		selected: true,
		id : 'login',
		style : 'padding:5px'
	});	
	dom.byId('loginblock').appendChild(v2.domNode);

	var h1= domConstruct.create('h1', {innerHTML:"Login to Klink"});
	v2.domNode.appendChild(h1);

	 var loginform = domConstruct.create('form', {
		 action:"https://files.klink.com/account/login",
		 method:"post" 
	 });
	 
	 v2.domNode.appendChild(loginform);
	 
	f1 = domConstruct.create('div', {
		'class' : 'fieldset'
	}, loginform);

	// v2.domNode.appendChild(f1);

	f2 = domConstruct.create('div', {
		'class' : 'field-row',
		style : 'padding:6px;'
	});

	f1.appendChild(f2);

	tb = new TextBox({
		name:"username",
		placeHolder : 'Email',
		'class':"required",
		style : 'width:90%; margin:3px;'
	});

	f2.appendChild(tb.domNode);

	tb = new TextBox({
		name:'password',
		type:'password',
		'class':"required",
		placeHolder : 'Password',
		style : 'width:90%; margin:3px;'
	});

	f2.appendChild(tb.domNode);

	var gr = new Pane({
	});
	
	var table = domConstruct.create('table', {}, loginform);
	var tbody = domConstruct.create('tbody', {}, table);
	
    var tr = domConstruct.create('tr', {}, tbody);
    var td = domConstruct.create('td', {}, tr);
//	v2.addChild(gr);

	f1 = new CheckBox({
		name : 'reg'
	});

	td.appendChild(f1.domNode);
	
	f1.startup();
	
	var td = domConstruct.create('td', {}, tr);
	
	f1 = domConstruct.create('span', {
		innerHTML : 'Renember me'
	});
	
	td.appendChild(f1);

	var td = domConstruct.create('td', {}, tr);
	
	var pan = new Pane({class:'actions submit'});
	td.appendChild(pan.domNode);
	
	var b = new Button(
			{
				id : "submit",
				label : "Login",
				type:'submit',
				name:'submit',
				disabled:'disabled',
				class:'loginbtn inactive'
			});	

	b.startup();
	
	pan.domNode.appendChild(b.domNode);	
	
	//		v2.set('selected', false);
	v2.startup();

	var v1= v2;
	
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

	var h2= domConstruct.create('h1', {innerHTML:"OR LOGIN USING:",
			id:'social-desktop-title'});
	v2.domNode.appendChild(h2);

	var table = domConstruct.create('table', {}, v1.domNode);
	var tbody = domConstruct.create('tbody', {}, table);
	
	var tr = domConstruct.create('tr', {}, tbody);
	var td = domConstruct.create('td', {}, tr);
	
	var pane1 = new Pane({
		style : 'padding:5px'
	});
	td.appendChild(pane1.domNode);
	var button1 = snComp('facebook');
	
	// button1.placeAt(pane1.containerNode);
	pane1.containerNode.appendChild(button1.domNode);
	button1.startup();

	//		 on(button1,'click', function()
	//			 {
	//		 window.location="https://files.klink.com/account/sn/facebook/login";

	//			 })

	var td = domConstruct.create('td', {}, tr);
	
	button1 = snComp('google');
	// button1.placeAt(pane1.containerNode);
	pane1 = new Pane({
		style : 'padding:5px'
	});
	td.appendChild(pane1.domNode);
	
	tr = domConstruct.create('tr', {}, tbody);
	
	td = domConstruct.create('td', {}, tr);
	
	pane1.containerNode.appendChild(button1.domNode);
	button1.startup();

	button1 = snComp('twitter');
			
	// button1.placeAt(pane1.containerNode);
	pane1 = new Pane({
		style : 'padding:5px'
	});
	
	td.appendChild(pane1.domNode);
	
	td = domConstruct.create('td', {}, tr);
	
	pane1.containerNode.appendChild(button1.domNode);
	button1.startup();
	//	href : "https://files.klink.com/account/sn/twitter/login",

	button1 = snComp('linkedin');

	// button1.placeAt(pane1.containerNode);
	pane1 = new Pane({
		style : 'padding:5px'
	});
	td.appendChild(pane1.domNode);
	pane1.containerNode.appendChild(button1.domNode);
	button1.startup();
	//	href : "https://files.klink.com/account/sn/twitter/login",

	var panel = new Pane({id:'login-footer'});
	v1.addChild(panel);
	
	table = domConstruct.create('table', {}, v1.domNode);
	
	v1.domNode.appendChild(table);
	
	tbody = domConstruct.create('tbody', {}, table);
	
	tr = domConstruct.create('tr', {}, tbody);
	td = domConstruct.create('td', {}, tr);
	
	forgot = domConstruct.create('a', {
		id:'forgot',
		'class':'fn-loadWidgetsLink',
		href: 'https://files.klink.com/account/passwordreset',
		'data-target-url':'https://files.klink.com/account/passwordreset',
		'data-target': '#login',
		innerHTML:'Forgot your password?',
		style:'width:50%'
	}, td);
	
	td = domConstruct.create('td', {style:'width:10%'}, tr);
	td = domConstruct.create('td', {}, tr);
	domConstruct.create('a', {
		'class':'fn-loadWidgetsLink',
		id:'register',
		href:'signup.html',
		innerHTML:'Register'
	}, td);
	

	//  var w = dijit.byId('currentView');
	//    v1.performTransition('fieldsToCreate',1,"fade",null);
});
