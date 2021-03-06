/**
 * submenu model and control for kissy , transfer item's keycode to menu
 * @author yiminghe@gmail.com
 */
KISSY.add(
    /* or precisely submenuitem */
    "menu/submenu",
    function(S, Event, UIBase, Component, MenuItem, SubMenuRender) {

        var KeyCodes = Event.KeyCodes,
            MENU_DELAY = 300;
        /**
         * Class representing a submenu that can be added as an item to other menus.
         */
        var SubMenu = UIBase.create(MenuItem, [Component.DecorateChild], {

                _onParentHide:function() {
                    this.get("menu") && this.get("menu").hide();
                },

                bindUI:function() {
                    /**
                     * 自己不是 menu，自己只是 menuitem，其所属的 menu 为 get("parent")
                     */
                    var self = this,
                        parentMenu = self.get("parent"),
                        menu = this.get("menu");

                    //当改菜单项所属的菜单隐藏后，该菜单项关联的子菜单也要隐藏
                    if (parentMenu) {

                        parentMenu.on("hide", self._onParentHide, self);

                        // 子菜单选中后也要通知父级菜单
                        // 不能使用 afterSelectedItemChange ，多个 menu 嵌套，可能有缓存
                        // 单个 menu 来看可能 selectedItem没有变化
                        menu.on("click", function(ev) {
                            parentMenu.fire("click", {
                                target:ev.target
                            });
                        });

                        // 通知父级菜单
                        menu.on("afterActiveItemChange", function(ev) {
                            parentMenu.set("activeItem", ev.newVal);
                        });
                    }
                    // 访问子菜单，当前 submenu 不隐藏 menu
                    // leave submenuitem -> enter menuitem -> menu item highlight ->
                    // -> menu highlight -> onChildHighlight_ ->

                    // menu render 后才会注册 afterHighlightedItemChange 到 _uiSet
                    // 这里的 onChildHighlight_ 比 afterHighlightedItemChange 先执行
                    // 保险点用 beforeHighlightedItemChange
                    menu.on("beforeHighlightedItemChange", self.onChildHighlight_, self);
                },

                /**
                 * @inheritDoc
                 * Sets a timer to show the submenu
                 **/
                _handleMouseEnter:function(e) {
                    if (SubMenu.superclass._handleMouseEnter.call(this, e)) {
                        return true;
                    }
                    this.clearTimers();
                    this.showTimer_ = S.later(this.showMenu,
                        this.get("menuDelay"), false, this);
                },

                showMenu:function() {
                    var menu = this.get("menu");
                    menu.set("align", S.mix({
                        node:this.get("el"),
                        points:['tr','tl']
                    }, this.get("menuAlign")));
                    menu.render();
                    /**
                     * If activation of your menuitem produces a popup menu,
                     then the menuitem should have aria-haspopup set to the ID of the corresponding menu
                     to allow the assistive technology to follow the menu hierarchy
                     and assist the user in determining context during menu navigation.
                     */
                    this.get("el").attr("aria-haspopup",
                        menu.get("el").attr("id"));
                    menu.show();
                },


                /**
                 * Clears the show and hide timers for the sub menu.
                 */
                clearTimers : function() {
                    if (this.dismissTimer_) {
                        this.dismissTimer_.cancel();
                        this.dismissTimer_ = null;
                    }
                    if (this.showTimer_) {
                        this.showTimer_.cancel();
                        this.showTimer_ = null;
                    }
                },

                /**
                 * Listens to the sub menus items and ensures that this menu item is selected
                 * while dismissing the others.  This handles the case when the user mouses
                 * over other items on their way to the sub menu.
                 * @param  e Highlight event to handle.
                 * @private
                 */
                onChildHighlight_ :function(e) {
                    if (e.newVal) {
                        if (this.get("menu").get("parent") == this) {
                            this.clearTimers();
                            // superclass(menuitem)._handleMouseLeave 已经把自己 highlight 去掉了
                            // 导致本类 _uiSetHighlighted 调用，又把子菜单隐藏了
                            this.get("parent").set("highlightedItem", this);
                        }
                    }
                },

                hideMenu:function() {
                    var menu = this.get("menu");
                    menu && menu.hide();
                },

                // click ，立即显示
                _performInternal:function() {
                    this.clearTimers();
                    this.showMenu();
                },

                /**
                 * Handles a key event that is passed to the menu item from its parent because
                 * it is highlighted.  If the right key is pressed the sub menu takes control
                 * and delegates further key events to its menu until it is dismissed OR the
                 * left key is pressed.
                 * @param e A key event.
                 * @return {boolean} Whether the event was handled.
                 */
                _handleKeydown:function(e) {
                    var self = this;

                    var menu = self.get("menu");

                    var hasKeyboardControl_ = menu && menu.get("visible");

                    var keyCode = e.keyCode;

                    if (!hasKeyboardControl_) {
                        // right
                        if (keyCode == KeyCodes.RIGHT) {
                            self.showMenu();
                            var menuChildren = menu.get("children");
                            if (menuChildren[0]) {
                                menu.set("highlightedItem", menuChildren[0]);
                            }
                        } else {
                            return undefined;
                        }
                    } else if (menu._handleKeydown(e)) {
                    }
                    // The menu has control and the key hasn't yet been handled, on left arrow
                    // we turn off key control.
                    // left
                    else if (keyCode == KeyCodes.LEFT) {
                        self.hideMenu();
                        // 隐藏后，当前激活项重回
                        self.get("parent").set("activeItem", self);
                    } else {
                        return undefined;
                    }
                    return true;
                },

                /**
                 * @inheritDoc
                 * Dismisses the submenu on a delay, with the result that the user needs less
                 * accuracy when moving to submenus.
                 **/
                _uiSetHighlighted:function(highlight, ev) {
                    var self = this;
                    SubMenu.superclass._uiSetHighlighted.call(self, highlight, ev);
                    if (!highlight) {
                        if (self.dismissTimer_) {
                            self.dismissTimer_.cancel();
                        }
                        self.dismissTimer_ = S.later(self.hideMenu,
                            self.get("menuDelay"),
                            false, self);
                    }
                },

                containsElement:function(element) {
                    var menu = this.get("menu");
                    return menu && menu.containsElement(element);
                },

                // 默认 addChild，这里里面的元素需要放到 menu 属性中
                decorateChildrenInternal:function(ui, el, cls) {
                    // 不能用 diaplay:none
                    el.css("visibility", "hidden");
                    var docBody = S.one(el[0].ownerDocument.body);
                    docBody.prepend(el);
                    var menu = new ui({
                        srcNode:el,
                        prefixCls:cls
                    });
                    this.set("menu", menu);
                },

                destructor : function() {
                    var self = this,
                        parentMenu = self.get("parent"),
                        menu = this.get("menu");

                    self.clearTimers();

                    //当改菜单项所属的菜单隐藏后，该菜单项关联的子菜单也要隐藏
                    if (parentMenu) {
                        parentMenu.detach("hide", self._onParentHide, self);
                    }
                    if (!self.get("externalSubMenu") && menu) {
                        menu.destroy();
                    }
                }
            },
            {
                ATTRS:{
                    /**
                     * The delay before opening the sub menu in milliseconds.  (This number is
                     * arbitrary, it would be good to get some user studies or a designer to play
                     * with some numbers).
                     * @type {number}
                     */
                    menuDelay:{
                        value:MENU_DELAY
                    },
                    /**
                     * whether destroy submenu when destroy itself ,reverse result
                     * @type {boolean}
                     */
                    externalSubMenu:{
                        value:false
                    },
                    menuAlign:{},
                    menu:{
                        setter:function(m) {
                            m.set("parent", this);
                        }
                    },
                    decorateChildCls:{
                        value:"popupmenu"
                    }
                },

                DefaultRender:SubMenuRender
            }
        );


        Component.UIStore.setUIByClass("submenu", {
            priority:Component.UIStore.PRIORITY.LEVEL2,
            ui:SubMenu
        });

        return SubMenu;
    }, {
        requires:['event','uibase','component','./menuitem','./submenurender']
    });

/**

 **/