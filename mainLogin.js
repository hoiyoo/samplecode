//     Class mainLogin 
//    SupClass: _baseClass, _TemplatedMixin
//
define([
"dojo/_base/array",
"dojo/_base/declare",
"dojo/_base/lang",
"dojo/aspect",
"dojo/dom-class",
"dojo/dom-style",
"dojo/on",
"dojo/topic",
"dojo/when",
"dijit/layout/_LayoutWidget",
"dijit/registry",
"dijit/_TemplatedMixin",
"dijit/_WidgetBase",
"dojo/text!./templates/loginTempl.html",
"dojo/i18n!../nls/common"
],function(array, declare, lang, aspect, domClass, style, on, topic,
when, _LayoutWidget, registry, _TemplatedMixin,
_WidgetBase, template, NLS){


return declare(
"klink.login.mainLogin",
[_WidgetBase, _TemplatedMixin],{

// baseClass: "klinkFileView",

title: "Search results", // TODO: i18n
status: "0 results", // TODO: i18n
fileCount: 0,
selectedItems: [],
selectedItemsMap: {},

view: "search",
query: "",

count: 0,

constructor: function() {
this.selected = [];
this.selectedMap = {};
this.vpArgs = {};
},

master: null,
grid: null,
vpArgs: [],

templateString: template,

// _setTitleAttr: { node: "titleNode", type: "innerHTML" },

//_setNameAttr: function(text) {

// },

postCreate: function() {

this.inherited(arguments);
},

startup: function() {

this.inherited(arguments);
},

layout: function() {
// style.set(this.containerNode, "height", (this._contentBox.h - style.get(this.headerNode, "height") - 15) + "px");
},


_updateSelection: function() {
/*
this.selectedItems = this.getSelectedItems();
this.master.currentSelectedFiles.set("count", this.selectedItems.length);
*/
},

_onChangeSortOptions: function(value) {
console.log("_onChangeSortOptions:", value);
// this.set("groupType", value);
},

clearSelection: function() {
// this.grid && this.grid.clearSelection();
},

selectAll: function() {
// this.grid && this.grid.selectAll();
}
});

});
