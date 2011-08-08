/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Aug 5 21:18
*/
KISSY.add("menubutton/menubutton",function(d,i,j,g,h,l,k){var c=j.all,f=i.create(g,[k.DecorateChild],{hideMenu:function(){this.get("menu")&&this.get("menu").hide()},showMenu:function(){var a=this.get("view"),b=a.get("el"),e=this.get("menu");if(!e.get("visible")){e.set("align",d.mix({node:b},this.get("menuAlign")));e.show();b.attr("aria-haspopup",e.get("el").attr("id"));a.set("collapsed",false)}},_reposition:function(){var a=this.get("menu"),b=this.get("el");a&&a.get("visible")&&a.set("align",d.mix({node:b},
this.get("menuAlign")))},bindUI:function(){var a=this,b=this.get("menu");b.on("afterActiveItemChange",function(e){a.set("activeItem",e.newVal)});b.on("click",function(e){a.fire("click",{target:e.target})});b.on("hide",function(){a.get("view").set("collapsed",true)});c(window).on("resize",a._reposition,a)},_handleKeyEventInternal:function(a){var b=this.get("menu");if(a.keyCode==32){a.preventDefault();if(a.type!="keyup")return}else if(a.type!="keydown")return;if(b&&b.get("visible")){b=b._handleKeydown(a);
if(a.keyCode==27){this.hideMenu();return true}return b}if(a.keyCode==38||a.keyCode==40||a.keyCode==32){this.showMenu();return true}},_performInternal:function(){this.get("menu").get("visible")?this.hideMenu():this.showMenu()},_handleBlur:function(a){f.superclass._handleBlur.call(this,a);this.hideMenu()},getMenu:function(){var a=this.get("menu");if(!a){a=new l.PopupMenu(d.mix({prefixCls:this.get("prefixCls")},this.get("menuCfg")));this.set("menu",a)}return a},addItem:function(a,b){this.getMenu().addChild(a,
b)},removeItem:function(a,b){this.get("menu")&&this.get("menu").removeChild(a,b)},removeItems:function(a){this.get("menu")&&this.get("menu").removeChildren(a)},getItemAt:function(a){return this.get("menu")&&this.get("menu").getChildAt(a)},_uiSetDisabled:function(a){var b=f.superclass._uiSetDisabled;b&&b.apply(this,d.makeArray(arguments));!a&&this.hideMenu()},decorateInternalX:function(a){var b=this.get("prefixCls");this.set("el",a);var e=a.one("."+this.getCls("popupmenu"));if(e){e.hide();d.one(a[0].ownerDocument.body).prepend(e);
this.set("menu",new (k.UIStore.getUIByClass("popupmenu"))({srcNode:e,prefixCls:b}))}},decorateChildrenInternal:function(a,b,e){b.hide();d.one(b[0].ownerDocument.body).prepend(b);this.set("menu",new a({srcNode:b,prefixCls:e}))},destructor:function(){var a=this.get("menu");c(window).detach("resize",this._reposition,this);a&&a.destroy()}},{ATTRS:{activeItem:{view:true},menuAlign:{value:{points:["bl","tl"],overflow:{failX:1,failY:1,adjustX:1,adjustY:1}}},decorateChildCls:{value:"popupmenu"},menu:{setter:function(a){a.set("parent",
this)}}},DefaultRender:h});return f},{requires:["uibase","node","button","./menubuttonrender","menu","component"]});
KISSY.add("menubutton/menubuttonrender",function(d,i,j){return i.create(j.Render,{createDom:function(){var g=this.get("innerEl"),h=d.substitute('<div class="{prefixCls}inline-block {prefixCls}menu-button-caption">{content}</div><div class="{prefixCls}inline-block {prefixCls}menu-button-dropdown">&nbsp;</div>',{content:this.get("content")||"",prefixCls:this.get("prefixCls")});g.html(h).attr("aria-haspopup",true)},_uiSetContent:function(g){var h=this.get("el").one("."+this.getCls("menu-button-caption"));
h.html("");h.append(g)},_uiSetCollapsed:function(g){var h=this.get("el"),l=this.getCls("menu-button-open");if(g){h.removeClass(l);h.attr("aria-expanded",false)}else{h.addClass(l);h.attr("aria-expanded",true)}},_uiSetActiveItem:function(g){this.get("el").attr("aria-activedescendant",g&&g.get("el").attr("id")||"")}},{ATTRS:{activeItem:{},collapsed:{value:true}}})},{requires:["uibase","button"]});
KISSY.add("menubutton/option",function(d,i,j,g){d=i.create(g.Item,{renderUI:function(){this.get("el").addClass(this.getCls("option"))}},{ATTRS:{selectable:{value:true}}});j.UIStore.setUIByClass("option",{priority:10,ui:d});return d},{requires:["uibase","component","menu"]});
KISSY.add("menubutton/select",function(d,i,j,g,h,l){var k=j.create(g,{bindUI:function(){this.on("click",this.handleMenuClick,this);this.get("menu").on("show",this._handleMenuShow,this)},_handleMenuShow:function(){this.get("menu").set("highlightedItem",this.get("selectedItem")||this.get("menu").getChildAt(0))},updateCaption_:function(){var c=this.get("selectedItem");this.set("content",c?c.get("content"):this.get("defaultCaption"))},handleMenuClick:function(c){this.set("selectedItem",c.target);this.hideMenu()},
removeItems:function(){k.superclass.removeItems.apply(this,arguments);this.set("selectedItem",null)},removeItem:function(c){k.superclass.removeItem.apply(this,arguments);c==this.get("selectedItem")&&this.set("selectedItem",null)},_uiSetSelectedItem:function(c,f){f&&f.prevVal&&f.prevVal.set("selected",false);this.updateCaption_()},_uiSetDefaultCaption:function(){this.updateCaption_()}},{ATTRS:{value:{getter:function(){var c=this.get("selectedItem");return c&&c.get("value")},setter:function(c){for(var f=
this.get("menu").get("children"),a=0;a<f.length;a++){var b=f[a];if(b.get("value")==c){this.set("selectedItem",b);return}}this.set("selectedItem",null);return null}},selectedItem:{},selectedIndex:{setter:function(c){var f=this.get("menu").get("children");if(c<0||c>=f.length)return-1;this.set("selectedItem",f[c])},getter:function(){return d.indexOf(this.get("selectedItem"),this.get("menu").get("children"))}},defaultCaption:{value:""}}});k.decorate=function(c,f){c=d.one(c);var a=new h.PopupMenu(d.mix({prefixCls:f.prefixCls},
f.menuCfg)),b,e=c.val();c.all("option").each(function(m){var o=new l({content:m.text(),prefixCls:f.prefixCls,value:m.val()});if(e==m.val())b=o;a.addChild(o)});var n=new k(d.mix({selectedItem:b,menu:a},f));n.render();n.get("el").insertBefore(c);var p;if(p=c.attr("name")){var q=(new i("<input type='hidden' name='"+p+"' value='"+e+"'>")).insertBefore(c);n.on("afterSelectedItemChange",function(m){m.newVal?q.val(m.newVal.get("value")):q.val("")})}c.remove();return n};return k},{requires:["node","uibase",
"./menubutton","menu","./option"]});KISSY.add("menubutton",function(d,i,j,g,h){i.Render=j;i.Select=g;i.Option=h;return i},{requires:["menubutton/menubutton","menubutton/menubuttonrender","menubutton/select","menubutton/option"]});
