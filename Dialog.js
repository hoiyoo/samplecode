// Class App_Dialog
// Sub class: dojo Dialog
define([
	"dojo/_base/declare",
	"dojo/_base/event",
	"dojo/_base/lang",
	"dojo/Deferred",
	"dojo/dom",
	"dojo/dom-class",
	"dojo/keys",
	"dojo/on",
	"dijit/a11y",
	"dijit/Dialog",
	"dijit/focus",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/text!./templates/Dialog.html",
	"dojo/i18n!./nls/common",
	// the following are required, but not directly referenced
	"dojo/NodeList-dom",
	"dijit/form/Button"
],function(declare, event, lang, Deferred, dom, domClass, keys, on, a11y, Dialog, focus, _WidgetsInTemplateMixin, template, NLS){

var App_Dialog = declare(
"App.Dialog",
[Dialog, _WidgetsInTemplateMixin],{

	templateString: template,
	okButtonText: NLS.buttonOK,
	cancelButtonText: NLS.buttonCancel,
	draggable: false,
	buttonPressed: null,
	lastEvent: null,
	iconClass: "",
	cancelable: true,
	
	_klinkDialogStarted: false,

	_setTitleAttr: [
		{ node: "titleNode", type: "innerHTML" }  // affect only the titleNode, not the titleBar attr
		],

	_setIconClass: function (iconClass,force) {
		console.log("_setIconClass");
		if (force || iconClass != this.iconClass) {
			var classes = this.iconNode.className.split(" ").map(function(item) {return item.trim();});
			var iconClassNew = classes.shift();
			if (iconClass) {
				iconClassNew += " " + iconClass;
			}
			this.iconNode.className = iconClassNew;
			this.iconClass = iconClass;
		}
	},

	_getIconClass: function () {
		console.log("_getIconClass");
		var classes = this.iconNode.className.split(" ").map(function(item) {return item.trim();});
		classes.shift();
		return classes.join(" ");
	},
	
	_setCancelable: function (cancelable,force) {
		if (force || cancelable !== this.cancelable) {
			if (cancelable) {
				domClass.remove(this.domNode,"klinkDialogNotCancelable");
				this.closeButtonNode.setAttribute("tabIndex",99);
			}
			else {
				domClass.add(this.domNode,"klinkDialogNotCancelable");
				this.closeButtonNode.setAttribute("tabIndex",-1);
			}
			this._getFocusItems(this.domNode);
			this.cancelable = cancelable;
		}
	},

  _getFocusItems: function(){
    var elems = a11y._getTabNavigable(this.focusNode);
    this._firstFocusItem = elems.lowest || elems.first || this.closeButtonNode || this.domNode;
    this._lastFocusItem = elems.last || elems.highest || this._firstFocusItem;
  },

	_set: function(name, value) {
		if (name == "iconClass") {
			return this._setIconClass(value);
		}
		else if (name == "cancelable") {
			return this._setCancelable(value);
		}
		else {
			return this.inherited(arguments);
		}
	},
	
	_get: function(name) {
		if (name == "iconClass") {
			return this._getIconClass();
		}
		else {
			return this.inherited(arguments);
		}
	},
	
	postMixInProperties: function() {
		// suppress dijit NLS load
	},

	postCreate: function() {
		var _this = this;
		this.inherited(arguments);
		this.okButton.set("tabIndex",1);
		this._setIconClass(this.iconClass,true);
		this._setCancelable(this.cancelable,true);
		
		// steal ENTER / ESC key outside of our dialog if we're the top modal
		this._modalconnects.push(on(window, "keyup",
			function(evt) {
  			if ((evt.target !== _this.domNode) &&
  					(!dom.isDescendant(evt.target,_this.domNode)) &&
  					([keys.ESCAPE,keys.ENTER].indexOf(evt.keyCode) >= 0) &&
  					dom.byId(_this.id + "_underlay")
  					) {
					// steal focus
					console.log(_this.id + " stealing focus for key event",evt);
					event.stop(evt);
					_this._getFocusItems(_this.domNode);
					focus.focus(_this._firstFocusItem);
					// if ENTER, click the focused item, else give it to the dialog
					if (_this._firstFocusItem && evt.keyCode === keys.ENTER) {
						on.emit(_this._firstFocusItem,"click",evt);
					}
					else {
						on.emit(_this.domNode,"keypress",evt);
					}
  			}
			}));
	},
	
	startup: function () {
		this.inherited(arguments);
		this._klinkDialogStarted = true;
	},

	onClickOK: function(e) {
		console.log("klink.Dialog.onClickOK",e);
		this.lastEvent = e;
		this._onSubmit();
	},

	onClickCancel: function(e) {
		console.log("klink.Dialog.onClickCancel",e);
		this.lastEvent = e;
		this.onCancel(e);
	},
	
	onExecute: function() {
		console.log("klink.Dialog.onExecute",arguments);
		this.buttonPressed = this.okButtonText;
		this.hide();
	},
	
	onCancel: function() {
		console.log("klink.Dialog.onCancel",arguments);
		this.buttonPressed = this.cancelButtonText;
		if (!this.cancelable) {
			console.error("klink.Dialog.onCancel() called on non-cancelable");
		}
	},

	_onShow: function() {
		this.buttonPressed = null;
		this.inherited(arguments);
	},

	_onHide: function() {
		console.log("klink.Dialog: Hide",arguments);
		this.inherited(arguments);
	},
	
	_onKey: function (evt) {
		this.lastEvent = evt;
		if (this.cancelable || evt.charOrCode !== keys.ESCAPE) {
			this.inherited(arguments);
		} 
	}

});


});
