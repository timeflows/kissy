/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Aug 5 21:18
*/
KISSY.add("button/base",function(d,c,e,b){d=c.create(e.ModelControl,[c.Contentbox],{bindUI:function(){this.get("el").on("keyup",this._handleKeyEventInternal,this)},_handleKeyEventInternal:function(a){if(a.keyCode==13&&a.type=="keydown"||a.keyCode==32&&a.type=="keyup")return this._performInternal(a);return a.keyCode==32},_performInternal:function(){this.fire("click")}},{ATTRS:{value:{},describedby:{view:true},tooltip:{view:true}}});d.DefaultRender=b;return d},{requires:["uibase","component","./customrender"]});
KISSY.add("button/buttonrender",function(d,c,e){return c.create(e.Render,[c.Contentbox.Render],{renderUI:function(){this.get("el").attr("role","button")},_uiSetTooltip:function(b){this.get("el").attr("title",b)},_uiSetDescribedby:function(b){this.get("el").attr("aria-describedby",b)}},{ATTRS:{describedby:{},tooltip:{}}})},{requires:["uibase","component"]});
KISSY.add("button/css3render",function(d,c,e){function b(a,f){return d.substitute(f,{tag:a.__css_tag})}return c.create(e,{__css_tag:"css3",renderUI:function(){this.get("el").addClass(b(this,this.getCls("inline-block  {tag}-button")))},_uiSetFocused:function(a){this.get("el")[a?"addClass":"removeClass"](b(this,this.getCls("{tag}-button-focused")))},_uiSetHighlighted:function(a){this.get("el")[a?"addClass":"removeClass"](b(this,this.getCls("{tag}-button-hover")))},_uiSetDisabled:function(a){this.get("el")[a?
"addClass":"removeClass"](b(this,this.getCls("{tag}-button-disabled"))).attr({tabindex:a?-1:0,"aria-disabled":a})},_uiSetActive:function(a){this.get("el")[a?"addClass":"removeClass"](b(this,this.getCls("{tag}-button-active"))).attr("aria-pressed",!!a)}})},{requires:["uibase","./buttonrender"]});
KISSY.add("button/customrender",function(d,c,e,b){return e.create(b,{__css_tag:"custom",createDom:function(){var a=this.get("el"),f=this.get("contentEl"),h=d.guid("ks-button-labelby");f.addClass(this.getCls("inline-block custom-button-outer-box"));var i=d.makeArray(f[0].childNodes);f=(new c("<div id='"+h+"' class='"+this.getCls("inline-block custom-button-inner-box")+"'/>")).appendTo(f);for(var g=0;g<i.length;g++)f.append(i[g]);a.attr("aria-labelledby",h);this.set("innerEl",f)},_uiSetContent:function(a){var f=
this.get("innerEl");f.html("");a&&f.append(a)}},{innerEL:{}})},{requires:["node","uibase","./css3render"]});KISSY.add("button/nativerender",function(d,c,e){return c.create(e,{_uiSetDisabled:function(b){this.get("el")[0].disabled=b}},{ATTRS:{elTagName:{value:"button"}}})},{requires:["uibase","./buttonrender"]});KISSY.add("button",function(d,c,e){c.Render=e;return c},{requires:["button/base","button/customrender"]});
